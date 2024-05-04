from flask import Flask, request
from flask_cors import CORS
import requests
import platform

if platform.system() == 'Linux':
    from AdHere_Linux import AdHuntingOnce
else:
    from AdHere import AdHuntingOnce

app = Flask(__name__)
# The following line of code was implemented with the help of ChatGPT
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}) # Allow requests from frontend

@app.route('/url-check')
def url_check():
    url = request.args.get('url')
    try:
        # The following logic was adapted from https://www.geeksforgeeks.org/test-the-given-page-is-found-or-not-on-the-server-using-python/#
        response = requests.head('http://www.' + url)
        if response.status_code != 200:
            return {'does_url_exist': False}
        else:
            return {'does_url_exist': True}
    except requests.ConnectionError:
        return {'does_url_exist': False}
    
@app.route('/find-violations')
def find_violations():
    url = request.args.get('url')

    AdHuntingOnce(url)
    
    return {'done': True}

@app.route('/get-violations')
def get_violations():
    fix_suggestions = ""

    # Get file text and maintain formatting
    with open('violations.txt', 'r') as f:
        for line in f:
            fix_suggestions += line + '\n'

    f.close()

    return fix_suggestions

# Port 8080 to not conflict with frontend on 3000
if __name__ == '__main__':
    app.run(port=5000, debug=True)
