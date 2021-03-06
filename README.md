## Getting started

After cloning repository, you will need to install all dependencies:

```
npm install
```

Then you will have access to these commands:

- `npm start` - starts `webpack-dev-server` with automatic reaload on port `3000` (`http://localhost:3000`)
- `npm run build-dev` - builds project in development mode (no minification and source maps for everything)
- `npm run build` - builds project in production mode (minification, no source maps)
- `npm run clean` - removes `build` directory

Webpack compiles code to `build` directory.

## Handling page specific dependencies

Example code lives in `assets` directory. `images`, `scripts` and `styles` directories contain resources to be used by pages in `assets` directory, in our example `index.html` and `contact.html`.

As you can see for every page there is JavaScript file: `index.js` and `contact.js`. Corresponding JS files describe dependencies of each page, let's take `index.js` file as example:

```JS
import 'normalize.css/normalize.css'

import './styles/common.scss'
import './styles/main.scss'
import './scripts/main.js'
```

All of files imported in this file will be provided for page `index.html`. **You don't need to specify anything in `index.html`!** No `<script>` and `<link>` tags.

## Modyfing pages structure

If you want to change structure of files, for example you don't need `contact` page, but would like to have `about` page, you unfortunately need to dig into Webpack configuration. We have to change `entry` field, from

```JS
entry: {
  index: './assets/index.js',
  contact: './assets/contact.js'
}
```

To

```JS
entry: {
  index: './assets/index.js',
  contact: './assets/about.js'
}
```

And configuration of `html-webpack-plugin`, from

```JS
new HtmlPlugin({
  template: 'html!assets/index.html',
  filename: 'index.html',
  chunks: ['index']
}),
new HtmlPlugin({
  template: 'html!assets/contact.html',
  filename: 'contact.html',
  chunks: ['contact']
})
```

To

```JS
new HtmlPlugin({
  template: 'html!assets/index.html',
  filename: 'index.html',
  chunks: ['index']
}),
new HtmlPlugin({
  template: 'html!assets/about.html',
  filename: 'about.html',
  chunks: ['about']
})
```

Options used to configure `html-webpack-plugin`:

- `template` - path to HTML page with `html` prefix which enables use of `html-loader` on this file
- `filename` - resulting filename, doesn't need to be the same as template filename
- `chunks` - name of chunk defined in `entry` field

You can check `html-webpack-plugin` [readme][html-plugin] for more configuration details.

[webpack]: https://webpack.github.io/
[babel]: https://babeljs.io/
[airbnb]: https://github.com/airbnb/javascript
[html-plugin]: https://github.com/ampedandwired/html-webpack-plugin#configuration
