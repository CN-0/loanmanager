from django.shortcuts import render
from rest_framework.views import APIView
from .permissions import CustomerPermission, AgentPermission, ManagerPermission
from rest_framework.response import Response
from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from Auth.models import User
from Auth.serializers import UserSerializer
from rest_framework import generics, viewsets, mixins
from .models import Loan
from .serializers import LoanSerializer
from rest_framework import status
from django.shortcuts import get_object_or_404
import os
from django.http import HttpResponse, JsonResponse
from django.views.generic import View
from django.conf import settings
from Loanmanager import settings


def index(request):
    try:
        with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
            return HttpResponse(f.read())
    except FileNotFoundError:
        return HttpResponse(
            """
            Please build the front-end using cd frontend && npm install && npm run build 
            """,
            status=501,
        )


class UserList(generics.GenericAPIView, mixins.ListModelMixin,):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (
        IsAuthenticated, AgentPermission | ManagerPermission)
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get(self, request):
        return self.list(request)


class UserDetail(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (
        IsAuthenticated, AgentPermission | ManagerPermission)

    def put(self, request, id):
        user = get_object_or_404(User, id=id)
        username = request.data.get('username', None)
        email = request.data.get('email', None)
        user_type = request.data.get('user_type', None)
        password = request.data.get('password', None)
        if username:
            user.username = username
        if email:
            user.email = email
        if user_type:
            user.user_type = user_type
        if password:
            user.set_password(password)
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)


class UserLoan(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, CustomerPermission,)

    def get(self, request):
        loans = Loan.objects.filter(user=request.user)
        serializer = LoanSerializer(loans, many=True)
        return Response(serializer.data)


class LoanList(generics.GenericAPIView, mixins.ListModelMixin):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, AgentPermission | ManagerPermission)
    serializer_class = LoanSerializer
    queryset = Loan.objects.all()

    def get(self, request):
        return self.list(request)


class CreateLoan(generics.GenericAPIView, mixins.CreateModelMixin):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, AgentPermission)
    serializer_class = LoanSerializer
    queryset = Loan.objects.all()

    def post(self, request):
        request.data['status'] = "N"
        return self.create(request)


class UpdateLoan(generics.GenericAPIView, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, AgentPermission)

    def put(self, request, id):
        loan = get_object_or_404(Loan, id=id)
        if(loan.status == "A" or loan.status == "R"):
            return Response({"detail": "You are not allowed to change"}, status=status.HTTP_403_FORBIDDEN)
        request.data['status'] = "N"
        serializer = LoanSerializer(loan, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoanStatus(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, ManagerPermission)

    def put(self, request, id):
        loan = get_object_or_404(Loan, id=id)
        loan.status = request.data['status']
        loan.save()
        serializer = LoanSerializer(loan)
        return Response(serializer.data)
