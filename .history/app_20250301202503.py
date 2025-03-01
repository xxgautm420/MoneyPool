from flask import Flask, render_template
from models.user import db
from config import Config
from .auth import auth_bp

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

if __name__ == '__main__':
    app.run(debug=True)
