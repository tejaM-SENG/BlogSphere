
from rest_framework import viewsets
from rest_framework.permissions import BasePermission, SAFE_METHODS

from .models import User, Blog, Comment
from .serializers import UserSerializer, BlogSerializer, CommentSerializer


class BlogPermission(BasePermission):
    def has_permission(self, request, view):
        # Public read access
        if request.method in SAFE_METHODS:
            return True

        # Must be logged in to create or modify blogs
        user = request.user
        return user.is_authenticated and user.role in ["admin", "author"]

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        user = request.user

        # Admin can edit or delete any blog
        if user.role == "admin":
            return True

        # Authors can modify only their own blogs
        return (
            user.role == "author"
            and obj.author_id == user.id
        )


class AdminUserPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return bool(
                request.user.is_authenticated
                and request.user.role == "admin"
            )

        return (
            request.user.is_authenticated
            and request.user.role == "admin"
        )


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AdminUserPermission]


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by("-created_at")
    serializer_class = BlogSerializer
    permission_classes = [BlogPermission]

    def perform_create(self, serializer):
        # Set the author from the authenticated request.
        serializer.save(author=self.request.user)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().order_by("-created_at")
    serializer_class = CommentSerializer
