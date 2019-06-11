rm -rf ./dist
rm -rf ./output
npm run build
cd ./dist
mkdir -p ../output
tar -zcvf ../output/release.tar.gz *