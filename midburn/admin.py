from django.contrib import admin
from midburn.models import User,Camp,CampLocation,CampMember,CampSafety,Workshop

class UserAdmin(admin.ModelAdmin):
    list_display = ('first_name_en', 'first_name_he')
admin.site.register(User, UserAdmin)

class CampAdmin(admin.ModelAdmin):
    list_display = ('camp_name_en',)
admin.site.register(Camp, CampAdmin)

class CampLocationAdmin(admin.ModelAdmin):
    list_display = ('camp',)
admin.site.register(CampLocation, CampLocationAdmin)

admin.site.register(CampMember)
admin.site.register(CampSafety)
admin.site.register(Workshop)
