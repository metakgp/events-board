function isURL(string) {
  return /^https?:\/\//.test(string);
}

module.exports = { isURL };
