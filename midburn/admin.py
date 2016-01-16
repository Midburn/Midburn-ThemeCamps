from django.contrib import admin
import csv
from django.http import HttpResponse
from django.utils.encoding import smart_str
from midburn.models import *

class CampAdminActions(admin.ModelAdmin):
    def export_csv(modeladmin, request, queryset):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=camp.csv'
        writer = csv.writer(response, csv.excel)
        response.write(u'\ufeff'.encode('utf8')) # BOM (optional...Excel needs it to open UTF-8 file properly)
        writer.writerow([
            smart_str(u"ID"),
            smart_str(u"camp_name_he"),
            smart_str(u"camp_name_en"),
            smart_str(u"camp_desc_he"),
            smart_str(u"camp_desc_en"),
            smart_str(u"camp_status"),
            smart_str(u"is_published"),
            smart_str(u"contact_email"),
            smart_str(u"contact_facebook"),
            smart_str(u"contact_name_en"),
            smart_str(u"contact_name_he"),
            smart_str(u"contact_phone"),
        ])
        for obj in queryset:
            writer.writerow([
                smart_str(obj.pk),
                smart_str(obj.camp_name_he),
                smart_str(obj.camp_name_en),
                smart_str(obj.camp_desc_he),
                smart_str(obj.camp_desc_en),
                smart_str(obj.camp_status),
                smart_str(obj.is_published),
                smart_str(obj.contact_email),
                smart_str(obj.contact_facebook),
                smart_str(obj.contact_name_en),
                smart_str(obj.contact_name_he),
                smart_str(obj.contact_phone),
            ])
        return response

    actions = [export_csv]
    export_csv.short_description = u"Export CSV"

admin.site.register(Camp, CampAdminActions)
admin.site.register(CampMember)
admin.site.register(CampLocation)
admin.site.register(CampSafety)
admin.site.register(Workshop)