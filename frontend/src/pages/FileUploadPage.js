import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Container,
  Card,
  Typography,
  CircularProgress,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from "@mui/material";

const FileUploadPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [dataTypes, setDataTypes] = useState(null);
  const [previewData, setPreviewData] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleUpload = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setErrorMessage("");
    setSuccessMessage("");
    setOpenSnackbar(false);

    if (!file) {
      setErrorMessage("No file selected!");
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setDataTypes(response.data.data_types);
      setPreviewData(response.data.data);
      setSuccessMessage("File uploaded and processed successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      // Capture the specific error message from the backend response
      const backendErrorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "Error uploading file.";
      setErrorMessage(backendErrorMessage);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "20px" }}>
      <Card variant="outlined" style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Upload Your CSV/Excel File
        </Typography>

        <form onSubmit={handleUpload}>
          <TextField
            type="file"
            variant="outlined"
            fullWidth
            onChange={handleFileChange}
            margin="normal"
            inputProps={{ accept: ".csv, .xlsx, .xls" }}
          />
          <div style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              fullWidth
            >
              {loading ? (
                <CircularProgress size={24} style={{ color: "white" }} />
              ) : (
                "Upload"
              )}
            </Button>
          </div>
        </form>
      </Card>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={errorMessage ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {errorMessage || successMessage}
        </Alert>
      </Snackbar>

      {/* Display data types */}
      {dataTypes && (
        <Card variant="outlined" style={{ marginTop: "20px", padding: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Data Types Inferred
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Column</TableCell>
                  <TableCell>Data Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(dataTypes).map(([col, type]) => (
                  <TableRow key={col}>
                    <TableCell>{col}</TableCell>
                    <TableCell>{type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Display preview data */}
      {previewData && (
        <Card variant="outlined" style={{ marginTop: "20px", padding: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Data Preview
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {Object.keys(previewData[0]).map((header) => (
                    <TableCell key={header}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {previewData.map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((value, i) => (
                      <TableCell key={i}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </Container>
  );
};

export default FileUploadPage;
