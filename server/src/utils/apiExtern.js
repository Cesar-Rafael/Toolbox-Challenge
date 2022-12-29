const { axiosExtern } = require("./axiosExtern");

const listFiles = async () => {
  const filesResponse = await axiosExtern.get("/secret/files");
  const { files } = filesResponse.data;
  return files;
};

const downloadFile = async (file) => {
  return axiosExtern.get(`/secret/file/${file}`, {
    validateStatus: (status) => status >= 200,
  });
};

const loadFiles = async (files) => {
  const filesPromises = [];

  files.forEach((file) => {
    filesPromises.push(downloadFile(file));
  });

  const filesData = await Promise.all(filesPromises);
  return filesData;
};

module.exports = {
  listFiles,
  downloadFile,
  loadFiles,
};
