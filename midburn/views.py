from django.contrib import messages
from django.db import IntegrityError
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.views.generic import View
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from midburn.forms import UserForm
from midburn.models import *
from midburn.serializers import *
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .permissions import IsStaffOrTargetUser

@login_required
def index(request):
    user_id = request.user.id
    camps = [camp.id for camp in Camp.objects.filter(users__id=user_id)]
    context = {}
    context['camps'] = camps
    return render(request, 'index.html', context)

def iframe_test(request):
    context = {}
    return render(request, 'iframe-test.html', context)

def published_camps(request):
    context = {}
    camps = Camp.objects.filter(is_published=True)
    context['published_camps'] = [camp.get_status() for camp in camps]
    return render(request, 'camps.html', context)

def published_camps_he(request):
    context = {}
    camps = Camp.objects.filter(is_published=True)
    context['published_camps'] = [camp.get_status() for camp in camps]
    return render(request, 'camps-he.html', context)

class UserView(View):
    def get(self, request, *args, **kwargs):
        form = UserForm()
        return render(request, 'registration/signup.html', {'form': form})

    def post(self, request, *args, **kwargs):
        form = UserForm(request.POST)
        if form.is_valid():
            try:
                User.objects.create_user(**form.cleaned_data)
                # login screen
                return HttpResponseRedirect('/')
            except IntegrityError:
                messages.info(request, "This user already exists.")
                # TODO pass error message to form
                return HttpResponseRedirect('/user')

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    model = User

    def get_permissions(self):
        # allow non-authenticated user to create via POST
        return (AllowAny() if self.request.method == 'POST'
                else IsStaffOrTargetUser()),

class CampViewSet(viewsets.ModelViewSet):
    queryset = Camp.objects.all()
    serializer_class=CampSerializer

class CampLocationViewSet(viewsets.ModelViewSet):
    queryset = CampLocation.objects.all()
    serializer_class=CampLocationSerializer

class CampMemberViewSet(viewsets.ModelViewSet):
    queryset = CampMember.objects.all()
    serializer_class=CampMemberSerializer

class CampSafetyViewSet(viewsets.ModelViewSet):
    queryset = CampSafety.objects.all()
    serializer_class=CampSafetySerializer

class WorkshopViewSet(viewsets.ModelViewSet):
    queryset = Workshop.objects.all()
    serializer_class=WorkshopSerializer
