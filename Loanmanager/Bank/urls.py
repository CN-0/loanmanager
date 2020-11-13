from django.urls import path, include
from .views import UserList, UserDetail, LoanList, UserLoan, CreateLoan, UpdateLoan, LoanStatus, index
from rest_framework.routers import DefaultRouter
from . import views

urlpatterns = [
    path('users/', UserList.as_view()),
    path('users/<int:id>/', UserDetail.as_view()),
    path('loans/', LoanList.as_view()),
    path('userloan/', UserLoan.as_view()),
    path('loans/create/', CreateLoan.as_view()),
    path('loans/update/<int:id>/', UpdateLoan.as_view()),
    path('loans/status/<int:id>/', LoanStatus.as_view()),
    path('', index, name='index'),
]
