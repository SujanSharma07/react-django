
# React-Django Data Type Inference and Conversion from Uploaded File Application


This is a web application that allows users to upload CSV or Excel files, processes the uploaded data, and displays a preview along with the inferred data types. The application is built using React for the frontend and Django for the backend, which communicates through an API.

## Features
- Upload CSV/Excel files.
- View the inferred data types for each column.
- Preview the first few rows of the uploaded file.
- Error handling and validation for file uploads.
- Responsive design using Material-UI for the frontend.

## Technologies Used
- Frontend: React, Material-UI
- Backend: Django, Django REST Framework, pandas
- File Parsing: CSV/Excel parsing with pandas
- HTTP Requests: Axios for API requests

## Prerequisites
Before you begin, ensure you have met the following requirements :

    1. Node.js installed (v14.x or higher).
    2. npm (comes with Node.js).
    3. Python installed (v3.x or higher).
    4. Django and Django REST Framework installed (refer to backend/requirements.txt file for more details).

## Setting Up the Backend (Django)
1. Clone the repository or navigate to the backend folder.
2. Install the required Python packages:
```
pip install -r requirements.txt
```
3. Configure the .env file in the root directory with the following environment variables:
- ``` SECRET_KEY ``` : Django secret key (You can generate one using ``` django.core.management.utils.get_random_secret_key()) ``` .
- ``` CORS_ALLOWED_ORIGINS ```: List of allowed origins for CORS (e.g., http://localhost:3000 for React frontend).
- ``` DEBUG ```: Set to ``` True ``` for development.
4. Run the Django server:
``` 
python manage.py runserver
```
5. The API will be accessible at http://localhost:8000/ for file uploads.

## Setting Up the Frontend (React)
1. Clone the repository or navigate to the frontend folder.

2. Install the required Node.js packages:
```
npm install
```
3. Set up the .env file in the root directory with the following environment variable:

- ``` REACT_APP_API_URL ```: URL of the Django API endpoint for file uploads (e.g., http://localhost:8000/upload/).
4. Start the React development server:
```
npm start
```
5. The frontend will be accessible at http://localhost:3000/ and will allow file uploads via a user-friendly interface.

## Usage
    1. Navigate to the React application in your browser (http://localhost:3000/).
    2. Upload a CSV or Excel file by selecting a file from your local machine.
    3. The system will process the file and show a preview of the data along with the inferred data types.
    4. Any errors during the upload (e.g., no file selected, network issues) will be displayed as error messages.

## API Endpoints
``` POST /upload/ ```
* Request Body: multipart/form-data containing the file to be uploaded.
* Response: A JSON object containing:
    * data_types: A dictionary of column names and inferred data types.
    * data: The first few rows of the data preview.

## Example Request (Frontend):

```
const formData = new FormData();
formData.append("file", file);  // 'file' is the file selected by the user

axios.post("http://localhost:8000/upload/", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error("Error uploading file:", error);
  });

```

## Contributing
If you would like to contribute to this project:

    1. Fork the repository.
    2. Create a new branch (git checkout -b feature/your-feature).
    3. Make your changes and commit them (git commit -am 'Add new feature').
    4. Push your branch to your fork (git push origin feature/your-feature).
    5. Create a pull request to merge your changes.