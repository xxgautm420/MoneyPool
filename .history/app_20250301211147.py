from flask import Flask, render_template , jsonify
from user import User, db
from config import Config
from auth import auth_bp

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

app.register_blueprint(auth_bp)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/progress')
def progress():
    return render_template('progress.html')

@app.route('/api/users/top5', methods=['GET'])
def get_top5_users():
    users = User.query.limit(5).all()
    return jsonify([user.username for user in users])

if __name__ == '__main__':
    app.run(debug=True)
