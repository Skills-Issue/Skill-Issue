from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ
from decouple import config
import logging


app = Flask(__name__)
CORS(app)
password = config("DB_PASSWORD")
username = config("DB_USERNAME")

# Configure logging
logging.basicConfig(level=logging.DEBUG)

if __name__ == "__main__":
    app.config["SQLALCHEMY_DATABASE_URI"] = (
        "mysql+mysqlconnector://"
        + username
        + password
        + "@skills-issue-sg.ccbebjzsuilf.ap-southeast-1.rds.amazonaws.com:3306/sbrp"
    )
    app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {"pool_size": 100, "pool_recycle": 280}
else:
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite://"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class Role(db.Model):
    __tablename__ = "role"
    role_name = db.Column(db.String(20), primary_key=True)
    role_desc = db.Column(db.Text(), nullable=False)

    def json(self):
        return {
            "role_name": self.role_name,
            "role_desc": self.role_desc,
        }


class AccessControl(db.Model):
    __tablename__ = "access_control"
    access_id = db.Column(db.Integer, primary_key=True)
    access_control_name = db.Column(db.String(20), nullable=False)

    def json(self):
        return {
            "access_id": self.access_id,
            "access_control_name": self.access_control_name,
        }


class Skill(db.Model):
    __tablename__ = "skill"
    skill_name = db.Column(db.String(50), primary_key=True)
    skill_desc = db.Column(db.Text(), nullable=False)

    def json(self):
        return {
            "skill_name": self.skill_name,
            "skill_desc": self.skill_desc,
        }


class Staff(db.Model):
    __tablename__ = "staff"
    staff_id = db.Column(db.Integer, primary_key=True)
    staff_fname = db.Column(db.String(50), nullable=False)
    staff_lname = db.Column(db.String(50), nullable=False)
    dept = db.Column(db.String(50), nullable=False)
    country = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    access_role_id = db.Column(db.Integer)

    def json(self):
        return {
            "staff_id": self.staff_id,
            "staff_fname": self.staff_fname,
            "staff_lname": self.staff_lname,
            "dept": self.dept,
            "country": self.country,
            "email": self.email,
            "access_role_id": self.access_role_id,
        }


class StaffSkill(db.Model):
    __tablename__ = "staff_skill"
    staff_id = db.Column(db.Integer, primary_key=True)
    skill_name = db.Column(db.String(50), primary_key=True)

    def json(self):
        return {
            "staff_id": self.staff_id,
            "skill_name": self.skill_name,
        }


class RoleListing(db.Model):
    __tablename__ = "role_listing"
    role_listing_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    role_name = db.Column(db.String(20), nullable=False)
    role_details = db.Column(db.Text, nullable=True)
    creation_date = db.Column(db.Date, nullable=False)
    expiry_date = db.Column(db.Date, nullable=False)
    role_author_id = db.Column(db.Integer, nullable=False)

    def json(self):
        return {
            "role_listing_id": self.role_listing_id,
            "role_name": self.role_name,
            "role_details": self.role_details,
            "creation_date": self.creation_date,
            "expiry_date": self.expiry_date,
            "role_author_id": self.role_author_id,
        }


class RoleSkill(db.Model):
    __tablename__ = "role_skill"
    role_name = db.Column(db.String(20), primary_key=True)
    skill_name = db.Column(db.String(50), primary_key=True)

    def json(self):
        return {"role_name": self.role_name, "skill_name": self.skill_name}


class RoleApplication(db.Model):
    __tablename__ = "role_application"
    application_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    role_listing_id = db.Column(db.Integer, nullable=False)
    applicant_id = db.Column(db.Integer, nullable=False)
    application_details = db.Column(db.Text(), nullable=False)
    application_date = db.Column(db.Date, nullable=False)

    def json(self):
        return {
            "application_id": self.application_id,
            "role_listing_id": self.role_listing_id,
            "application_details": self.application_details,
            "applicant_id": self.applicant_id,
            "application_date": self.application_date,
        }


##################### NON TABLE CLASSES #####################


class RoleListingWithSkills:
    def __init__(
        self,
        role_listing_id,
        role_name,
        role_details,
        creation_date,
        expiry_date,
        role_author_id,
        skills,
    ):
        self.role_listing_id = role_listing_id
        self.role_name = role_name
        self.role_details = role_details
        self.creation_date = creation_date
        self.expiry_date = expiry_date
        self.role_author_id = role_author_id
        self.skills = skills

    def json(self):
        return {
            "role_listing_id": self.role_listing_id,
            "role_name": self.role_name,
            "role_details": self.role_details,
            "creation_date": self.creation_date,
            "expiry_date": self.expiry_date,
            "role_author_id": self.role_author_id,
            "skills": self.skills,
        }


