from flask import Flask, send_file
from flask import render_template
import csv
import json


app = Flask(__name__)
data_path = './data/'

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/data')
def getData():
    return send_file(data_path + 'saudi_edu_data.csv')



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
