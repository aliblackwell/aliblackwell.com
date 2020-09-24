---
title: Contact Me
showTitle: true
permalink: /contact/
hasForm: true
eleventyNavigation:
  key: Contact
  parent: Footer
  order: 0
dynamicContent:
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
 