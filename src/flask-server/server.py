from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
# The following line of code was implemented with the help of ChatGPT
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/url-check')
def url_check():
    url = request.args.get('url')
    try:
        # The following logic was adapted from https://www.geeksforgeeks.org/test-the-given-page-is-found-or-not-on-the-server-using-python/#
        response = requests.head('http://www.' + url)
        if response.status_code != 200:
            print('status code = ', response.status_code)
            return {'does_url_exist': False}
        else:
            print('here1')
            return {'does_url_exist': True}
    except requests.ConnectionError:
        print('here2')
        return {'does_url_exist': False}

if __name__ == '__main__':
    app.run(debug=True)
