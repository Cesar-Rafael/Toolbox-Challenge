module.exports = function (app) {
  /****************************** PORTAL WEB ********************************************/
  app.use("/files", require("./src/controllers/files"));
};
