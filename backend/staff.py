from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os, sys
from os import environ
import requests
import json
from decouple import config
import logging


app = Flask(__name__)
password = config("DB_PASSWORD")
username = config("DB_USERNAME")

# Configure logging
logging.basicConfig(level=logging.DEBUG) 

if __name__ == "__main__":
    app.config["SQLALCHEMY_DATABASE_URI"] = (
        "mysql+mysqlconnector://" + \
        username + password + \
        "@spm-db-05.mysql.database.azure.com:3306/sbrp"
    )
    app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {"pool_size": 100, "pool_recycle": 280}
else:
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite://"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
CORS(app)


class Staff(db.Model):
    __tablename__ = "Staff"
    Staff_ID = db.Column(db.Integer, primary_key=True)
    Staff_FName = db.Column(db.String(50), nullable=False)
    Staff_LName = db.Column(db.String(50), nullable=False)
    Dept = db.Column(db.String(50), nullable=False)
    Country = db.Column(db.String(50), nullable=False)
    Email = db.Column(db.String(50), nullable=False)
    Role = db.Column(db.Integer)

    def json(self):
        return {
            "Staff_ID": self.Staff_ID,
            "Staff_FName": self.Staff_FName,
            "Staff_LName": self.Staff_LName,
            "Dept": self.Dept,
            "Country": self.Country,
            "Email": self.Email,
            "Role": self.Role,
        }


class RoleListing(db.Model):
    _tablename_ = 'role_listing'
    Role_Listing_ID=db.Column(db.Integer, primary_key=True, autoincrement=True)
    Role_Name=db.Column(db.String(20),nullable=False)
    Role_Details=db.Column(db.Text,nullable=True)
    Creation_Date=db.Column(db.Date,nullable=False)
    Expiry_Date=db.Column(db.Date,nullable=False)
    Role_AuthorID=db.Column(db.Integer,nullable=False)

    def json(self):
        return {"Role_Listing_ID": self.Role_Listing_ID, "Role_Name": self.Role_Name, "Role_Details":self.Role_Details, "Creation_Date": self.Creation_Date, "Expiry_Date": self.Expiry_Date, "Role_AuthorID": self.Role_AuthorID}


@app.route("/staff")
def get_staff():
    stafflist = Staff.query.all()
    return jsonify(
        {"code": 200, "data": {"staffs": [staff.json() for staff in stafflist]}}
    )


@app.route("/staff/<string:Email>")
def get_staff_by_email(Email):
    staff = Staff.query.filter_by(Email=Email).first()
    if staff:
        return jsonify({"code": 200, "data": staff.json()})
    return jsonify({"code": 404, "message": "No user found"})


# this doesn't work yet becasue we have yet to create the tables
@app.route("/rolelisting")
def get_rolelisting():
    rolelistings = RoleListing.query.all()
    return jsonify(
            {
                "code": 200,
                "data": {
                    "rolelistings": [rolelisting.json() for rolelisting in rolelistings]
                }
            }
        )

@app.route("/create", methods=["POST"])
def create_rolelisting():
    try:
        data = request.json

        # Query the latest Role_Listing_ID from the database to += 1
        latest_role_listing = RoleListing.query.order_by(RoleListing.Role_Listing_ID.desc()).first()
        if latest_role_listing:
            latest_id = latest_role_listing.Role_Listing_ID + 1
        else:
            latest_id = 1

        new_rolelisting = RoleListing(
            Role_Listing_ID=latest_id,
            Role_Name=data["Role_Name"],
            Role_Details=data["Role_Details"],
            Creation_Date=data["Creation_Date"],
            Expiry_Date=data["Expiry_Date"],
            Role_AuthorID=data["Role_AuthorID"]
        )
        logging.debug(f"New RoleListing: {new_rolelisting}")

        db.session.add(new_rolelisting)
        db.session.commit()
        return jsonify({"code": 201, "message": "RoleListing created successfully"})
    except Exception as e:
        return jsonify({"code": 500, "message": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
