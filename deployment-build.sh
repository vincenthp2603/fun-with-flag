projectName="fun-with-flags"
rootDir="$PWD"
clientDir="$rootDir/Client/$projectName"
serverDir="$rootDir/Server"

rm -r $serverDir/client

cd $clientDir
echo "Build Client ..."
if [[ ! -d node_modules ]]; then
	npm install > /dev/null
fi
npm run build > /dev/null
echo "Build Client: Done."

mkdir $serverDir/client
cp -r ./build/* $serverDir/client/
cd $serverDir
echo "Install Packages for Server ..."
if [[ ! -d node_modules ]]; then
	npm install > /dev/null
fi
echo "Install Packages for Server: Done."
