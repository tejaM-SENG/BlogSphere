
from rest_framework import viewsets, status
from rest_framework.permissions import BasePermission, SAFE_METHODS
from .models import User, Blog, Comment
from .serializers import UserSerializer, BlogSerializer, CommentSerializer
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response

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


@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response(
            {'error': 'Email and password are required.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = authenticate(
        request,
        username=email,
        password=password
    )

    if user is None:
        return Response(
            {'error': 'Invalid Email or Password'},
            status=status.HTTP_401_UNAUTHORIZED
        )

    return Response({
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'role': user.role
    })


@api_view(['POST'])
def register_view(request):
    name = request.data.get('name')
    email = request.data.get('email')
    password = request.data.get('password')

    if not name or not email or not password:
        return Response(
            {'error': 'Please fill all fields.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Check whether email already exists
    if User.objects.filter(email=email).exists():
        return Response(
            {'error': 'Email already registered.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Create author account
    user = User.objects.create_user(
        email=email,
        name=name,
        password=password,
        role='author'
    )

    return Response(
        {
            'message': 'Registration successful.',
            'user': {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'role': user.role
            }
        },
        status=status.HTTP_201_CREATED
    )
