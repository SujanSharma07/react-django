# data_processing/utils.py
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
