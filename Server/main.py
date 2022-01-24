from flask import Flask,send_file, request
from flask_restful import Api, Resource
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
cors=CORS(app,resources={r"/api/*": {"origins": "http://localhost:3000"}})

#importing resources
from app.Routes import ToDo as todo_resources
from app.Routes import User as user_resources

#Handling routes
#testing
# api.add_resource(test_resources.TestFlask,'/api/test')

#user
api.add_resource(user_resources.UserLogin,'/api/user/login')
api.add_resource(user_resources.UserSignup,'/api/user/signup')
api.add_resource(user_resources.UserDelete,'/api/user/delete')

#todo
api.add_resource(todo_resources.TodoList,'/api/todo')

#handling page not found error
@app.errorhandler(404)
def invalid_route(e):
    return {'error':"404",
        "message":"invalide path"
    }

@app.errorhandler(400)
def bad_req(e):
    return {'error':"400",
        "message":"bad request"
    }

#main
if __name__=='__main__':
    app.run(debug=True)