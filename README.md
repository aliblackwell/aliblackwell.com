[![Netlify Status](https://api.netlify.com/api/v1/badges/720a007c-d050-4b77-8ca6-876306c314d8/deploy-status)](https://app.netlify.com/sites/jamstack-blaster/deploys)

# JAMstack starter

This project exists to provide an accessible, mobile-optimised, delete key friendly starter for your next web project.

It exists so that the maintainer, Alasdair Blackwell, can produce bespoke, high quality, accessible, CMS-enabled websites for small businesses with limited budgets.

With its strong foundations in accessibility and privacy, and its scaffolding, tools and pre-fabricated components that implement best practice techniques, JAMstack starter will make your life and the lives of your clients and their users easier and more enjoyable.

## [Demo Site](https://jamstack-blaster.netlify.app/)

## Features

### For your users

* 100% customisable pages via CMS
* Custom forms
* Choice of menus and layouts
* Sendgrid for sending emails*
* Stripe for handling payments (with privacy protection enabled)*
* WCAG(2.1) Compliance
* GDPR Compliance - no cookie notice needed

### For developers

* [Eleventy](https://www.11ty.dev/) static site generator
* [Netlify CMS](https://www.netlifycms.org/) 
* Privacy-friendly analytics*
* [Netlify Dev](https://www.netlify.com/products/dev/) for local functions and forms
* Work with a local git repository
* Starter unit tests*
* Starter Netlify Functions
* Starter CMS with site options and dynamic page layouts
* Component library*
* No-class CSS with sensible defaults*
* Prettier code formatting
* Pre-commit linting
* Light and dark theme support

*Some of these features are works in progress! 

## Use it for your projects

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/aliblackwell/jamstack-starter)

The button above will clone this repository to your account and deploy it to Netlify.

The CMS has been configured to use Github for authentication. 

(To implement alternative backends, including [Git Gateway](https://www.netlifycms.org/docs/git-gateway-backend/), Netlify's own open source authentication service that plays nicely with [Netlify Identity](https://docs.netlify.com/visitor-access/identity/), please [read the Netlify CMS docs](https://www.netlifycms.org/docs/backends-overview/).)

To enable logging into the CMS with your Github account at https://[your-project-name].netlify.app/admin, do the following:

1. Edit line 3 of `website/admin/config.yml` replacing the repo with your repo.
2. In Github, go to `Settings > Developer Settings > OAuth Apps > New OAuth App`. The Authorization callback URL should be `https://api.netlify.com/auth/done`. (From [OAuth Netlify Docs](https://docs.netlify.com/visitor-access/oauth-provider-tokens/#setup-and-settings))
3. In Netlify, go to `[Your new site] > Settings > Access Control > OAuth > Install provider` and add the Client ID and Secret from step 2.


You will now be able to login.

## Working locally

__You must deploy the site to Netlify and configure authentication before attempting to work locally.__

### 1. Clone your repository

`git clone https://github.com/[your-github-username]/jamstack-starter.git your-project-name`

### 2. Change into that directory

`cd your-project-name`

### 3. Install dependencies

`npm install`

### 4. Setup the CMS to talk to your local repo

We have implemented a Netlify CMS beta feature ([docs](https://www.netlifycms.org/docs/beta-features/#working-with-a-local-git-repository)) that lets you work with a local repository instead of having to pull the whole time.

In your current terminal run:

`npm run local-cms`

Open another terminal and run the project:

`npm start`

This command runs the full `netlify dev` command which spins up and proxies any functions you've added to the `functions` directory at the root of the project, as well as setting up a hot reloading server for the site itself.

You may prefer to just run the site itself at the beginning and you can do this with:

`npm run site:serve`

You can browse all available commands in the scripts section of `package.json`

## Contributing

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md) 

It would be wonderful for you to contribute code and ideas. Pull requests are welcome.

## Inspiration

* [Eleventy Netlify Boilerplate](https://github.com/danurbanowicz/eleventy-netlify-boilerplate) by Dan Urbanowicz
* [Accessibility For Everyone](https://laurakalbag.com/book/) by Laura Kalbag
* [Inclusive Components](https://inclusive-components.design/) (the book) by Heydon Pickering
* [MVP.css](https://andybrewer.github.io/mvp/) by Andy Brewer