const { assert, expect } = require("chai");
const filesData = require("./data/files.json");
const { listFiles, downloadFile } = require("../src/utils/apiExtern");

describe("API Testing", () => {
  describe("Listing files", () => {
    it("Validating values", async () => {
      const files = await listFiles();
      expect(filesData.files).deep.to.equal(files);
    });

    it("Validate format CSV", async () => {
      const files = await listFiles();
      files.forEach((file) => {
        const fileFormat = file.split(".")[1];
        assert.equal(fileFormat, "csv");
      });
    });
  });

  describe("Download a file", () => {
    it("Validating test2.csv content type", async () => {
      const file = await downloadFile("test2.csv");
      assert.typeOf(
        file.data,
        "string",
        "El contenido del archivo debe ser un string"
      );
    });
  });
});
