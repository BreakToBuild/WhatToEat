from rest_framework import serializers


class SignUpSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=244)
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    password = serializers.CharField(max_length=244, min_length=6)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=244)
    password = serializers.CharField(max_length=244, min_length=6)
