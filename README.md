# Description
A simple Gallery app which can serve up images as specified in the `config/manifest.json` file. Look at `development/manifest.json` file for working example.

## Build
- run `gulp build` to build the manifest with the provided `config/manifest.json` file, which will build the application into the dist directory.
- Alternately, specify `BUILD_DIR` to build the app into a different location.
- You may also specify the diretory in which the `manifest.json` file resides by specifying `CONFIG_DIR`

## Running in Docker
- EXAMPLE: `docker run -v /PATH/TO/CONFIGDIR:/config -v /PATH/TO/BUILD:/build thegene/gallery`
- The `/config` mount point is the directory in which the manifest.json file resides
- `/build` is the build destination directory, into which this container will build a new instance of the app
