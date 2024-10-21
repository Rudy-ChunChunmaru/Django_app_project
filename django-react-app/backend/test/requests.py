
import requests

# endpoint = "https://httpbin.org/anything"
endpoint = "http://localhost:8000/api/"

get_response = requests.post(endpoint, json={"title":"hellow world me"})
print(get_response.headers)
print(get_response.text)