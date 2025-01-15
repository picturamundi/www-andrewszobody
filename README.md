## Guidelines for image file size

As a rule of thumb, I’d say try to stay under 500KB to 1 MB for a wallpaper image. You can decrease file size either by reducing the image dimensions (resolution) or increasing compression. Here’s how to do both on a mac:

In Apple Preview, hitting Cmd-0 will zoom the image to 100% which can give you an idea of how much resolution you have and if you can sacrifice some to decrease file dimensions. Hit `Tools > Adjust Size…` to decrease the dimensions of the image.

To increase compression, hit `File > Export…`, select `JPEG` as the format and use the `Quality` slider to target different file sizes. Once the image is exported, check it to make sure there aren't super obvious [compression artifacts](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftechterms.com%2Fimg%2Fxl%2Fartifact_1543.png&f=1&nofb=1&ipt=7cee300beb5f2a79c7ab6bc4e254e57e9dd81e4b977887cb6b0cd73c5ccc8d3e&ipo=images) (compression artifacts aren't the same thing as pixelation; you can have a high-res image with bad artifacting). If artifacts are too visible, export again with the `Quality` slider set higher.


## Change home page wallpaper

The current image for the home page wallpaper can be found in the `/wallpaper` folder. Remove this image file by placing it in the `/inactive` sub-folder, then add your new wallpaper image to the `/wallpaper` folder.

The wallpaper image must be a file with the `.jpeg` extension (not `.jpg`), must have an aspect ratio of either 4:3 (landscape), 3:4 (portrait), or 1:1, and be named according to its ratio, like so:

- `4x3.jpeg`
- `3x4.jpeg`
- `1x1.jpeg`

## Add new images to galleries

