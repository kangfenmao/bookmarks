function all() {
  return JSON.parse(localStorage.getItem('tags'))
}

function get(id) {
  let tags = this.all()

  for (let index in tags) {
    if (tags[index].id == id) {
      return tags[index]
    }
  }

  return null
}

function count(tag_id) {
  let tags = this.all()
  let count = 0

  tags.forEach(function(tag) {
    if (tag.id == tag_id) count++
  })

  return count
}

function remove(id) {
  let tags = this.all()

  tags.forEach(function(tag, index) {
    if (tag.id == id) tags.splice(index, 1)
  })

  this.cache(tags)

  return true
}

function cache(tags) {
  localStorage.setItem('tags', JSON.stringify(tags))
  return tags
}

function clearCache() {
  localStorage.removeItem('tags')
}

function sites(tagId) {
  let sites = JSON.parse(localStorage.getItem('sites'))
  let result = []

  sites.forEach(function(site) {
    if (site.tag_id == tagId) {
      result.push(site)
    }
  })

  return result
}

module.exports = { all, get, count, remove, cache, clearCache, sites }

