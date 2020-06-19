---
title: Contact Us
showTitle: true
permalink: /contact/
eleventyNavigation:
  key: Contact
  parent: Secondary
  order: 0
dynamicContent:
  - type: form
    formName: Contact
    formSuccessMessage: Thank you for getting in touch. We will respond soon.
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
You can contact us via email at info@email.com.

Or you can use the form below: