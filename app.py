import resource
from flask import Flask, render_template
from api.resource import User, api
from models import db, User as user_model
from security import user_datastore, sec
from flask_security import hash_password

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SECRET_KEY'] = "thisissecret"
app.config['SECURITY_PASSWORD_SALT'] = 'salt'
app.config['WTF_CSRF_ENABLED'] = False
app.config['SECURITY_TOKEN_AUTHENTICATION_HEADER'] = "Authentication-Token"
app.config['SECURITY_PASSWORD_HASH'] = 'bcrypt'

api.init_app(app)
db.init_app(app)
sec.init_app(app, user_datastore)


# @app.before_first_request
# def create_db():
#     db.create_all()
#     if not user_datastore.find_user(email="narendra@gmail.com"):
#         user_datastore.create_user(
#             username="narendra", email="narendra@gmail.com", password=hash_password("1234"))
#         db.session.commit()

#     if not user_datastore.find_role('admin'):
#         user_datastore.create_role(
#             name='Admin', description='Admin Related Role')

#         db.session.commit()


@app.route('/')
def home():
    return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)
