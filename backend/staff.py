from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ
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

class RoleSkill(db.Model):
    _tablename_ = 'role_skill'
    Role_Name=db.Column(db.String(20),primary_key=True)
    Skill_Name=db.Column(db.String(50),primary_key=True)

    def json(self):
        return {"Role_Name": self.Role_Name, "Skill_Name": self.Skill_Name}

class RoleListingWithSkills():
    def __init__(self, Role_Listing_ID, Role_Name, Role_Details, Creation_Date, Expiry_Date, Role_AuthorID, Skills):
        self.Role_Listing_ID = Role_Listing_ID
        self.Role_Name = Role_Name
        self.Role_Details = Role_Details
        self.Creation_Date = Creation_Date
        self.Expiry_Date = Expiry_Date
        self.Role_AuthorID = Role_AuthorID
        self.Skills = Skills

    def json(self):
        return {"Role_Listing_ID": self.Role_Listing_ID, "Role_Name": self.Role_Name, "Role_Details":self.Role_Details, "Creation_Date": self.Creation_Date, "Expiry_Date": self.Expiry_Date, "Role_AuthorID": self.Role_AuthorID, "Skills": self.Skills}

class RoleApplication(db.Model):
    _tablename_ = 'role_application'
    Application_ID=db.Column(db.Integer, primary_key=True)
    Role_Listing_ID=db.Column(db.Integer,nullable=False)
    Applicant_ID=db.Column(db.Integer, autoincrement=True)
    Application_Details=db.Column(db.String(200),nullable=False)
    Application_Date=db.Column(db.Date,nullable=False)

    def json(self):
         return {"Application_ID": self.Application_ID,"Role_Listing_ID": self.Role_Listing_ID, "Application_Details": self.Application_Details, "Applicant_ID":self.Applicant_ID, "Application_Date": self.Application_Date}

@app.route("/jobs/<int:Role_Listing_ID>")
def GetApplicantByRolelistingId(Role_Listing_ID):
    applicant = RoleApplication.query.filter_by(Role_Listing_ID=Role_Listing_ID).all()
    if applicant:
        return jsonify({"code": 200, "data": [applicant.json() for applicant in applicant]})
    return jsonify({"code": 404, "message": "No user found"})

@app.route("/jobs/apply/<int:Role_Listing_ID>", methods=["POST"])
def ApplyForRole(Role_Listing_ID):
    try:
        data = request.get_json()
        new_application = RoleApplication(
            Role_Listing_ID=Role_Listing_ID,
            Applicant_ID=data["Applicant_ID"],
            Application_Details=data["Application_Details"],
            Application_Date=data["Application_Date"]
        )
        db.session.add(new_application)
        db.session.commit()
        return jsonify({"code": 201, "message": "Application created successfully"})
    except Exception as e:
        return jsonify({"code": 500, "message": str(e)})


@app.route("/staff")
def Get_Staff():
    stafflist = Staff.query.all()
    return jsonify(
        {"code": 200, "data": {"staffs": [staff.json() for staff in stafflist]}}
    )


@app.route("/staff/<string:Email>")
def GetStaffByEmail(Email):
    staff = Staff.query.filter_by(Email=Email).first()
    if staff:
        return jsonify({"code": 200, "data": staff.json()})
    return jsonify({"code": 404, "message": "No user found"})

@app.route("/rolelistings")
def GetRolelisting():
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
def CreateRolelisting():
    try:
        data = request.get_json()

        new_rolelisting = RoleListing(
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


@app.route("/rolelistingwithskills")
def GetRolelistingWithSkills():
    rolelistings = RoleListing.query.all()
    rolelistingswithskills = []
    for rolelisting in rolelistings:
        skills = []
        #rolename in rolelisting join the rolename in the roleskill table
        for roleskill in RoleSkill.query.filter_by(Role_Name=rolelisting.Role_Name).all():
            skills.append(roleskill.Skill_Name)
        rolelistingswithskills.append(RoleListingWithSkills(rolelisting.Role_Listing_ID, rolelisting.Role_Name, rolelisting.Role_Details, rolelisting.Creation_Date, rolelisting.Expiry_Date, rolelisting.Role_AuthorID, skills).json())
    return jsonify(
            {
                "code": 200,
                "data": {
                    "rolelistings": rolelistingswithskills
                }
            }
        )

if __name__ == "__main__":
    app.run(debug=True)
