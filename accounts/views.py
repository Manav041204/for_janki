# views.py
from rest_framework import generics
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from .models import CommonUser
from django.contrib.auth.hashers import check_password
from .serializers import CommonUserSerializer
from rest_framework.response import Response
from rest_framework import generics, status

class SignupView(generics.CreateAPIView):
    queryset = CommonUser.objects.all()
    serializer_class = CommonUserSerializer

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

@api_view(["POST"])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"detail": "Email and password are required."}, status=400)

    try:
        user = CommonUser.objects.get(email=email)
    except CommonUser.DoesNotExist:
        return Response({"detail": "No active account found with the given credentials."}, status=400)

    if not check_password(password, user.password):
        return Response({"detail": "Invalid email or password."}, status=400)

    if not user.is_active:
        return Response({"detail": "This account is inactive."}, status=400)

    refresh = RefreshToken.for_user(user)
    
    return Response({
        "detail": "Login successful",
        "username": user.name,
        "email": user.email,
        "is_committee": user.is_committee,
        "is_resident": user.is_resident,
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }, status=200)       

class HomeView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print(request)
        if request.user.is_resident:
            return Response({'redirect': 'resident_home'})
        elif request.user.is_committee:
            return Response({'redirect': 'committee_home'})
        else:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)