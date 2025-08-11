const fs = require("fs");
const path = require("path");
require("dotenv").config();

const ensureEnvVar = (name, validator, defaultValue) => {
  const value = process.env[name] || defaultValue;
  if (!value) {
    throw new Error(`Environment variable ${name} is not set`);
  }
  validator && validator(value)
  return value;
};

const env = {
  MONGO_URI: ensureEnvVar("MONGO_URI"),
  ADMIN_MAIL: ensureEnvVar("ADMIN_MAIL"),
  ADMIN_PASSWORD: ensureEnvVar("ADMIN_PASSWORD"),
  JWT_SECRET: ensureEnvVar("JWT_SECRET", null, "secret"),
  FRONTEND_URL: ensureEnvVar("FRONTEND_URL"),
  PORT: ensureEnvVar("PORT", null, 8080),
  STATIC_FILES_URL: ensureEnvVar("STATIC_FILES_URL"),
  STATIC_FILE_STORAGE_LOCATION: ensureEnvVar("STATIC_FILE_STORAGE_LOCATION", loc => {
    if (!fs.existsSync(loc)) {
      throw new Error(`Static file storage location does not exist: ${loc}`);
    }
    return true;
  }),
  UPLOAD_PATH: ensureEnvVar("UPLOAD_PATH", dir => {
    const fullPath = path.join(process.env.STATIC_FILE_STORAGE_LOCATION, dir);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Upload path does not exist: ${fullPath}`);
    }
    return true;
  }),
};

module.exports = env;
