from flask import request,jsonify
from flask_restful import Resource
from bson.objectid import ObjectId
from flask_jwt_extended import jwt_required

from app.Controllers.TodoController import TodoController

t = TodoController()

class TodoList(Resource):
    @jwt_required()
    def get(self):  #get all todo list for a given user
        args = request.args
        userid = args["userid"]
        return t.get_user_todo(userid)

    @jwt_required()
    def post(self): #add new todo list for a given user
        args = request.args
        userid = args["userid"]
        
        todoObject = request.json
        return t.add_todo(userid,todoObject)

    @jwt_required()
    def delete(self): #delete a todo list for a given user by id
        args = request.args
        userid = args["userid"]
        
        todoObject = request.json
        
        return t.delete_todo(userid,todoObject)

    @jwt_required()
    def patch(self): #update a todo list for a given user by id
        args = request.args
        userid = args["userid"]
        
        todoObject = request.json   #expecting complete object to be saved as it is in the database
        
        return t.update_todo(userid,todoObject)