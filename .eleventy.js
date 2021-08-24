const eleventyNavigationPlugin = require("@11ty/eleventy-navigation")

module.exports = function(eleventyConfig) {
  // API is available in `eleventyConfig` argument

  eleventyConfig.addPlugin(eleventyNavigationPlugin)

  eleventyConfig.addCollection('forMainNav', (collectionApi) => {
    return collectionApi
      .getFilteredByTag('mainNav')
      .sort((a, b) => {
        return a.data.order - b.data.order
      })
  })

  eleventyConfig.addPassthroughCopy('_src/css')
  eleventyConfig.addPassthroughCopy('_src/img')

  return {
    // your normal config options
    dir: {
      input: '_src',
      outpub: '_site',
      includes: '_includes',
    },
    markdownTemplateEngine: "njk"
  };
};