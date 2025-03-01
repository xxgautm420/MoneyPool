from flask import Flask, jsonify
from your_model_file import db, User  # Adjust the import based on your file structure

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:201103@localhost/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

@app.route('/api/usernames', methods=['GET'])
def get_usernames():
    users = User.query.all()  # Fetch all users
    usernames = [user.username for user in users]  # Extract usernames
    return jsonify(usernames=usernames)  # Return as JSON

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables if they don't exist
    app.run(debug=True)