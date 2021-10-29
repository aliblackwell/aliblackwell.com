---
title: Contact Me
showTitle: false
permalink: /contact/
hasForm: true
eleventyNavigation:
  key: Contact
  parent: Footer
  order: 0
dynamicContent:
  - type: freeContent
    bg: standard-bg 
    content: >-
      <div class="intro">
        <p class="text-large highlight">I would love to hear from you.</p> <p>Due to concerns over the nature of social media's impact on society I have deleted my Facebook, Instagram and Twitter, so the form below represents the best way of getting in touch with me.</p>
      </div>
  - type: form
    formName: Contact
    formId: contact-form
    bg: standard-bg
    formSuccessMessage: Thanks for your message.
    fields:
      - fieldType: inputText
        inputLabel: Your name
        field: inputText
      - inputLabel: Your number
        fieldType: inputNumber
      - inputLabel: Your email
        fieldType: inputEmail
        field: inputEmail
      - inputLabel: Your message
        fieldType: textarea
        field: textarea
---
 