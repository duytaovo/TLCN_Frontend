const apiProduction = "https://json.msang.repl.co/";
const apiDev = "https://json.msang.repl.co/";
const config = {
  baseUrl: import.meta.env.MODE === "production" ? apiProduction : apiDev,
  maxSizeUploadImage: 2048576, // bytes
};
export default config;