class RoleListingWithAppCount:
    def __init__(
        self,
        role_listing_id,
        role_name,
        role_details,
        creation_date,
        expiry_date,
        role_author_id,
        app_count,
    ):
        self.role_listing_id = role_listing_id
        self.role_name = role_name
        self.role_details = role_details
        self.creation_date = creation_date
        self.expiry_date = expiry_date
        self.role_author_id = role_author_id
        self.app_count = app_count

    def json(self):
        return {
            "role_listing_id": self.role_listing_id,
            "role_name": self.role_name,
            "role_details": self.role_details,
            "creation_date": self.creation_date,
            "expiry_date": self.expiry_date,
            "role_author_id": self.role_author_id,
            "app_count": self.app_count,
        }


@app.route("/jobs/<int:role_listing_id>")
def get_applicant_by_role_listing_id(role_listing_id):
    applicant = RoleApplication.query.filter_by(role_listing_id=role_listing_id).all()
    if applicant:
        return jsonify(
            {"code": 200, "data": [applicant.json() for applicant in applicant]}
        )
    return jsonify({"code": 404, "message": "No user found"})


# Need to check the jobs/apply/<int:role_listing_id> route... the unittest got issues
@app.route("/jobs/apply/<int:role_listing_id>", methods=["POST"])
def apply_for_role(role_listing_id):
    try:
        data = request.get_json()
        new_application = RoleApplication(
            role_listing_id=role_listing_id,
            applicant_id=data["applicant_id"],
            application_details=data["application_details"],
            application_date=data["application_date"],
        )
        db.session.add(new_application)
        db.session.commit()
        return jsonify({"code": 200, "message": "Application created successfully"})
    except Exception as e:
        return jsonify({"code": 500, "message": str(e)})


@app.route("/staff")
def get_all_staff():
    staff_list = Staff.query.all()
    return jsonify(
        {"code": 200, "data": {"staffs": [staff.json() for staff in staff_list]}}
    )


@app.route("/staff/<int:staff_id>")
def get_staff_by_id(staff_id):
    staff = Staff.query.filter_by(staff_id=staff_id).first()
    if staff:
        return jsonify({"code": 200, "data": staff.json()})
    return jsonify({"code": 404, "message": "No user found"})


@app.route("/staff/<string:email>")
def get_staff_by_email(email):
    staff = Staff.query.filter_by(email=email).first()
    if staff:
        return jsonify({"code": 200, "data": staff.json()})
    return jsonify({"code": 404, "message": "No user found"})


@app.route("/staffskill/<int:staff_id>")
def get_staff_skill_by_id(staff_id):
    staffskills = StaffSkill.query.filter_by(staff_id=staff_id).all()
    if staffskills:
        return jsonify(
            {
                "code": 200,
                "data": {
                    "staff_skills": [staffskill.json() for staffskill in staffskills]
                },
            }
        )
    return jsonify({"code": 404, "message": "No user found"})


@app.route("/rolelistings")
def get_all_rolelistings():
    role_listings = RoleListing.query.all()
    return jsonify(
        {
            "code": 200,
            "data": {
                "role_listings": [role_listing.json() for role_listing in role_listings]
            },
        }
    )


@app.route("/rolelistingsappcount")
def get_all_rolelistings_app_count():
    result = (
        db.session.query(RoleListing, db.func.count(RoleApplication.application_id))
        .outerjoin(
            RoleApplication,
            RoleListing.role_listing_id == RoleApplication.role_listing_id,
        )
        .group_by(RoleListing.role_listing_id)
    )
    return jsonify(
        {
            "code": 200,
            "data": {
                "role_listings_app_count": [
                    RoleListingWithAppCount(
                        role_listing.role_listing_id,
                        role_listing.role_name,
                        role_listing.role_details,
                        role_listing.creation_date,
                        role_listing.expiry_date,
                        role_listing.role_author_id,
                        app_count,
                    ).json()
                    for role_listing, app_count in result
                ]
            },
        }
    )


@app.route("/countrolelistings/<int:role_id>")
def get_count(role_id):
    count = RoleApplication.query.filter_by(role_listing_id=role_id).count()
    return jsonify({"code": 200, "data": count})


@app.route("/create", methods=["POST"])
def create_role_listing():
    try:
        data = request.get_json()

        # Find the largest role_listing_id in the database
        largest_role_listing_id = db.session.query(
            db.func.max(RoleListing.role_listing_id)
        ).scalar()

        # Increment the largest role_listing_id by 1
        new_role_listing_id = (
            largest_role_listing_id + 1 if largest_role_listing_id is not None else 1
        )

        new_role_listing = RoleListing(
            role_listing_id=new_role_listing_id,
            role_name=data["role_name"],
            role_details=data["role_details"],
            creation_date=data["creation_date"],
            expiry_date=data["expiry_date"],
            role_author_id=data["role_author_id"],
        )

        db.session.add(new_role_listing)
        db.session.commit()
        return jsonify({"code": 200, "message": "RoleListing created successfully"})
    except Exception as e:
        return jsonify({"code": 500, "message": str(e)})


