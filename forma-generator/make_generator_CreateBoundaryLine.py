
import requests

# Get Token from my_requests
def get_token_from_file(file_path):
    """Retrieve the token from a file."""
    with open(file_path, 'r') as file:
        return file.read().strip()

# Define the constants
FORMA_DOMAIN = "app.autodeskforma.eu"
PROJECT_ID = "pro_jllrk3imm7"
EXTENSION_ID = "cd0ff176-e6a9-4307-8619-4c98131c6b68"
TOKEN = get_token_from_file("token.txt")

# Formulate the generator ID and the URL
generator_id = f"urn:adsk-forma-generators:extension:{EXTENSION_ID}:{PROJECT_ID}:generator_1"
url = f"https://{FORMA_DOMAIN}/api/generator-service/generators/{generator_id}?accessScope={PROJECT_ID}"

# Define the payload for the PUT request
payload = {
    "id": generator_id,
    "name": "Create Boundary Line",
    "runners": [
        {
            "type": "extensionScript",
            "extensionId": EXTENSION_ID,
            "bundleId": "bundle1"
        }
    ],
  "schema": {
    "version": 1,
    "fields": [
      
      {
        "type": "number",
        "name": "height",
        "label": "height",
        "min": 0,
        "max": 200,
        "step": 10
      },
      
    ],
    "defaultValues": {
      "height": 100
    }
  }
}

# Define headers for the request
headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

# Make the PUT request
response = requests.put(url, json=payload, headers=headers)

# Print the response
print(response.text)

if response.status_code == 200:
    print("Generator updated successfully!")
else:
    print(f"Error: {response.status_code}")

