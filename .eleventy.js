module.exports = function(eleventyConfig) {
  // Path prefix for GitHub Pages deployment (e.g., /orca-doc/)
  // Set via ELEVENTY_PATH_PREFIX env var or defaults to /
  const pathPrefix = process.env.ELEVENTY_PATH_PREFIX || '/';

  // Passthrough copy for assets
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Passthrough copy for OpenAPI specs
  eleventyConfig.addPassthroughCopy({ "spec-releases": "specs" });

  // Watch targets
  eleventyConfig.addWatchTarget("src/assets/");

  // Custom filter to get latest version file
  eleventyConfig.addFilter("getLatestVersionFile", function(versions) {
    const latest = versions.find(v => v.latest);
    return latest ? latest.file : versions[0].file;
  });

  // URL filter to prepend path prefix
  eleventyConfig.addFilter("url", function(url) {
    if (!url) return pathPrefix;
    // Remove leading slash if pathPrefix has trailing slash
    const prefix = pathPrefix.endsWith('/') ? pathPrefix.slice(0, -1) : pathPrefix;
    const path = url.startsWith('/') ? url : '/' + url;
    return prefix + path;
  });

  // Make pathPrefix available in templates
  eleventyConfig.addGlobalData("pathPrefix", pathPrefix);

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    pathPrefix: pathPrefix
  };
};
