# from django.contrib.auth import REDIRECT_FIELD_NAME
# from django.contrib.auth.decorators import user_passes_test


# def customer_required(function=None, redirect_field_name=REDIRECT_FIELD_NAME, login_url='login'):
#     '''
#     Decorator for views that checks that the logged in user is a student,
#     redirects to the log-in page if necessary.
#     '''
#     actual_decorator = user_passes_test(
#         lambda u: u.is_active and u.user_type == "C",
#         login_url=login_url,
#         redirect_field_name=redirect_field_name
#     )
#     if function:
#         return actual_decorator(function)
#     return actual_decorator


# def agent_required(function=None, redirect_field_name=REDIRECT_FIELD_NAME, login_url='login'):
#     '''
#     Decorator for views that checks that the logged in user is a teacher,
#     redirects to the log-in page if necessary.
#     '''
#     actual_decorator = user_passes_test(
#         lambda u: u.is_active and u.user_type == "A",
#         login_url=login_url,
#         redirect_field_name=redirect_field_name
#     )
#     if function:
#         return actual_decorator(function)
#     return actual_decorator


# def manager_required(function=None, redirect_field_name=REDIRECT_FIELD_NAME, login_url='login'):
#     '''
#     Decorator for views that checks that the logged in user is a teacher,
#     redirects to the log-in page if necessary.
#     '''
#     actual_decorator = user_passes_test(
#         lambda u: u.is_active and u.user_type == "M",
#         login_url=login_url,
#         redirect_field_name=redirect_field_name
#     )
#     if function:
#         return actual_decorator(function)
#     return actual_decorator

from rest_framework import permissions


class CustomerPermission(permissions.BasePermission):
    def has_permission(self, request, view):

        return request.user.user_type == 'C'


class AgentPermission(permissions.BasePermission):
    def has_permission(self, request, view):

        return request.user.user_type == 'A'


class ManagerPermission(permissions.BasePermission):
    def has_permission(self, request, view):

        return request.user.user_type == 'M'
