# data_processing/views.py
import os

import pandas as pd
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .utils import infer_and_convert_data_types


class FileUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        # Check if a file is provided
        file = request.FILES.get("file")
        if not file:
            return Response({"error": "No file provided"}, status=400)

        # Validate file type (only CSV or Excel)
        file_extension = os.path.splitext(file.name)[1].lower()
        if file_extension not in [".csv", ".xls", ".xlsx"]:
            return Response(
                {"error": "Invalid file type. Please upload a CSV or Excel file."},
                status=400,
            )

        try:
            # Process the file based on its extension
            if file_extension == ".csv":
                df = pd.read_csv(file)
            else:
                df = pd.read_excel(file)

            # Process the data (you can add your logic for data type inference here)
            processed_df = infer_and_convert_data_types(df)

            data_types = {col: str(dtype) for col, dtype in processed_df.dtypes.items()}
            preview_data = processed_df.head(10).to_dict(orient="records")
            return Response({"data_types": data_types, "data": preview_data})

        except Exception as e:
            return Response({"error": f"Error processing file: {str(e)}"}, status=500)
