const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (config) {

  config.addPlugin(eleventyNavigationPlugin);
  // pass some assets right through
  config.addPassthroughCopy("./website/css")
  config.addPassthroughCopy("./website/admin/")
  config.addPassthroughCopy("./website/img")
  config.addPassthroughCopy("./website/js")
  config.addPassthroughCopy("./website/_redirects")
  config.addPassthroughCopy("./website/humans.txt")
  config.addPassthroughCopy("./website/favicon.png")
  return {
    dir: {
      input: "website",
      output: "ship-site"
    }
  }
}
