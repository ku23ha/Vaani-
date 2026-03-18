import csv
import json
from collections import defaultdict

# Prepare to load the CSV file
csv_file = 'website_updated_11_Feb_26.csv'
json_output_file = 'output.json'

# Initialize a nested dictionary to hold the structured data
data = defaultdict(lambda: defaultdict(lambda: defaultdict(list)))

# Read the CSV file and populate the nested dictionary
with open(csv_file, 'r', encoding='utf-8') as file:
    reader = csv.DictReader(file)
    for row in reader:
        district = row['district']
        language = row['language'].upper()
        gender = row['gender']
        record = {
            'name': row['name'],
            'audio_link': row.get('audio_link', None),
            'image_link': row.get('image_link', None),
            'link': row['link']
        }
        data[district][language][gender].append(record)

# Convert the nested defaultdict to a regular dictionary for JSON serialization
data = {district: {language: {gender: records for gender, records in genders.items()}
                   for language, genders in languages.items()}
        for district, languages in data.items()}

# Write the structured data to a JSON file
with open(json_output_file, 'w', encoding='utf-8') as file:
    json.dump(data, file, indent=4)

print(f'JSON file has been created at: {json_output_file}')