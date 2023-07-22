# PostCSS Remove Declaration

[PostCSS](https://postcss.org) plugin to remove declarations by selector.

## 💿 Installation

### Via NPM

```bash
$ npm install postcss-remove-declaration --save-dev
```

### Via Yarn

```bash
$ yarn add postcss-remove-declaration --dev
```

## 🚀 Usage

Once you have done the installation, you will need to configure plugin by creating a `postcss.config.js` file in the root of your project. As an example:

```javascript
module.exports = {
  plugins: [
    require("postcss-remove-declaration")({
      remove: {
        ".a": "*",
        ".b": "color",
        ".c": ["color", "background-color"],
        ".d": {
          color: "crimson",
          "background-color": "tomato",
        },
      },
    }),
  ],
};
```

## ⚙️ Properties

| Property | Required | Type                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------- | -------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| remove   | `true`   | `String`, `Array`, `Object` | An object where each specified key is a CSS selector and each value is either `"*"` indicating that all rules for that selector should be removed, a string matching the CSS property name to remove (e.g. `color`), an array of strings containing CSS properties to be removed (e.g. `["color", "background-color"]`), or an object where each entry specifies declaration in which key is a `CSS` property and value is a `CSS` value (e.g `{ color: "cyan" }`). In the object mode you can also define whether you want to only target css declarations where !important is set. Eg. `{ color: "cyan" }` will target all declarations where color is cyan but `{ color: "cyan !important" }` will only target declarations in which have !important set.|

## Powered by

- PostCSS

## 🔒 License

[MIT](http://opensource.org/licenses/MIT)
