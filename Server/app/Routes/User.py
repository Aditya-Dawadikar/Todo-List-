from flask import request, jsonify
from flask_restful import Resource
from bson.objectid import ObjectId

import database

class UserLogin(Resource):
    def post(self):
        credentials = request.json
        db = database.getDB()
        try:
            cur = db.User.find_one({"username": credentials["username"], "password": credentials["password"]})
            if (not isinstance(cur, type(None))): # successful login
                return {
                    "message": "successful login",
                    "userid":str(cur["_id"])
                }, 200
            else:  # username password does not match
                return {
                    "message": "username and password does not match"
                }, 400
        except:
            return {
                "message":"some error occured"
            },500

class UserSignup(Resource):
    def post(self):
        user_data = request.json
        # print(user_data)
        db = database.getDB()
        try:
            res = db.User.insert_one(user_data)
            return {
                "message":"success",
                "userid":str(res.inserted_id)
            },200
        except:
            return {
                "message":"some error occured"
            },500

class UserDelete(Resource):
    def delete(self):
        return
