/**
  * @file: DM&DS实验室演示系统
  * @author: luning644182206@live.com
  * @date: 2018.04.22
  *
*/

// 各插件的warning信息去除
console.warn = function () {};

// 线上环境
var prod = fis.media('prod');

// 开发output目录
var devPath = '_dev';

// 开发软链接
var devHTML = 'dev-page';
// 修改version
var fs = require('fs');
var sh = require('child_process').exec;
var prodOutput = 'output';

// 删除output文件夹
if (fs.existsSync(prodOutput)) {
    var execStr = 'rm -rf ' + prodOutput;
    sh(execStr);
}

/* global config  start */
fis.cache.clean(devPath);

// delete build dir
fis.util.del(devPath);

fis.get('project.ignore');

/* ignore files */
fis.set('project.ignore', [
    'node_modules/babel**/**',
    'node_modules/fis**/**',
    '**/**/webpack.config.js',
    'src/h2w/node_modules/**',
    'src/h2w/dist/**',
    'src/h2w/cdn-dist/**',
    'src/h2w/test/**',
    'testout/**',
    'nvwaOutput/**',
    'src/h2w/example/**',
    'src/h2w/tools/**',
    'src/h2w/build/**',
    devHTML,
    devPath + '/**',
    '.gitignore',
    '.git/**',
    'fis-conf.js',
    'README.md',
    'test/**',
    'output',
    'BCLOUD',
    '_*/**'
]);

// fis处理的文件格式添加
fis.set('project.fileType.text', 'vue,jade,css');
fis.set('project.files', ['src/page/**.jade']);

fis.match('src/page/**.jade', {
    rExt: '.html',
    parser: fis.plugin('jade')
});
// 编译vue
fis.match('**.vue', {
    rExt: '.js',
    isMod: true,
    useSameNameRequire: true,
    parser: fis.plugin('vue-component', {
        cssScopedFlag: '__vuec__', // 要替换成vuec id的scoped标志
        cssScopedIdPrefix: '__vuec__' // vuec id 前缀
    })
});

// vue组件中的jade片段处理
fis.match('**.vue:jade', {
    parser: fis.plugin('jade')
});

// commonJS 规范
fis.hook('commonjs', {
    // 保证.jade, .html 文件里面的js, vue被识别为模块
    extList: ['.js', '.vue'],
    packages: [
        {
            name: 'vue',
            location: 'node_modules/vue/dist',
            main: 'vue.js'
        },
        // prod location: 'node_modules/h2w/dist'
        {
            name: 'h2w',
            location: 'src/h2w',
            main: 'index.js'
        }
    ]
});
fis.unhook('components');
fis.hook('node_modules', {
    shimBuffer: false,
    shimGlobal: false,
    shimProcess: false
});
fis.match('node_modules/**', {
    isMod: true,
    useSameNameRequire: true,
    release: '/src/yjsfe-base/js/$&'
});
fis.match('node_modules/**.js', {
    parser: fis.plugin('babel-5.x')
});

// resource location config
fis.match('src/**.js', {
    // 设置js文件为babel解析，支持es6的写法, .babelrc plugins config
    parser: fis.plugin('babel-5.x'),
    isMod: true,
    preprocessor: fis.plugin('js-require-css')
});

// no commonjs start
fis.match('src/assets/js/mod.js', {
    isMod: false,
    parser: null
});
fis.match('src/reportBug.js', {
    isMod: false,
    parser: null
});
// no commonjs stop

fis.match('**.vue:js', {
    parser: fis.plugin('babel-5.x')
});

fis.match('*.png', {
    //optimizer: fis.plugin('png-compressor')
});

// compile less files to css files
fis.match('src/**.less', {
    rExt: '.css',
    useSprite: false,
    parser: fis.plugin('less-2.x'),
    postprocessor: fis.plugin('autoprefixer')

});
// vue组件中的less片段处理
fis.match('**.vue:less', {
    rExt: '.css',
    parser: fis.plugin('less-2.x'),
    postprocessor: fis.plugin('autoprefixer')
});

// 打包部分， 依赖loader
fis.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true // 资源映射表内嵌
    }),
    packager: fis.plugin('map'),
    /*spriter: fis.plugin('csssprites', {
        layout: 'matrix',
        margin: '15'
    })*/
});

// 前端开发模式中的less替换domain
fis.match('(*.{js,css,less,vue})', {
    useHash: true,
    domain: '.',
    release: 'assets/$1'
})
// png特殊处理，开发的不被处理在里面
.match('(*.{png,jpg,svg,eot,woff,ttf,ico,gif})', {
    domain: '.',
    release: 'assets/images/$1'
})
.match('src/page/(*.jade)', {
    release: '$1'
})
.match('*.tpl', {
    release: false
});

// deploy before, replace static_url
fis.match('**', {
    deploy: [
        fis.plugin('replace-ignore', {
            from: /<script (type="text\/javascript")?/g,
            to: '<script crossorigin="anonymous" '
        }),
        fis.plugin('replace', {
            // 配置项
            from: 'url(./assets/images',
            to: 'url(./images'
        }),
        fis.plugin('replace', {
          // 配置项
            from: 'url(\'./assets/images',
            to: 'url(\'./images'
        }),
        fis.plugin('local-deliver', {
            to: devPath
        }),
        function (options, modified, total, next) {
            next();
        }
    ]
});

// global config  end

/**
  * qa environment  start
  * 测试环境用开发环境打包，然后用jekins任务替换域名
  *
*/
fis.util.del('output');
fis.util.del('output.zip');
// internal oss prod 处理
prod.match('*.{js,css,less,vue}', {
    useHash: true,
    domain: '.',
    release: 'assets/$1'
})
// png特殊处理，开发的不被处理在里面
.match('*.{png,jpg,svg,eot,woff,ttf,ico,gif}', {
    useHash: true,
    domain: '.',
    release: 'assets/images/$1'
})
// 页面放到当前目录下
.match('src/page/(*.jade)', {
    release: '$1'
})
//
.match('*.{tpl,swf,json}', {
    release: false
})
.match('::package', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        allInOne: true
    })
})
.match('**', {
    deploy: [
        // 不打包合并前的文件
        fis.plugin('skip-packed', {
          // 配置项
        }),
        fis.plugin('replace', {
          // 配置项
            from: 'url(./assets/images',
            to: 'url(./images'
        }),
        fis.plugin('replace', {
          // 配置项
            from: 'url(\'./assets/images',
            to: 'url(\'./images'
        }),
        fis.plugin('local-deliver', {
            to: 'output'
        }),
        function () {
            sh('cd output; tar -zcvf release.tar.gz . ;ls | grep -v release.tar.gz | xargs rm -rf');
        }

    ]
});
