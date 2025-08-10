const path = require("path");
const env = require("./env");

const STATIC_FILES_URL = env.STATIC_FILES_URL;
const UPLOAD_PATH = env.UPLOAD_PATH;

function isURL(string) {
  return /^https?:\/\//.test(string);
}

function formatURL(event) {
  if (isURL(event.posterurl)) return event;
  else {
    const imageUrl = new URL(
      path.posix.join(UPLOAD_PATH, event.posterurl),
      STATIC_FILES_URL,
    );
    return {
      ...event,
      posterurl: imageUrl.toString(),
    };
  }
}

module.exports = { isURL, formatURL };
