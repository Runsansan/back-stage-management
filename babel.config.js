module.exports = {
  "presets": [
    "@vue/app",
    ["@babel/preset-env", {
      "targets": {
        "node": "current"
      }
    }]
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}