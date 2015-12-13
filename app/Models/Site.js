function all() {
  return JSON.parse(localStorage.getItem('sites'))
}

function get(id) {
  let sites = this.all()

  for (let index in sites) {
    if (sites[index].id == id) {
      return sites[index]
    }
  }

  return null
}

function remove(id) {
  let sites = this.all()

  sites.forEach(function(site, index) {
    if (site.id == id) sites.splice(index, 1)
  })

  return this.cache(sites)
}

function cache(sites) {
  localStorage.setItem('sites', JSON.stringify(sites))
  return sites
}

function clearCache() {
  localStorage.removeItem('sites')
}

module.exports = { all, get, remove, cache, clearCache }
