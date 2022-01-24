from flask import request,jsonify
from flask_restful import Resource
from bson.objectid import ObjectId
from flask_jwt_extended import jwt_required

import database

class TodoList(Resource):
    @jwt_required()
    def get(self):  #get all todo list for a given user
        args = request.args
        userid = args["userid"]

        db = database.getDB()
        doc = db.User.find_one({"_id":ObjectId(userid)})
        
        return doc["todo"] 

    @jwt_required()
    def post(self): #add new todo list for a given user
        args = request.args
        userid = args["userid"]
        
        todoObject = request.json
        db = database.getDB()
        doc = db.User.find_one({"_id":ObjectId(userid)})
           
        todolist = doc['todo']
        todolist.append(todoObject)
        
        try:
            filter = {"_id":ObjectId(userid)}
            new_val = {"$set":{"todo":todolist}}

            res=db.User.update_one(filter,new_val)
            return {
                    "message":"success"
                },200
        except :
            return {
                "error":"some error occured"
            },500

    @jwt_required()
    def delete(self): #delete a todo list for a given user by id
        args = request.args
        userid = args["userid"]
        
        todoObject = request.json
        
        db = database.getDB()
        doc = db.User.find_one({"_id":ObjectId(userid)})
           
        todolist = doc['todo']
        newtodolist = []
        
        def removeItem(todoObject):
            for list in todolist:
                if list["title"] != todoObject["title"]:
                    newtodolist.append(list)
        
        removeItem(todoObject)
        
        # print(newtodolist)
        
        try:
            filter = {"_id":ObjectId(userid)}
            new_val = {"$set":{"todo":newtodolist}}

            res=db.User.update_one(filter,new_val)
            return {
                    "message":"success"
                },200
        except :
            return {
                "error":"some error occured"
            },500

    @jwt_required()
    def patch(self): #update a todo list for a given user by id
        args = request.args
        userid = args["userid"]
        
        todoObject = request.json   #expecting complete object to be saved as it is in the database
        db = database.getDB()
        
        doc = db.User.find_one({"_id":ObjectId(userid)})
           
        todolist = doc['todo']
        
        for i in range(len(todolist)):
            if todolist[i]["title"] == todoObject["title"]:
                todolist[i] = todoObject
                break
        
        try:
            filter = {"_id":ObjectId(userid)}
            new_val = {"$set":{"todo":todolist}}

            res=db.User.update_one(filter,new_val)
            return {
                    "message":"success"
                },200
        except:
            return {
                "error":"some error occured"
            },500
        
        return