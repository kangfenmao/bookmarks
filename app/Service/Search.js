import Site from 'App/Models/Site'

function sites(keywords) {
  let sites = Site.all()
  let match_sites = []

  keywords = keywords.toLowerCase()

  sites.forEach(function(site) {
    let match = [
      site.url.indexOf(keywords),
      site.title.toLowerCase().indexOf(keywords),
      site.keywords.toLowerCase().indexOf(keywords),
    ].reduce((a, b) => a + b, 0) > -3

    if (match) match_sites.push(site)
  })

  return match_sites
}

module.exports = { sites }
