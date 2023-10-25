import unittest
import json
from datetime import datetime,date
# Import your Flask app and SQLAlchemy db object
from staff import app, db, RoleApplication,Staff, StaffSkill


class staff(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        self.app = app.test_client()
        self.app_context = app.app_context()
        self.app_context.push()
        db.create_all()
        # Set up a testing database or environment
        self.populate_test_data()


    def tearDown(self):
        # Clean up after the tests (e.g., remove test data from the test database)
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_apply_for_role(self):
        # Test the apply_for_role route
        data = {
            "role_listing_id": 1,
            "applicant_id": 140002,
            "application_details": "I want to apply for this job",
            "application_date": "2023-09-25"
        }

        response = self.app.post('/jobs/apply/1', json=data)

        # Check for a successful application creation
        self.assertEqual(response.status_code, 200)

    def test_create_role_listing(self):
        # Test the create_role_listing route
        data = {
            "role_name": "Test Role",
            "role_details": "Test Role Details",
            "creation_date": "2023-10-25",
            "expiry_date": "2023-11-25",
            "role_author_id": 1,
        }

        response = self.app.post('/create', json=data)

        # Check for a successful role listing creation
        self.assertEqual(response.status_code, 200)

    def test_edit_role_listing(self):
        # Test the edit_role_listing route
        data = {
            "Role_Name": "Technical Support",
            "Role_Details": "asdf",
            "Expiry_Date": "2023-09-29",
            "Creation_Date": "2023-09-29",
            "Role_AuthorID": 0
        }

        response = self.app.put('/edit/1', json=data)

        # Check for a successful role listing edit
        self.assertEqual(response.status_code, 200)

    def test_get_applicant_by_role_listing_id(self):
        application_date_datetime1 = datetime(2023, 10, 25)
        application_date_datetime2 = datetime(2023, 10, 25)
        role_application1 = RoleApplication(
            role_listing_id=1,
            applicant_id=1,
            application_details="Test application 1",
            application_date=application_date_datetime1
        )
        role_application2 = RoleApplication(
            role_listing_id=2,
            applicant_id=2,
            application_details="Test application 2",
            application_date=application_date_datetime2,
        )

        db.session.add_all([role_application1, role_application2])
        db.session.commit()

        response = self.app.get('/jobs/1')

        self.assertEqual(response.status_code, 200)

        data = response.get_json()
        self.assertTrue("data" in data)
        applicants = data["data"]

        # Add assertions to check the response data
        self.assertEqual(len(applicants), 1)
        self.assertEqual(applicants[0]["applicant_id"], 1)
        self.assertEqual(
            applicants[0]["application_details"], "Test application 1")

    # def test_apply_for_role_success(self):
    #     # Test the apply_for_role route with valid data
    #     data = {
    #         "applicant_id": 140002,
    #         "application_details": "I want to apply for this job",
    #         "application_date": datetime(2023,9,25)
    #     }

    #     response = self.app.post('/jobs/apply/1', json=data)

    #     # Check for a successful application creation
    #     self.assertEqual(response.status_code, 200)

    #     data = response.get_json()
    #     self.assertTrue("message" in data)
    #     self.assertEqual(data["message"], "Application created successfully")

    #     # Verify that the application is stored in the database
    #     application = RoleApplication.query.filter_by(applicant_id=140002).first()
    #     self.assertIsNotNone(application)
    #     self.assertEqual(application.application_details, "I want to apply for this job")

    def populate_test_data(self):
        # Create sample staff data in the test database
        staff1 = Staff(
            staff_fname="John",
            staff_lname="Doe",
            dept="IT",
            country="USA",
            email="john.doe@example.com",
            access_role_id=1
        )
        staff2 = Staff(
            staff_fname="Jane",
            staff_lname="Smith",
            dept="HR",
            country="Canada",
            email="jane.smith@example.com",
            access_role_id=2
        )

        staff_skill1 = StaffSkill(
            staff_id=1,
            skill_name="Programming"
        )
        staff_skill2 = StaffSkill(
            staff_id=2,
            skill_name="Data Analysis"
        )
        db.session.add_all([staff1, staff2])
        db.session.commit()

    def test_get_all_staff(self):
        # Test the get_all_staff route
        response = self.app.get('/staff')

        self.assertEqual(response.status_code, 200)  # Check for a successful response

        data = response.get_json()
        self.assertTrue("data" in data)
        staff_list = data["data"]["staffs"]
        self.assertTrue(isinstance(staff_list, list))

        # Check that the expected staff data is returned
        self.assertEqual(len(staff_list), 2)  # Assuming we have added 2 staff members in populate_test_data


    def test_get_staff_by_email(self):
        # Test the get_staff_by_email route with an existing email
        response = self.app.get('/staff/john.doe@example.com')

        self.assertEqual(response.status_code, 200)  # Check for a successful response

        data = response.get_json()
        self.assertTrue("data" in data)
        staff_data = data["data"]
        self.assertEqual(staff_data["staff_fname"], "John")
        self.assertEqual(staff_data["staff_lname"], "Doe")

    def test_get_staff_by_nonexistent_email(self):
        # Test the get_staff_by_email route with a nonexistent email
        response = self.app.get('/staff/nonexistent@example.com')

        self.assertEqual(response.get_json()["code"], 404)  # Check for a 404 response

        data = response.get_json()
        self.assertTrue("message" in data)
        self.assertEqual(data["message"], "No user found")


    # def test_get_staff_skill_by_id(self):
    #     # Test the get_staff_skill_by_id route with an existing staff_id
    #     response = self.app.get('/staffskill/1')

    #     self.assertEqual(response.status_code, 200)  # Check for a successful response

    #     data = response.get_json()
    #     print(data)
    #     self.assertTrue("data" in data)
    #     staff_skills = data["data"]["staff_skills"]
    #     self.assertTrue(isinstance(staff_skills, list))
    #     self.assertEqual(len(staff_skills), 1)  # Assuming we have added 1 staff skill in populate_test_data

if __name__ == '__main__':
    unittest.main()
