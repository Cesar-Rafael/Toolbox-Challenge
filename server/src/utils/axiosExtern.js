const axios = require("axios");
const { externURL } = require("../../config");

const axiosExtern = axios.create({
  baseURL: externURL,
});

axiosExtern.defaults.headers.common["Authorization"] = "Bearer aSuperSecretKey";

axiosExtern.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    Promise.reject(
      (error.response && error.response.data) || "There is an error!"
    );
  }
);

module.exports = {
  axiosExtern,
};
