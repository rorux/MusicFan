const fs = require("fs");

const clientPrefix = "VITE_";

const addPrefixToEnvVariables = (filePath, prefix) => {
  const buffer = fs.readFileSync(filePath);
  const envVariablesList = buffer.toString().split("\n");
  const prefixedEnvVariablesList = envVariablesList.map((str) =>
    str !== "\r" ? `${prefix}${str}` : str
  );
  return prefixedEnvVariablesList.join("\n");
};

fs.copyFileSync(".env.development.sample", ".env.development");
fs.writeFileSync(
  "packages/client/.env.development",
  addPrefixToEnvVariables(".env.development.sample", clientPrefix)
);
fs.copyFileSync(".env.development.sample", "packages/server/.env.development");
fs.copyFileSync(".env.production.sample", ".env.production");
fs.writeFileSync(
  "packages/client/.env.production",
  addPrefixToEnvVariables(".env.production.sample", clientPrefix)
);
fs.copyFileSync(".env.production.sample", "packages/server/.env.production");
