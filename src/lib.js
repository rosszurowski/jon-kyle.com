export normalizeUrl (str = '') {
  return str
    .replace(/\s+/g, '-')
    .toLowerCase()
}
