from flask_restful import Api, Resource, abort, fields, marshal
from flask_security import auth_required, current_user
from models import db, User as users_model

api = Api(prefix="/api")


user_resourse_fields = {
    "username": fields.String,
    "email": fields.String
}


# user = {
#     "username": "Narendra",
#     "email": "narendra@gmail.com"
# }


class User(Resource):

    @auth_required('token')
    def get(self, id=None):

        if id==current_user.id:
            return marshal(current_user, user_resourse_fields)
        else:
            abort(400, message='You are not authorized to get the resource')
        # if id == 5:
        #     abort(400, message="This user is restricted")
        # else:
        #     user = users_model.query.filter_by(id=id).first()
        #     if user:
        #         return marshal(user, user_resourse_fields)
        #     else:
        #         abort(404, message="user not found")


api.add_resource(User, '/users/<int:id>', '/user')
