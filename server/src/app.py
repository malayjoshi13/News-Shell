from flask import Flask, request, jsonify
# from transformers import AutoModelForSeq2SeqLM
# from Simplify import simplify_it
from indexSumarize import summarize

from flask_pymongo import PyMongo
import requests
import json
# from dnspython import dns

app = Flask(__name__)
# app.config["MONGO_URI"] = "mongodb://TeamNewshell:eovXKgDbc4ZEtNzs@cluster0.wf0qiyf.mongodb.net/NewshellTest?retryWrites=true&w=majority"
# mongo = PyMongo(app)
@app.route('/get', methods=['GET', 'POST'])
def index():
    global simplified
    if request.method == 'POST':
        data = request.get_json()
        print(data['news'])
        simplified = summarize(data['news'])
        print(simplified)
    # raw_text = """The Indian Space Research Organisation (ISRO) on Sunday said the satellites onboard its maiden Small Satellite Launch Vehicle “are no longer usable” after the SSLV-D1 placed them in an elliptical orbit instead of a circular one. The space agency said a committee would analyse and make recommendations into Sunday’s episode and with the implementation."""
    # if request.method == 'GET':
    return simplified

if __name__ == "__main__":
    app.run(port=5000, debug=True)
