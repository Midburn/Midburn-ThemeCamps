from django.conf.urls import include, url
from django.contrib import admin
from midburn import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'camps', views.CampViewSet)
router.register(r'camps_locations', views.CampLocationViewSet)
router.register(r'camps_members', views.CampMemberViewSet)
router.register(r'camps_safety', views.CampSafetyViewSet)
router.register(r'workshops', views.WorkshopViewSet)
router.register(r'users', views.UserViewSet, 'user_list')

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^iframe-test$', views.iframe_test, name='iframe_test'),
    url(r'^published-camps$', views.published_camps, name='published_camps'),
    url(r'^published-camps-he', views.published_camps_he, name='published_camps_he'),
    url('^', include('django.contrib.auth.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^signup$', views.UserView.as_view(), name='signup'),
    url(r'^v1/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
