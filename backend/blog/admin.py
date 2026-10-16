from django.contrib import admin
from .models import User, Blog, Comment


admin.site.register(User)
admin.site.register(Blog)
admin.site.register(Comment)