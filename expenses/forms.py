
from django import forms
from .models import Expense, Income, GroupExpense, Category

class DateInput(forms.DateInput):
    input_type = 'date'

class ExpenseForm(forms.ModelForm):
    class Meta:
        model = Expense
        fields = ['amount', 'date', 'description', 'category']
        widgets = {
            'date': DateInput(),
        }

class IncomeForm(forms.ModelForm):
    class Meta:
        model = Income
        fields = ['amount', 'date', 'source', 'description']
        widgets = {
            'date': DateInput(),
        }

class GroupExpenseForm(forms.ModelForm):
    class Meta:
        model = GroupExpense
        fields = ['title', 'total_amount', 'date', 'advanced_by', 'advance_amount']
        widgets = {
            'date': DateInput(),
        }

class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['name']

class DateRangeForm(forms.Form):
    start_date = forms.DateField(widget=DateInput())
    end_date = forms.DateField(widget=DateInput())
