tee >(logger) <<< "Removing build directories"
rm -rf `find . -type d -name .cache`
rm -rf `find . -type d -name .next`
rm -rf `find . -type d -name .turbo`
rm -rf `find . -type d -name build`
rm -rf `find . -type d -name dist`
rm -rf `find . -type d -name documentation`
# Leave .tmp for Sqlite dbs

tee >(logger) <<< "Removing node modules"
rm -rf `find . -type d -name node_modules`
yarn cache clean --all
rm -rf yarn.lock && touch yarn.lock

tee >(logger) <<< "Reinstalling dependencies"
yarn install
bash build-everything.sh