@app.route("/edit/<int:role_listing_id>", methods=["GET"])
def get_role_listing_by_id(role_listing_id):
    try:
        role_listing = RoleListing.query.get(role_listing_id)

        if not role_listing:
            return jsonify({"code": 404, "message": "Role Listing not found"})

        role_data = {
            "role_name": role_listing.role_name,
            "role_details": role_listing.role_details,
            "expiry_date": role_listing.expiry_date.strftime("%Y-%m-%d"),
            "creation_date": role_listing.creation_date.strftime("%Y-%m-%d"),
            "role_author_id": role_listing.role_author_id,
        }

        return jsonify({"code": 200, "data": role_data})
    except Exception as e:
        return jsonify({"code": 500, "message": str(e)})


@app.route("/edit/<int:role_listing_id>", methods=["PUT"])
def edit_role_listing(role_listing_id):
    try:
        data = request.get_json()
        role_listing = RoleListing.query.get(role_listing_id)

        if not role_listing:
            return jsonify({"code": 404, "message": "RoleListing not found"})

        role_listing.role_name = data.get("role_name", role_listing.role_name)
        role_listing.role_details = data.get("role_details", role_listing.role_details)
        role_listing.creation_date = data.get(
            "creation_date", role_listing.creation_date
        )
        role_listing.expiry_date = data.get("expiry_date", role_listing.expiry_date)
        role_listing.role_author_id = data.get(
            "role_author_id", role_listing.role_author_id
        )

        db.session.commit()
        return jsonify({"code": 200, "message": "RoleListing edited successfully"})
    except Exception as e:
        return jsonify({"code": 500, "message": str(e)})


@app.route("/rolelistingwithskills")
def get_role_listings_with_skills():
    role_listings = RoleListing.query.all()
    role_skills = RoleSkill.query.all()
    role_skills_dict = {}
    role_listings_with_skills = []

    for role_skill in role_skills:
        role_skills_dict[role_skill.role_name] = role_skills_dict.get(
            role_skill.role_name, []
        ) + [role_skill.skill_name]

    for role_listing in role_listings:
        if role_listing.role_name in role_skills_dict:
            role_listings_with_skills.append(
                RoleListingWithSkills(
                    role_listing.role_listing_id,
                    role_listing.role_name,
                    role_listing.role_details,
                    role_listing.creation_date,
                    role_listing.expiry_date,
                    role_listing.role_author_id,
                    role_skills_dict[role_listing.role_name],
                ).json()
            )
        else:
            role_listings_with_skills.append(
                RoleListingWithSkills(
                    role_listing.role_listing_id,
                    role_listing.role_name,
                    role_listing.role_details,
                    role_listing.creation_date,
                    role_listing.expiry_date,
                    role_listing.role_author_id,
                    [],
                ).json()
            )
    return jsonify(
        {"code": 200, "data": {"role_listings_with_skills": role_listings_with_skills}}
    )


@app.route("/rolelistingwithskills/<int:role_listing_id>")
def get_role_listing_with_skills_by_id(role_listing_id):
    role_listing = RoleListing.query.filter_by(role_listing_id=role_listing_id).first()
    role_skills = RoleSkill.query.filter_by(role_name=role_listing.role_name).all()
    role_skills_dict = {}
    role_listings_with_skills = []

    for role_skill in role_skills:
        role_skills_dict[role_skill.role_name] = role_skills_dict.get(
            role_skill.role_name, []
        ) + [role_skill.skill_name]

    if role_listing.role_name in role_skills_dict:
        role_listings_with_skills.append(
            RoleListingWithSkills(
                role_listing.role_listing_id,
                role_listing.role_name,
                role_listing.role_details,
                role_listing.creation_date,
                role_listing.expiry_date,
                role_listing.role_author_id,
                role_skills_dict[role_listing.role_name],
            ).json()
        )
    else:
        role_listings_with_skills.append(
            RoleListingWithSkills(
                role_listing.role_listing_id,
                role_listing.role_name,
                role_listing.role_details,
                role_listing.creation_date,
                role_listing.expiry_date,
                role_listing.role_author_id,
                [],
            ).json()
        )
    return jsonify(
        {"code": 200, "data": {"role_listings_with_skills": role_listings_with_skills}}
    )


@app.route("/rolelistingapplicantscount/<int:role_listing_id>")
def get_role_listings_applicants_count(role_listing_id):
    count = RoleApplication.query.filter_by(role_listing_id=role_listing_id).count()
    return jsonify({"code": 200, "count": count})


@app.route("/skills")
def get_role():
    skill_list = Skill.query.all()
    return jsonify(
        {"code": 200, "data": {"staffs": [skill.json() for skill in skill_list]}}
    )


@app.route("/roles")
def get_all_role():
    role_list = Role.query.all()
    return jsonify(
        {"code": 200, "data": {"staffs": [role.json() for role in role_list]}}
    )


if __name__ == "__main__":
    app.run(debug=True)
