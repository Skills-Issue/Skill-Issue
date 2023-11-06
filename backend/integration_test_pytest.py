import unittest
import flask_testing
import json
from staff import app, db, Role, Skill,Staff, StaffSkill, RoleSkill,RoleListing, RoleApplication
import datetime


class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.date):
            return obj.isoformat()
        return super().default(obj)

class TestApp(flask_testing.TestCase):
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite://"
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {}
    app.config['TESTING'] = True

    def create_app(self):
        return app

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()


class TestCreateRoleListing(TestApp):
    def test_create_role_listing(self):
        
        role_1 = Role(role_name="Consultancy Director",role_desc="The  Director defines and articulates the organisation's strategy for securing technical wins with prospective clients. He/She focuses on developing key growth  strategies, tactics and action plans required to achieve revenue and/or sales targets. He advises the team on developing prototypes to ensure feasibility of solutions, and oversees the delivery of in-depth presentations and product demonstrations to clients. He solves complex problems and evaluates clients needs with different perspectives. He works in a fast-paced and dynamic environment, and travels frequently to clients' premises for technical sales pitches and meetings. He is familiar with client relationship management and sales tools. He possesses deep product and technical knowledge, and is knowledgeable of the trends, developments and challenges of the industry domain. The  Director is target-driven and client centric, and has the ability to foster collaboration between stakeholders. He has a deep understanding of key business industries and knowledge of products and services in the market. He is strongly committed to developing talent and inspires his team members to pursue a common vision.")
        staff = Staff(staff_id='140003',staff_fname='Janice',staff_lname='Chan',dept='Sales',country='Singapore',email='Janice.Chan@allinone.com.sg',access_role_id='2')
        db.session.add(role_1)
        db.session.add(staff)
        db.session.commit()

        creation_date = datetime.date(2021,1,1)
        expiry_date = datetime.date(2021,12,31)
        role_listing_1 = RoleListing(role_listing_id=1,role_name="Account Manager",role_details="Account Manager Details",creation_date=creation_date,expiry_date=expiry_date,role_author_id=160008)

        request_body = {
            'role_listing_id': role_listing_1.role_listing_id,
            'role_name': role_listing_1.role_name,
            'role_details': role_listing_1.role_details,
            'creation_date': creation_date,
            'expiry_date': expiry_date,
            'role_author_id': role_listing_1.role_author_id
        }


        response = self.client.post("/create",data=json.dumps(request_body,cls=DateEncoder),content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json["message"], "RoleListing created successfully")

class TestApplyForJob(TestApp):
    def test_job_applicant(self):
        data = {
            "applicant_id": 1,
            "application_details": "Test application",
            "application_date": "2023-11-06"
        }
        response = self.client.post('/jobs/apply/1', json=data)

        # Check the response
        self.assert200(response)
        self.assertEqual(response.json, {'code': 200, 'message': 'Application created successfully'})

        with self.app.app_context():
            application = RoleApplication.query.filter_by(role_listing_id=1).first()
            self.assertIsNotNone(application)
            self.assertEqual(application.applicant_id, 1)
            self.assertEqual(application.application_details, "Test application")

if __name__ == '__main__':
    unittest.main()