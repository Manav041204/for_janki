# urls.py
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import SignupView, HomeView, login

urlpatterns = [
    path('api/signup/', SignupView.as_view(), name='signup'),
    path('api/login/', login, name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/home/', HomeView.as_view(), name='home'),
]