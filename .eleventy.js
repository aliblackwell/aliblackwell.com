const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
var slugify = require('slugify')
const markdownIt = require("markdown-it");
module.exports = function (config) {


  let options = {
    html: true,
    breaks: true,
    linkify: true
  };

  config.setLibrary("md", markdownIt(options));

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
    return `<div class="content">
      <blockquote>
          ${testimonial}</blockquote>
      <cite><img src="${author.avatar}" alt="Photo of ${author.name}"/>
          ${author.name}
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
    return `<form netlify>
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
