const router = require("express").Router();
const { listFiles, loadFiles, downloadFile } = require("../utils/apiExtern");

// Ruta /files/data
router.route("/data").get(async (req, res) => {
  try {
    const { fileName } = req.query;
    const dataFormatted = [];

    // Si existe un parámetro se descarga solo ese archivo
    if (fileName) {
      const fileResponse = await downloadFile(fileName);

      const arrayCSV = fileResponse.data.split("\n").slice(1);
      const lines = [];
      const file = fileName;

      arrayCSV.forEach((line) => {
        const lineCSV = line.split(",");

        if (lineCSV.length === 4) {
          const [, text, number, hex] = lineCSV;

          const lineFormatted = { text, number, hex };
          lines.push(lineFormatted);
        }
      });

      dataFormatted.push({ file, lines });
    } else {
      // En caso de no existir el parámetro, se devuelve la data de todos los archivos
      const files = await listFiles();
      const filesData = await loadFiles(files);

      filesData.forEach((f, index) => {
        if (f.status === 200) {
          const arrayCSV = f.data.split("\n").slice(1);
          if (arrayCSV.length > 0) {
            const lines = [];
            const file = files[index];

            arrayCSV.forEach((line) => {
              const lineCSV = line.split(",");

              if (lineCSV.length === 4) {
                const [, text, number, hex] = lineCSV;

                const lineFormatted = { text, number, hex };
                lines.push(lineFormatted);
              }
            });

            dataFormatted.push({ file, lines });
          }
        }
      });
    }
    res.status(200).json(dataFormatted);
  } catch (e) {
    // En caso de obtener algún error, se muestra en los logs
    console.error("Error: ", e);

    // Y se envía un mensaje de error con status 500 (Internal Server Error)
    res.status(500).json({
      message: "Algo inesperado ocurrió, por favor inténtelo en otro momento",
    });
  }
});

// Ruta /files/list
router.route("/list").get(async (req, res) => {
  try {
    const files = await listFiles();
    const filesData = await loadFiles(files);

    const filesList = [];

    filesData.forEach((f, index) => {
      if (f.status === 200) {
        const arrayCSV = f.data.split("\n").slice(1);
        if (arrayCSV.length > 0) {
          const file = files[index];
          filesList.push(file);
        }
      }
    });

    res.status(200).json(filesList);
  } catch (e) {
    // En caso de obtener algún error, se muestra en los logs
    console.error("Error: ", e);

    // Y se envía un mensaje de error con status 500 (Internal Server Error)
    res.status(500).json({
      message: "Algo inesperado ocurrió, por favor inténtelo en otro momento",
    });
  }
});

module.exports = router;
