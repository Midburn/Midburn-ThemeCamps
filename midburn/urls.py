from django.conf.urls import include, url
from django.contrib import admin
from midburn import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'camps', views.CampViewSet)
router.register(r'camps_locations', views.CampLocationViewSet)
router.register(r'camps_members', views.CampMemberViewSet)
router.register(r'camps_safety', views.CampSafetyViewSet)
router.register(r'workshops', views.WorkshopViewSet)

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^v1/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
