from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    UserViewSet,
    BlogViewSet,
    CommentViewSet,
    login_view,
    register_view
)

router = DefaultRouter()

router.register('users', UserViewSet)
router.register('blogs', BlogViewSet)
router.register('comments', CommentViewSet)

urlpatterns = [
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('', include(router.urls)),
]
