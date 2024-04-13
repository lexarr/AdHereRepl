from flask import Flask
from flask_cors import CORS
import requests

app = Flask(__name__)
# The following line of code was implemented with the help of ChatGPT
CORS(app, resources={r"/*": {"origins": "http://localhost:8080"}})

@app.route('/fixes')
def fixes():
    fix_suggestions = ""

    with open('../violations.txt', 'r') as f:
        for line in f:
            fix_suggestions += line + '<br />'

    f.close()

    return fix_suggestions
    

if __name__ == '__main__':
    app.run(port=8080, debug=True)