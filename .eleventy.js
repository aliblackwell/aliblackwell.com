const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
var slugify = require('slugify')

module.exports = function (config) {

  const markdownIt = require('markdown-it');
  const markdownItOptions = {
    html: false,
    breaks: true,
    linkify: true,
  };
  const markdownItContainer = require('markdown-it-container');
  const markdownItAbbr = require('markdown-it-abbr');

  const md = markdownIt(markdownItOptions)
    .use(markdownItAbbr)
    .use(markdownItContainer, 'info');
  config.setLibrary('md', md);

  // Add markdownify filter with Markdown-it configuration
  config.addFilter('markdownify', (markdownString) =>
    md.render(markdownString)
  );

  config.addPlugin(eleventyNavigationPlugin);
  // pass some assets right through
  config.addPassthroughCopy("./website/css")
  config.addPassthroughCopy("./website/admin/")
  config.addPassthroughCopy("./website/img")
  config.addPassthroughCopy("./website/js")
  config.addPassthroughCopy("./website/_redirects")
  config.addPassthroughCopy("./website/humans.txt")
  config.addPassthroughCopy("./website/favicon.png")


  config.addShortcode("testimonial", function (testimonial, author) {
    let image = author.avatar && `<img src="${author.avatar}" alt="Photo of ${author.name}" />`
    image = image ? image : ''
    return `<div class="content">
      <blockquote>
          ${testimonial}</blockquote>
      <cite>${image}
          <span>${author.name}</span>
      </cite>
  </div>`;
  });


  config.addShortcode("form", function (form, fields) {
    const fieldGroups = fields.map(field => {
      console.log(field.fieldType)
      let fieldGroup
      if (field.fieldType === 'inputText' || field.fieldType === 'inputEmail' || field.fieldType === 'inputNumber') {
        fieldGroup = `
        <label for="${slugify(field.inputLabel)}">${field.inputLabel}</label>
        <input type="${field.fieldType === 'inputEmail' ? 'email' : field.fieldType === 'inputNumber' ? 'tel' : 'text'}" name="${slugify(field.inputLabel)}" />
        `
      }
      if (field.fieldType === 'textarea') {
        fieldGroup = `
        <label for="${slugify(field.inputLabel)}">${field.inputLabel}</label>
        <textarea name="${slugify(field.inputLabel)}"></textarea>
        `
      }
      return fieldGroup
    })
    let fieldGroupsNoCommas = ''
    for (let i = 0; i < fieldGroups.length; i++) {
      fieldGroupsNoCommas += fieldGroups[i]
    }
    return `<form netlify netlify-honeypot="username-1">
    <p class="hidden">
      <label>Don’t fill this out if you're human: <input name="username-1" /></label>
    </p>
        ${fieldGroupsNoCommas}
        <button>Submit</button>
    </form>`;
  });



  return {
    dir: {
      input: "website",
      output: "ship-site"
    }
  }
}
