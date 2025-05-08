
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Sum
from django.utils import timezone
from datetime import timedelta
from .models import Expense, Income, Category, GroupExpense
from .forms import ExpenseForm, IncomeForm, CategoryForm, GroupExpenseForm, DateRangeForm

@login_required
def dashboard(request):
    # Get data for the last 30 days
    thirty_days_ago = timezone.now().date() - timedelta(days=30)
    
    # Calculate summary data
    expenses = Expense.objects.filter(user=request.user, date__gte=thirty_days_ago)
    incomes = Income.objects.filter(user=request.user, date__gte=thirty_days_ago)
    
    total_expense = expenses.aggregate(Sum('amount'))['amount__sum'] or 0
    total_income = incomes.aggregate(Sum('amount'))['amount__sum'] or 0
    balance = total_income - total_expense
    
    # Get recent expenses and incomes
    recent_expenses = expenses.order_by('-date')[:5]
    
    # Get group expenses
    group_expenses = GroupExpense.objects.filter(creator=request.user)[:5]
    
    # Budget information (simple example)
    budget = 3000  # This would ideally come from a budget model
    budget_status = "Under Budget" if total_expense < budget else "Over Budget"
    
    context = {
        'total_expense': total_expense,
        'total_income': total_income,
        'balance': balance,
        'recent_expenses': recent_expenses,
        'group_expenses': group_expenses,
        'budget': budget,
        'budget_status': budget_status,
    }
    return render(request, 'expenses/dashboard.html', context)

@login_required
def expense_list(request):
    expenses = Expense.objects.filter(user=request.user).order_by('-date')
    categories = Category.objects.all()
    
    # Calculate total expenses
    total_expenses = expenses.aggregate(Sum('amount'))['amount__sum'] or 0
    
    context = {
        'expenses': expenses,
        'categories': categories,
        'total_expenses': total_expenses,
    }
    return render(request, 'expenses/expense_list.html', context)

@login_required
def add_expense(request):
    if request.method == 'POST':
        form = ExpenseForm(request.POST)
        if form.is_valid():
            expense = form.save(commit=False)
            expense.user = request.user
            expense.save()
            messages.success(request, 'Expense added successfully!')
            return redirect('expense_list')
    else:
        form = ExpenseForm()
    
    return render(request, 'expenses/expense_form.html', {'form': form})

@login_required
def income_list(request):
    incomes = Income.objects.filter(user=request.user).order_by('-date')
    
    # Calculate total income
    total_income = incomes.aggregate(Sum('amount'))['amount__sum'] or 0
    
    context = {
        'incomes': incomes,
        'total_income': total_income,
    }
    return render(request, 'expenses/income_list.html', context)

@login_required
def add_income(request):
    if request.method == 'POST':
        form = IncomeForm(request.POST)
        if form.is_valid():
            income = form.save(commit=False)
            income.user = request.user
            income.save()
            messages.success(request, 'Income added successfully!')
            return redirect('income_list')
    else:
        form = IncomeForm()
    
    return render(request, 'expenses/income_form.html', {'form': form})

@login_required
def reports(request):
    # Get data for the last 30 days by default
    end_date = timezone.now().date()
    start_date = end_date - timedelta(days=30)
    
    # Process date range selection
    if request.method == 'POST':
        date_form = DateRangeForm(request.POST)
        if date_form.is_valid():
            start_date = date_form.cleaned_data['start_date']
            end_date = date_form.cleaned_data['end_date']
    else:
        date_form = DateRangeForm(initial={'start_date': start_date, 'end_date': end_date})
    
    # Get expenses and incomes for the selected period
    expenses = Expense.objects.filter(
        user=request.user,
        date__gte=start_date,
        date__lte=end_date
    )
    
    incomes = Income.objects.filter(
        user=request.user,
        date__gte=start_date,
        date__lte=end_date
    )
    
    # Calculate summary data
    total_expense = expenses.aggregate(Sum('amount'))['amount__sum'] or 0
    total_income = incomes.aggregate(Sum('amount'))['amount__sum'] or 0
    balance = total_income - total_expense
    
    # Get category-wise expense data
    categories = Category.objects.all()
    category_data = []
    
    for category in categories:
        category_expenses = expenses.filter(category=category)
        category_sum = category_expenses.aggregate(Sum('amount'))['amount__sum'] or 0
        if category_sum > 0:  # Only include categories with expenses
            category_data.append({
                'name': category.name,
                'amount': category_sum,
                'percentage': (category_sum / total_expense * 100) if total_expense > 0 else 0
            })
    
    # Get expense data grouped by date
    expenses_by_date = {}
    for expense in expenses:
        date_str = expense.date.strftime('%Y-%m-%d')
        if date_str in expenses_by_date:
            expenses_by_date[date_str] += expense.amount
        else:
            expenses_by_date[date_str] = expense.amount
    
    # Recent transactions
    recent_transactions = list(expenses)
    
    context = {
        'date_form': date_form,
        'total_expense': total_expense,
        'total_income': total_income,
        'balance': balance,
        'category_data': category_data,
        'expenses_by_date': expenses_by_date,
        'recent_transactions': recent_transactions[:10],
        'start_date': start_date,
        'end_date': end_date,
    }
    
    return render(request, 'expenses/reports.html', context)

@login_required
def group_expenses(request):
    group_expenses = GroupExpense.objects.filter(creator=request.user).order_by('-date')
    
    # Calculate summary data
    total_advanced = group_expenses.aggregate(Sum('advance_amount'))['advance_amount__sum'] or 0
    total_expenses = group_expenses.aggregate(Sum('total_amount'))['total_amount__sum'] or 0
    active_groups = group_expenses.filter(status='active').count()
    
    context = {
        'group_expenses': group_expenses,
        'total_advanced': total_advanced,
        'total_expenses': total_expenses,
        'active_groups': active_groups,
    }
    return render(request, 'expenses/group_expenses.html', context)

@login_required
def add_group_expense(request):
    if request.method == 'POST':
        form = GroupExpenseForm(request.POST)
        if form.is_valid():
            group_expense = form.save(commit=False)
            group_expense.creator = request.user
            group_expense.save()
            messages.success(request, 'Group expense added successfully!')
            return redirect('group_expenses')
    else:
        form = GroupExpenseForm()
    
    return render(request, 'expenses/group_expense_form.html', {'form': form})
