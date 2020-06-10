# JAMstack starter

This collection of files should serve as a solid starter for any project requiring a static-site front-end with lambda functions on the back-end.

Deploy to Netlify [using their GUI](https://app.netlify.com/) (or their [CLI tools](https://cli.netlify.com/)) or the button below, and start developing with hot reloading using `npm start`

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/aliblackwell/jamstack-starter&stack=cms)

```
collections:
  - label: "Pages"
    name: "pages"
    files:
      - label: "Home"
        name: "services"
        file: "website/pages/home.yml"
        fields:
          - {label: Opening para, name: opening_para, widget: string}
          - {label: First box title, name: first_box_title, widget: string}
          - {label: First box blurb, name: first_box_blurb, widget: string}
          - {label: Second box title, name: second_box_title, widget: string}
          - {label: Second box blurb, name: second_box_blurb, widget: string}
          - {label: Intro, name: intro, widget: markdown}
          - label: Team
            name: team
            widget: list
            fields:
              - {label: Name, name: name, widget: string}
              - {label: Position, name: position, widget: string}
              - {label: Photo, name: photo, widget: image}
```
