import pymongo

client = pymongo.MongoClient("mongodb+srv://yangzhen:yangzhen@cluster0.wigwlyv.mongodb.net/?retryWrites=true&w=majority")
db = client.test
imedbot = client["imedbot"]
survey = imedbot["survey"]
mydict = { "name": "John", "address": "Highway 37" }
survey.insert_one(mydict)
print(survey)

from datetime import datetime

now = datetime.now()

current_time = now
print("Current Time =", current_time)