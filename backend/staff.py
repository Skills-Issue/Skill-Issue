from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os,sys
from os import environ
import requests
import json
from decouple import config



app = Flask(__name__)
password=config('DB_PASSWORD')
username=config('DB_USERNAME')

if __name__ == '__main__':
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://' + \
                                            username + password + \
                                            '@spm-db-05.mysql.database.azure.com:3306/sbrp'
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_size': 100,
                                               'pool_recycle': 280}
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite://"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

class Staff(db.Model):
    __tablename__ = 'staff'
    Staff_ID=db.Column(db.Integer, primary_key=True)
    Staff_FName=db.Column(db.String(50),nullable=False)
    Staff_LName=db.Column(db.String(50),nullable=False)
    Dept=db.Column(db.String(50),nullable=False)
    Country=db.Column(db.String(50),nullable=False)
    Email=db.Column(db.String(50),nullable=False)
    Role=db.Column(db.Integer)

    def json(self):
        return {"Staff_ID": self.Staff_ID, "Staff_FName": self.Staff_FName, "Staff_LName":self.Staff_LName, "Dept": self.Dept, "Country": self.Country, "Email": self.Email, "Role": self.Role}


@app.route("/staff")
def get_staff():
    stafflist = Staff.query.all()
    return jsonify(
            {
                "code": 200,
                "data": {
                    "staffs": [staff.json() for staff in stafflist]
                }
            }
        )

@app.route("/staff/<string:Email>")
def get_staff_by_email(Email):
    staff= Staff.query.filter_by(Email=Email).first()
    if staff:
        return jsonify(
            {
                "code" : 200,
                "data" : staff.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "No user found"
        }
    )



if __name__ == '__main__':
    app.run(debug=True)