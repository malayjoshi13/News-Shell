from flask import Flask, jsonify
from flask_cors import CORS
import json


app = Flask(__name__)

CORS(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})

@app.route("/")
def hello_world():
    return "{'success': 'true', 'message': 'No data here.'}"


data = {}
f = open('data.json', encoding='utf-8')
data = json.load(f)
f.close()
print(type(data))
@app.route('/sumarize')
def summarize():
    return {'data': data}


if (__name__ == '__main__'):
    app.run(debug=True)