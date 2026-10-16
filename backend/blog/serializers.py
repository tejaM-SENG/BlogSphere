from rest_framework import serializers
from .models import User, Blog, Comment


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'name',
            'email',
            'role',
        ]


class BlogSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(
        source='author.name',
        read_only=True
    )

    class Meta:
        model = Blog
        fields = [
            'id',
            'title',
            'category',
            'image',
            'description',
            'author',
            'author_name',
            'created_at',
            'tags',
        ]


class CommentSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(
        source='user.name',
        read_only=True
    )

    class Meta:
        model = Comment
        fields = [
            'id',
            'blog',
            'user',
            'user_name',
            'comment',
            'created_at',
        ]