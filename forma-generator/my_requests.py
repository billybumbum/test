import requests
import base64

url = "https://developer.api.autodesk.com/authentication/v2/token"
client_id = '2UG0qwxwGFtCQ4js5BFMcsQokWCsnmDu'
client_secret = 'TPZ6MrS5PfneYqAE'

# Encode client_id and client_secret in Base64 format
credentials = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()

headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': f'Basic {credentials}'
}

data = {
    'grant_type': 'client_credentials',
    'scope': 'data:read'
}

response = requests.post(url, headers=headers, data=data)

# Print the JSON response
print(response.json())

# ... [previous code]

token = response.json().get('access_token')
with open('token.txt', 'w') as file:
    file.write(token)

