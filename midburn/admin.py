from django.contrib import admin

from .models import Choice, Question

#admin.site.register(Question) -- simple

# re-order fields
#class QuestionAdmin(admin.ModelAdmin):
#   fields = ['pub_date', 'question_text']

#admin.site.register(Question, QuestionAdmin)

class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 2

class QuestionAdmin(admin.ModelAdmin):
    list_display = ('question_text', 'pub_date', 'was_published_recently')
    
    fieldsets = [
        ('Date information', {'fields': ['pub_date']}),
        ('Context',          {'fields': ['question_text']}),
        # Collapse the field
        #('Context',          {'fields': ['question_text'], 'classes': ['collapse']}),
    ]
    inlines = [ChoiceInline]
    
    list_filter = ['pub_date']
    search_fields = ['question_text']
    
admin.site.register(Question, QuestionAdmin)