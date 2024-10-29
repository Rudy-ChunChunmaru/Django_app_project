import requests

# endpoint = "https://businesscentral.dynamics.com/c723c6fc-a698-4825-b57a-3d548c250fff/uat?company=PT%20YKK%20AP&node=0000f80d-bb26-0000-103a-9300836bd2d2&page=63531&filter=%27BD%20Madela%20Template%27.Hidden%20IS%20%27No%27&dc=0&bookmark=2D_JPgAAAF7RABPAE8AUgAtAEUATAAAAACHCAAAAAJ7BTEAMAAxADkAMA"
endpoint = "http://127.0.0.1:8000/api/web/auth/"


dataHeader = {
    'Content-Type': 'application/json',
}

dataJson = {
    "username":"rudy",
    "password":"1010101010"
}

get_response = requests.post(endpoint,headers=dataHeader, json=dataJson)

print(get_response.text)