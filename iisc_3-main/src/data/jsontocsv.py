import json
import csv
import os

def json_to_csv(json_file_path, csv_file_path):
    # Load JSON data
    with open(json_file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Initialize a list to hold all records
    all_records = []
    
    # Extract data from nested JSON structure
    for district, languages in data.items():
        for language, genders in languages.items():
            for gender, records in genders.items():
                for record in records:
                    # Create a record with all relevant information
                    csv_record = {
                        'district': district,
                        'language': language,
                        'gender': gender,
                        'name': record.get('name', ''),
                        'audio_link': record.get('audio_link', ''),
                        'image_link': record.get('image_link', ''),
                        'link': record.get('link', '')
                    }
                    all_records.append(csv_record)
    
    # Write to CSV
    if all_records:
        headers = all_records[0].keys()
        
        with open(csv_file_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=headers)
            writer.writeheader()
            writer.writerows(all_records)
        
        print(f"CSV file created successfully at {csv_file_path}")
    else:
        print("No records found to convert")

# Example usage
json_file_path = "/Users/prajjwal/ARTPARK/ldai/src/data/output.json"  # Path to your JSON file
csv_file_path = "/Users/prajjwal/ARTPARK/ldai/src/data/output.csv"  # Path for the output CSV file

json_to_csv(json_file_path, csv_file_path)