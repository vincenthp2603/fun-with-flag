projectName="fun-with-flags"
rootDir="$PWD"
clientDir="$rootDir/Client/$projectName"
serverDir="$rootDir/Server"

rm -r $serverDir/client

cd ./Client/$projectName
npm run build

mkdir $serverDir/client
cp -r ./build/* $serverDir/client/

