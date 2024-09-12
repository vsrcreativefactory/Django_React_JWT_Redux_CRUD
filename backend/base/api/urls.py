from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.registerUser, name='register'),

    # User management endpoints
    path('users/', views.getUsers, name='get_users'),
    path('users/create/', views.createUser, name='create_user'),
    path('users/<int:pk>/update/', views.updateUser, name='update_user'),
    path('users/<int:pk>/delete/', views.deleteUser, name='delete_user'),
]
