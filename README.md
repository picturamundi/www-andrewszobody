## Managing image file size

To help keep the website’s load time low you should make sure image files aren’t too large. You can reduce file size either by reducing the image dimensions (resolution) or increasing compression. Here’s how to do both on a mac:

In Apple Preview, hitting Cmd-0 will zoom the open image to 100% which can give you an idea of how much resolution you have and if you can sacrifice some to decrease file size. Hit `Tools > Adjust Size…` to decrease the dimensions of the image.

To increase compression, hit `File > Export…`, select `JPEG` as the format and use the `Quality` slider to target different file sizes. Once the image is exported, check it to make sure there aren't super obvious [compression artifacts](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftechterms.com%2Fimg%2Fxl%2Fartifact_1543.png&f=1&nofb=1&ipt=7cee300beb5f2a79c7ab6bc4e254e57e9dd81e4b977887cb6b0cd73c5ccc8d3e&ipo=images) (compression artifacts aren't the same thing as pixelation; you can have a high-res image with bad artifacting). If artifacts are too visible, export again with the `Quality` slider set higher.

A handy tool to check image compression (as well as other elements of the website that effect load time) is [pagespeed.web.dev](https://pagespeed.web.dev/). It flags images that could be further compressed without effecting visual quality and estimates how much space could be saved.


## Adding new images to galleries

Each gallery has a dedicated sub-folder in `/artwork` with a one-word name: `recent`, `less`, and `old`.

Dropping `.jpeg` files into these subfolders with the following naming convention will cause them to show up in the corresponding gallery: 

- `01.jpeg`
- `02.jpeg`
- etc.
- `15.jpeg`

By default, galleries are set up for 15 images, but more can be added into the HTML file. You can change whether these images are displayed in numerical order or reverse numerical order by modifying the `gallery-order` variable in the CSS file.

In order to add a caption to a new image — or to modify a caption —, open the HTML document and search for the image path (e.g. `artwork/less/04.jpeg`) in order to locate the correct work, which in the HTML is a `<figure>` element. Inside this figure, fill out `fig-title` and `fig-medium` (remove the comment syntax, `<!--` and `-->`, which hide my comments from end users):

```html
<figure>
  <img data-src="artwork/less/03.jpeg" src="" alt="" class="less-img">
  <figcaption>
    <div class="fig-title"> <!--Put title here--> </div>
    <div class="fig-medium"> <!--Put medium, dimensions here--> </div>
  </figcaption>
</figure>
```

That should be all!

## Changing home page wallpaper

The current image for the home page wallpaper can be found in the `/wallpaper` folder. Remove this file by placing it in the `/inactive` sub-folder, then add your new image to `/wallpaper`.

The wallpaper image needs to be a file with the `.jpeg` extension (not `.jpg`), should have an aspect ratio of either 4:3 (landscape), 3:4 (portrait), or 1:1, and needs to be named accordingly, like so:

- `4x3.jpeg`
- `3x4.jpeg`
- `1x1.jpeg`

![active wallpaper](readme/active-wallpaper.png)

When swapping wallpapers, it’s a good idea to update the `theme-color-1` variable in the css file to match: 

```css
:root {
    --theme-color-1: rgba(200, 187, 170, 1);
    /* theme-color-1 is used for the home page background */
    --theme-color-2: rgb(230, 237, 226);
    /* theme-color-2 is used for the gallery background */
    --etc.
```

… as well as the `theme-color` meta element in the html head: 

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Andrew Szobody</title>
    <meta name="theme-color" content="#c8bbaa"> <!--Match this to page background color-->
    <etc.>
```

`theme-color-1` is used for the home screen body background, which is revealed when scrolling bounces or when you refresh on mobile (see below), while `theme-color` is used by browsers to tint some of their ui elements. Safari in iOS uses it for the status bar: 

![color matching](readme/color-matching.png)


## Editing files locally

If you want to be able to make changes to the website while 1] being able to view those changes before they go live and 2] avoid inadvertently  causing issues with your edits, you’ll need to install a couple of things.

#### 1. Github desktop app

[Here](https://youtu.be/PvUexC0-D2s) is a short and straightforward guide for setting up the github desktop app. The app allows you to work on and view a local copy of the website files. Once you want your edits to go live, you sync your local copy with GitHub.

<!--When several people work on the same project, collaborators usually create "branches" of a project. These branches are copies of the website files that allow you to freely experiment and test changes without effecting other collaborators.

I think we can get away with not setting up branches as long as we are editing our own local copies of the website files, and as long as we only "comit" (save changes in the github app) and "push" (sync the files) when our edits are final and we’ve checked that they haven’t broken anything.-->

#### 2. Text editor

Once you have your local copy of the website files, you’ll need a text editor to view and edit them. [Sumblime Text](https://www.sublimetext.com/) is a good lightweight and free option.

Say you want to edit CSS variables in order modify the gallery background color. Locate the `style.css` file in the, right click on it, and select `Open With > Sublime Text`. 

In order to preview how your edits to the text files effect the final product, open `index.html` (it should automatically open in a browser). To continue seeing changes as you add edits, just remember to hit save in your text-editor, and then refresh in the browser.
