.PHONY: test
# global variables
args = ${filter-out $@, $(MAKECMDGOALS)}
desc =
author = luning644182206@emails.bjut.edu.cn

BLUE =  \033[34m
WHITE =  \033[37m
RED =  \033[31m
GREEN =  \033[36m

# commands
default: help

dev:
	fis3 release -wcL

qa:
	fis3 release qa 

test:
	fis3 release test -wcL

prod:
	# nrm add H2W http://gzhxy-bce-su80.epc.baidu.com:8000/
	nrm use taobao
	yarn config set registry 'https://registry.npm.taobao.org'
	npm install
	fis3 release prod

model:
	babel-node _cli/model.js $(args) --author=$(author) --desc=$(desc)

mf:
	babel-node _cli/model.js $(args) --author=$(author) --desc=$(desc) --force

view:
	babel-node _cli/viewModal.js $(args) --author=$(author) --desc=$(desc)

vf:
	babel-node _cli/viewModal.js $(args) --author=$(author) --desc=$(desc) --force

env:
	@echo " set up environment"
	npm i -g fis3
	npm - -g nrm
	npm i -g yarn
	npm i -g babel-cli

install:
	@echo " set up packages of project deps"
	yarn install --production

help:
	@echo "  $(BLUE)make $(BLUE) $(BLUE) command lines：$(GREEN)"
	@echo "  dev                                   ---> 执行开发环境"
	@echo "  qa                                    ---> 执行测试环境"
	@echo "  test                                  ---> 执行前端测试"
	@echo "  prod                                  ---> 生成资源数据模型"
	@echo "  model [name] [-e author= desc=]       ---> 生成资源数据模型"
	@echo "  mf    [name] [-e author= desc=]       ---> 强制生成并覆盖资源数据模型"
	@echo "  view  [name] [-e author= desc=]       ---> 生成资源视图模型"
	@echo "  vf    [name] [-e author= desc=]       ---> 强制生成并覆盖资源视图模型"
	@echo "  env                                   ---> 初始化系统环境"
	@echo "  install                               ---> 获取项目所有的依赖"
