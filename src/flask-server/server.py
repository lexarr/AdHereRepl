from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
# The following line of code was implemented with the help of ChatGPT
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/url-check')
def url_check():
    # return {'members': True}
    url = request.args.get('url')
    try:
        response = requests.head('http://www.' + url)
        if response.status_code != 200:
            return {'does_url_exist': False}
        else:
            return {'does_url_exist': True}
    except:
        return {'does_url_exist': False}

if __name__ == '__main__':
    app.run(debug=True)
