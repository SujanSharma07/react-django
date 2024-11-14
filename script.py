import pandas as pd


def infer_and_convert_data_types(df):
    """
    Infers and converts data types in a DataFrame, attempting to match each column
    to the most appropriate data type, such as int, float, datetime, or string,
    based on its contents.
    """
    for col in df.columns:
        # Skip conversion for columns that are already identified as numeric or boolean
        if pd.api.types.is_numeric_dtype(df[col]) or pd.api.types.is_bool_dtype(
            df[col]
        ):
            continue

        # Try to convert to numeric
        df_numeric = pd.to_numeric(df[col], errors="coerce")
        if not df_numeric.isna().all():  # If there are valid numbers, convert
            df[col] = df_numeric
            df[col] = pd.to_numeric(df[col], downcast="integer", errors="ignore")
            df[col] = pd.to_numeric(df[col], downcast="float", errors="ignore")
            continue

        # Attempt to convert to datetime with common date formats
        try:
            df_datetime = pd.to_datetime(
                df[col], errors="coerce", infer_datetime_format=True
            )
            if (
                df_datetime.notna().sum() > 0
            ):  # Confirm successful conversion to datetime
                df[col] = df_datetime
                continue
        except (ValueError, TypeError):
            pass

        # If the column is mostly text (not numeric or datetime), treat it as string
        if df[col].dtype == "object":
            if (
                df[col].nunique() / len(df[col]) < 0.5
            ):  # Use 'category' if low unique ratio
                df[col] = pd.Categorical(df[col])
            else:
                df[col] = df[col].astype(str)  # Otherwise, treat as string

    # Convert to best possible types to optimize memory usage
    df = df.convert_dtypes()
    return df


# Example usage function
def load_and_process_file(file_path):
    """
    Loads a CSV or Excel file into a DataFrame, infers and converts data types,
    and returns the optimized DataFrame.
    """
    # Load based on file extension
    if file_path.endswith(".csv"):
        df = pd.read_csv(file_path)
    elif file_path.endswith((".xls", ".xlsx")):
        df = pd.read_excel(file_path)
    else:
        raise ValueError("Unsupported file format")

    # Display initial data types
    print("Data types before inference:")
    print(df.dtypes)

    # Convert data types
    df = infer_and_convert_data_types(df)

    # Display final data types
    print("\nData types after inference:")
    print(df.dtypes)

    return df


# Test with an example file
df = load_and_process_file("sample_data.csv")
