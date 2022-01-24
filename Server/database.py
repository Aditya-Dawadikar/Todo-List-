from pymongo import MongoClient
from config import database

def getDB():
    #database connection
    CONNECTION_STRING = database["url"]
    client = MongoClient(CONNECTION_STRING)
    db = client.Todo
    return db