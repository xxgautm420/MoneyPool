from flask import Blueprint, request, jsonify
from muser import User, db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/users/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if User.query.filter_by(username=username).first():
        return jsonify(success=False, message="Username already taken"), 409

    if User.query.count() >= 10:
        return jsonify(success=False, message="User limit reached"), 403

    user = User(username=username, password=password)
    db.session.add(user)
    db.session.commit()
    return jsonify(success=True, message="Registration successful"), 201

@auth_bp.route('/api/users/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and user.password == password:
        return jsonify(success=True, message="Login successful"), 200
    else:
        return jsonify(success=False, message="Invalid username or password"), 401
