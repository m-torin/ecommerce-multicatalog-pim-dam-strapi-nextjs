tee >(logger) <<< "Building all apps independently..."
yarn doppler

# Offstage
tee >(logger) <<< "Build CMS"
yarn build:cms

# Onstage
tee >(logger) <<< "Build Shops"
yarn build:shops

tee >(logger) <<< "All builds complete."
