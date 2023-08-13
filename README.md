# aidens-jekyll-boilerplate
A boilerplate setup for Jekyll sites hosted on GitHub Pages and managed with [Tina CMS](https://tina.io/).

## Notable Features
- Automated builds directly to GitHub Pages with any plugins (not just the default white-listed ones)
- Automatic responsive images via [jekyll-picture-tag](https://github.com/timakro/jekyll-picture-tag)
- Custom SCSS grid system for easy layouts
- Tina CMS hosted on the same domain at /admin

## Setup
### Create secrets
You need to create three secrets in the repo. All three come from your Tina project.

- `TINA_PUBLIC_CLIENT_ID` : Your Tina Client ID. Fuond under "Overview" in the sidebar.
- `TINA_TOKEN` : Your Tina "Content (Readonly)" token. Found under "Tokens" in the sidebar
- `TINA_SEARCH_TOKEN` : Your Tina "Search" token. Found under "Tokens" in the sidebar

### GitHub Pages
Under "Settings", select "Pages". Under "Build and deployment", set "Source" to "GitHub Actions".

You should see: "Your site was last deployed to the github-pages environment by the Deploy Jekyll site to Pages workflow."

### Local Development
Need to expand on this
