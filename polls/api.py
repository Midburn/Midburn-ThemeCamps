from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from tastypie.authentication import Authentication
from polls.models import Question

class QuestionResource(ModelResource):
     """
     API Facet
     """
     class Meta:
         queryset = Question.objects.all()
         resource_name = 'question'
         allowed_methods = ['post', 'get', 'patch', 'delete']
         authentication = Authentication()
         authorization = Authorization()
         always_return_data = True