from flask import Flask, render_template, jsonify
from user import User, db  # Import User model and db from user.py
from config import Config  # Import the Config class from config.py

app = Flask(__name__)
app.config.from_object(Config)  # Load the configuration

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/progress')
def progress():
    return render_template('progress.html')

@app.route('/api/users', methods=['GET'])  # Ensure the route is prefixed with /api
def get_users():
    users = User.query.all()
    return jsonify([user.username for user in users])

@app.route('/api/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify(username=user.username), 200
    else:
        return jsonify(error="User  not found"), 404

if __name__ == '__main__':
    app.run(debug=True)