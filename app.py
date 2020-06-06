import os
import json
from flask import Flask, render_template, request, redirect, url_for, jsonify, Response 
import urllib.parse
import re

app = Flask(__name__)

@app.route('/')
def index():
	return render_template("index.html")
	
@app.route("/api/get_data")
def get_data():
	filename = os.path.join(app.static_folder, 'data.json')
	with open(filename) as file:
		data = json.load(file)
	
	return jsonify(data)
	
@app.route("/api/add_data", methods = ['GET','POST'])
def add_data():
	data_json=request.get_json()
	
	filename = os.path.join(app.static_folder, 'data.json')
	with open(filename) as file:
		new_data = json.load(file)
		
		new_data.append(data_json)
		
		output = json.dumps(new_data, indent=4)
		output = re.sub(r'": \[\s+', '": [', output)
		output = re.sub(r'",\s+', '", ', output)
		output = re.sub(r'"\s+\]', '"]', output)
	
	with open(filename, 'w') as file:
		file.write(output)
	
	return jsonify(new_data)
	
@app.route("/api/edit_data", methods = ['GET','POST'])
def edit_data():
	data_json=request.get_json()

	filename = os.path.join(app.static_folder, 'data.json')
	with open(filename) as file:
		edit_data = json.load(file)
		
		if data_json['lan']=='en':
			edit_data[len(edit_data)-1]['colorEN'][int(data_json['id'])]=data_json['color']
		else:
			edit_data[len(edit_data)-1]['colorBG'][int(data_json['id'])]=data_json['color']
			
		output = json.dumps(edit_data, indent=4)
		output = re.sub(r'": \[\s+', '": [', output)
		output = re.sub(r'",\s+', '", ', output)
		output = re.sub(r'"\s+\]', '"]', output)
		
	with open(filename, 'w') as file:
		file.write(output)

	return jsonify(edit_data)
	
	
if __name__ == '__main__':
	app.run(debug=True)
