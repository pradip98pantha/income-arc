
from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('expenses/', views.expense_list, name='expense_list'),
    path('expenses/add/', views.add_expense, name='add_expense'),
    path('income/', views.income_list, name='income_list'),
    path('income/add/', views.add_income, name='add_income'),
    path('reports/', views.reports, name='reports'),
    path('group-expenses/', views.group_expenses, name='group_expenses'),
    path('group-expenses/add/', views.add_group_expense, name='add_group_expense'),
]
