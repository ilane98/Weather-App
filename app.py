from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

API_KEY = 'aaefb252a0682b5f58c04a62c8b3bb3f'

# Debug: Print all available routes
with app.app_context():
    for rule in app.url_map.iter_rules():
        print(rule)

@app.route('/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    if not city:
        return jsonify({'error': 'City parameter is required'}), 400
    
    url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric'
    print(f"Request URL: {url}")  # Debug: Log the API request URL
    response = requests.get(url)
    print(f"API Response: {response.json()}")  # Debug: Log the API response

    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({'error': response.json().get('message', 'City not found')}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
