from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import requests
import sys

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://localhost:3000"])
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
def render():
    return 'flask app is running!'

@app.post('/request')
def post_request():
    print('hi', file=sys.stdout)
    request_data = request.get_json()       #might have to tweak
    #ollama api req/res    
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }

    data = '{ "model": "llama3", "prompt": "Why is the sky blue?" }'

    #connect flask to hugging face llama 3-8b model (ollama response is too slow)

    response = requests.post('http://localhost:11434/api/generate', headers=headers, data=data)
    print(response, file=sys.stdout)

    #add rag

    #return response
    #response.headers.add("Access-Control-Allow-Origin", "*")
    #return jsonify(response, status=201)

#CURL POST REQUEST: curl -X POST -H "Content-Type: application/json" -d "{ \"name\": \"hi\" }" http://127.0.0.1:5000/request

#curl -X POST -d "{ \"model\": \"llama3\", \"prompt\": \"Why is the sky blue?\" }" http://localhost:11434/api/generate