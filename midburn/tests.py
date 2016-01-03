import unittest
from django.test import TestCase,Client

ENTITY_TYPES = ['users', 'camps', 'camps_locations', 'camps_members', 'camps_safety', 'workshops']
# Corresponding to the following models:
# User, Camp, CampLocation, CampMember, CampSafety, Workshop

# Create your tests here.
class RestTest(unittest.TestCase):
    def setUp(self):
        self.client = Client()

    def test_basic_rest(self):
        response = self.client.get('/v1/')
        self.assertEqual(response.status_code, 200)
        entity_types = response.data.keys()
        for key in ENTITY_TYPES:
            self.assertTrue(key in entity_types)

#    def test_empty_users(self):
#        response = self.client.get('/v1/users/')
#        self.assertEqual(response.status_code, 200)
#        self.assertEqual(response.data, [])

    def test_empty_entity_lists(self):
        for key in ENTITY_TYPES:
            response = self.client.get('/v1/%s/' % key)
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.data, [])
