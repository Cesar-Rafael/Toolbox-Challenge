import { Container, Row, Table, Form, Col } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";

const TableC = () => {
  const [file, setFile] = useState("");
  const [files, setFiles] = useState([]);
  const [availableFiles, setAvailableFiles] = useState([]);

  const getFiles = async () => {
    const response = await axios.get("http://localhost:4000/files/data");
    setFiles(response.data);
  };

  const getAvailableFiles = async () => {
    const response = await axios.get("http://localhost:4000/files/list");
    setAvailableFiles(response.data);
  };

  const getFile = async (file) => {
    const response = await axios.get(
      `http://localhost:4000/files/data?fileName=${file}`
    );

    setFiles(response.data);
  };

  useEffect(() => {
    getFiles();
    getAvailableFiles();
    return () => {
      setFiles([]);
      setAvailableFiles([]);
    };
  }, []);

  return (
    <Container fluid="lg">
      <Row className="my-3">
        <Col xs={3}>
          <Form>
            <Form.Group controlId="formGroupSelect">
              <Form.Label style={{ textAlign: "left" }}>
                Selecciona un nombre de archivo:
              </Form.Label>
              <Form.Select
                value={file}
                onChange={(e) => {
                  const { value } = e.target;
                  setFile(value);
                  if (value === "all") {
                    getFiles();
                  } else {
                    getFile(value);
                  }
                }}
              >
                <option value="all">Todos</option>
                {availableFiles.map((f, index) => (
                  <option value={f} key={index}>
                    {f}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Table striped bordered hover style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th style={{ width: "10%" }}>File Name</th>
                <th style={{ width: "30%" }}>Text</th>
                <th style={{ width: "20%" }}>Number</th>
                <th style={{ width: "40%" }}>Hex</th>
              </tr>
            </thead>
            <tbody>
              {files.map((f) => {
                return f.lines.map((l, index) => (
                  <tr key={index}>
                    <th>{f.file}</th>
                    <th>{l.text}</th>
                    <th>{l.number}</th>
                    <th>{l.hex}</th>
                  </tr>
                ));
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default TableC;
