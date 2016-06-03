# Description
A simple Gallery app which can serve up images as specified in the `config/manifest.json` file. Look at `development/manifest.json` file for working example.

## Build
- run `gulp build` to build the manifest with the provided manifests, by default looking in the local `config/` directory. Each should have a manifest json file named after its environment, so `config/wedding/development.json` will give you the wedding gallery's development manifest.
- Alternately, specify `BUILD_DIR` to build the app into a different location.
- You may also specify the diretory in which the `manifest.json` file resides by specifying `CONFIG_DIR`

## Running in Docker
- EXAMPLE: `docker run -e GALLERY=wedding -e GALLERY_ENV=production /PATH/TO/BUILD:/build thegene/gallery`
- `/build` is the build destination directory, into which this container will build a new instance of the app. It is a VOLUME so can be used by other containers or mounted locally.
- `GALLERY` is represented as a directory in the `config` directory, which is now inherited from `thegene/gallery-manifests`
- `GALLERY_ENV` is one of the given `GALLERY`'s environments, managed by the manifests app.
