import csv
import json
from collections import defaultdict
import os

def load_existing_json(json_file_path):
    """Load existing JSON data if it exists, otherwise return empty dict"""
    if os.path.exists(json_file_path):
        with open(json_file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    return {}

def merge_data_structures(existing_data, new_data):
    """Merge new data into existing data structure"""
    for district, languages in new_data.items():
        if district not in existing_data:
            existing_data[district] = {}
        
        for language, genders in languages.items():
            if language not in existing_data[district]:
                existing_data[district][language] = {}
            
            for gender, records in genders.items():
                if gender not in existing_data[district][language]:
                    existing_data[district][language][gender] = []
                
                # Check for duplicates before adding new records
                existing_names = {record['name'] for record in existing_data[district][language][gender]}
                for record in records:
                    if record['name'] not in existing_names:
                        existing_data[district][language][gender].append(record)
    
    return existing_data

def main():
    # File paths
    csv_file = '/Users/prajjwal/ARTPARK/ldai/src/data/extendedoutput.csv'
    json_output_file = '/Users/prajjwal/ARTPARK/ldai/src/data/output.json'
    
    # Load existing JSON data
    print("Loading existing JSON data...")
    existing_data = load_existing_json(json_output_file)
    print(f"Loaded existing data with {len(existing_data)} districts")
    
    # Initialize a nested dictionary to hold the new structured data
    new_data = defaultdict(lambda: defaultdict(lambda: defaultdict(list)))
    
    # Read the CSV file and populate the nested dictionary
    print("Reading and processing CSV file...")
    records_processed = 0
    
    with open(csv_file, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            district = row['district']
            language = row['language'].upper()
            gender = row['gender']
            record = {
                'name': row['name'],
                'audio_link': None,  # Set to None as in original structure
                'image_link': None,  # Set to None as in original structure
                'link': row['link']
            }
            new_data[district][language][gender].append(record)
            records_processed += 1
    
    print(f"Processed {records_processed} records from CSV")
    
    # Convert the nested defaultdict to a regular dictionary for JSON serialization
    new_data = {district: {language: {gender: records for gender, records in genders.items()}
                          for language, genders in languages.items()}
               for district, languages in new_data.items()}
    
    print(f"New data contains {len(new_data)} districts")
    
    # Merge new data with existing data
    print("Merging new data with existing data...")
    merged_data = merge_data_structures(existing_data, new_data)
    
    # Write the merged data to JSON file
    print("Writing merged data to JSON file...")
    with open(json_output_file, 'w', encoding='utf-8') as file:
        json.dump(merged_data, file, indent=4)
    
    print(f'Successfully updated JSON file at: {json_output_file}')
    print(f'Final data contains {len(merged_data)} districts')
    
    # Print summary statistics
    total_records = 0
    total_languages = set()
    total_genders = set()
    
    for district, languages in merged_data.items():
        for language, genders in languages.items():
            total_languages.add(language)
            for gender, records in genders.items():
                total_genders.add(gender)
                total_records += len(records)
    
    print(f"\nSummary:")
    print(f"- Total districts: {len(merged_data)}")
    print(f"- Total languages: {len(total_languages)}")
    print(f"- Total genders: {len(total_genders)}")
    print(f"- Total records: {total_records}")
    print(f"- Languages: {sorted(total_languages)}")
    print(f"- Genders: {sorted(total_genders)}")

if __name__ == "__main__":
    main()
