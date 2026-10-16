from django.contrib.auth import authenticate
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import User, Blog, Comment
from .serializers import UserSerializer, BlogSerializer, CommentSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by('-created_at')
    serializer_class = BlogSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().order_by('-created_at')
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

