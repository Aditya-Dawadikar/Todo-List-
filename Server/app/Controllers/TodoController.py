from bson.objectid import ObjectId
import database

class TodoController:
    def __init__(self):
        self.db = database.getDB()
        pass
    
    def add_todo(self,userid,todoObject):
        doc = self.db.User.find_one({"_id":ObjectId(userid)})

        try:
            todolist = doc['todo']
            todolist.append(todoObject)
            
            filter = {"_id":ObjectId(userid)}
            new_val = {"$set":{"todo":todolist}}

            res=self.db.User.update_one(filter,new_val)
            return {
                    "message":"success"
                },200
        except :
            return {
                "error":"some error occured"
            },500
    
    def update_todo(self,userid,todoObject):
        doc = self.db.User.find_one({"_id":ObjectId(userid)})
        
        try:
            todolist = doc['todo']
        
            for i in range(len(todolist)):
                if todolist[i]["title"] == todoObject["title"]:
                    todolist[i] = todoObject
                    break
            
            filter = {"_id":ObjectId(userid)}
            new_val = {"$set":{"todo":todolist}}

            res=self.db.User.update_one(filter,new_val)
            return {
                    "message":"success"
                },200
        except:
            return {
                "error":"some error occured"
            },500
    
    def delete_todo(self,userid,todoObject):
        doc = self.db.User.find_one({"_id":ObjectId(userid)})
        
        def removeItem(todoObject):
            for list in todolist:
                if list["title"] != todoObject["title"]:
                    newtodolist.append(list)
        
        try:
            todolist = doc['todo']
            newtodolist = []
            removeItem(todoObject)
        
            filter = {"_id":ObjectId(userid)}
            new_val = {"$set":{"todo":newtodolist}}

            res=self.db.User.update_one(filter,new_val)
            return {
                    "message":"success"
                },200
        except :
            return {
                "error":"some error occured"
            },500
    
    def get_user_todo(self,userid):
        doc = self.db.User.find_one({"_id":ObjectId(userid)})
        try:
            data = doc["todo"]
            return data,200
        except :
            return {
                "error":"some error occured"
            },500