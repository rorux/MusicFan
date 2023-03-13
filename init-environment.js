const fs = require("fs");

const prefixClient = "VITE_";

const addPrefixToEnvVariables = (filePath, prefix) => {
  const buffer = fs.readFileSync(filePath);
  const stringsArray = buffer.toString().split("\n");
  const prefixedStringsArray = stringsArray.map((str) =>
    str !== "\r" ? `${prefix}${str}` : str
  );
  return prefixedStringsArray.join("\n");
};

fs.copyFileSync(".env.development.sample", ".env.development");
fs.writeFileSync(
  "packages/client/.env.development",
  addPrefixToEnvVariables(".env.development.sample", prefixClient)
);
fs.copyFileSync(".env.development.sample", "packages/server/.env.development");
fs.copyFileSync(".env.production.sample", ".env.production");
fs.writeFileSync(
  "packages/client/.env.production",
  addPrefixToEnvVariables(".env.production.sample", "VITE_")
);
fs.copyFileSync(".env.production.sample", "packages/server/.env.production");
