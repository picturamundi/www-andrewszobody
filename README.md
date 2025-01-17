## Guidelines for image file size

To increase load times of a page, you can decrease image file size either by reducing the image dimensions (resolution) or increasing compression. Here’s how to do both on a mac:

In Apple Preview, hitting Cmd-0 will zoom the image to 100% which can give you an idea of how much resolution you have and if you can sacrifice some to decrease file dimensions. Hit `Tools > Adjust Size…` to decrease the dimensions of the image.

To increase compression, hit `File > Export…`, select `JPEG` as the format and use the `Quality` slider to target different file sizes. Once the image is exported, check it to make sure there aren't super obvious [compression artifacts](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftechterms.com%2Fimg%2Fxl%2Fartifact_1543.png&f=1&nofb=1&ipt=7cee300beb5f2a79c7ab6bc4e254e57e9dd81e4b977887cb6b0cd73c5ccc8d3e&ipo=images) (compression artifacts aren't the same thing as pixelation; you can have a high-res image with bad artifacting). If artifacts are too visible, export again with the `Quality` slider set higher.

A handy tool to check image compression (as well as other elements of the website that effect load time) is [pagespeed.web.dev](https://pagespeed.web.dev/). It flags images that could be further compressed without effecting visual quality and estimates how much space could be saved.

<!-- If you find that you really can’t the image resolution and quality you want without the page slowing down a lot, another option is to ditch to JPEG and try to use a format like [AVIF](https://en.wikipedia.org/wiki/AVIF). -->


## Change home page wallpaper

The current image for the home page wallpaper can be found in the `/wallpaper` folder. Remove this image file by placing it in the `/inactive` sub-folder, then add your new wallpaper image to the `/wallpaper` folder.

The wallpaper image must be a file with the `.jpeg` extension (not `.jpg`), must have an aspect ratio of either 4:3 (landscape), 3:4 (portrait), or 1:1, and be named according to its ratio, like so:

- `4x3.jpeg`
- `3x4.jpeg`
- `1x1.jpeg`

![alt text](readme/active-wallpaper.png)

<!--adjust page background color and theme color?-->


## Add new images to galleries

