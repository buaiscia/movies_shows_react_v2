# TMDb React app

Frontend application using The Movie Database API. Built with React.

## Getting started

Clone the repo locally

```git clone 'link' ```

Install packages

```npm install```

Insert your own API key into /src/config/config.js and save it

```config.apiKey = 'keyHere';```

Run it

```npm start```

As per notes below, the visualization of the HSL stream is possible only on IE/Edge.

#### Or for Production mode

```npm run-script build```
```serve -s build```

## Structure

   - [README.md](README.md)
   - [axios\-orders.js](axios-orders.js)
   - [package\-lock.json](package-lock.json)
   - [package.json](package.json)
   - __src__
     - [App.css](src/App.css)
     - [App.js](src/App.js)
     - __assets__
       - __images__
         - [poster\_not\_avail.jpg](src/assets/images/poster_not_avail.jpg)
         - [tmdb.svg](src/assets/images/tmdb.svg)
     - __components__
       - __VideoPlayer__
         - [VideoPlayer.jsx](src/components/VideoPlayer/VideoPlayer.jsx)
       - __axios\-instance__
         - [axios\-instance.js](src/components/axios-instance/axios-instance.js)
       - __directory__
         - [directory.component.jsx](src/components/directory/directory.component.jsx)
         - [directory.module.css](src/components/directory/directory.module.css)
       - __getErrorHandler__
         - [getErrorHandler.component.jsx](src/components/getErrorHandler/getErrorHandler.component.jsx)
         - [getErrorHandler.css](src/components/getErrorHandler/getErrorHandler.css)
       - __header__
         - [header.component.jsx](src/components/header/header.component.jsx)
         - [header.module.css](src/components/header/header.module.css)
       - __searching__
         - [searching.component.jsx](src/components/searching/searching.component.jsx)
         - [searching.module.css](src/components/searching/searching.module.css)
       - __spinner__
         - [spinner.component.jsx](src/components/spinner/spinner.component.jsx)
         - [spinner.module.css](src/components/spinner/spinner.module.css)
     - __config__
       - [config.js](src/config/config.js)
     - [index.css](src/index.css)
     - [index.js](src/index.js)
     - __pages__
       - __homepage__
         - [homepage.component.jsx](src/pages/homepage/homepage.component.jsx)
       - __notfound__
         - [notfound.component.jsx](src/pages/notfound/notfound.component.jsx)
       - __search__
         - [search.component.jsx](src/pages/search/search.component.jsx)
       - __showItem__
         - [showItem.component.jsx](src/pages/showItem/showItem.component.jsx)
         - [showItem.module.css](src/pages/showItem/showItem.module.css)


## Notes

The Play button doesn't play the actual trailer but an HLS standard streaming video via Shaka player, made it compatible with all browsers.