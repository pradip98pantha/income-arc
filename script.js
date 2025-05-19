
// Main JavaScript for Expense Tracker

// Mock data storage (in a real app this would be a database)
let transactions = [];
let currentUser = null;
let users = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set current date as default for transaction form
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('transactionDate').value = today;
    
    // Set current month in filters
    const currentMonth = new Date().getMonth();
    document.getElementById('expenseMonth').value = currentMonth;
    document.getElementById('incomeMonth').value = currentMonth;
    
    // Set default dates for reports (current month)
    const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
    const lastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0];
    document.getElementById('reportStartDate').value = firstDay;
    document.getElementById('reportEndDate').value = lastDay;
    
    // Load data from local storage if available
    loadDataFromStorage();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize event listeners
    initEventListeners();
    
    // Update UI with data
    updateDashboard();
    updateExpensesPage();
    updateIncomePage();
    generateReport();
});

// Initialize navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.page-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// Initialize all event listeners
function initEventListeners() {
    // Transaction modal events
    document.getElementById('addTransactionBtn').addEventListener('click', showAddTransactionModal);
    document.getElementById('addExpenseBtn').addEventListener('click', showAddExpenseModal);
    document.getElementById('addIncomeBtn').addEventListener('click', showAddIncomeModal);
    document.getElementById('saveTransactionBtn').addEventListener('click', saveTransaction);
    document.getElementById('transactionType').addEventListener('change', toggleTransactionFields);
    
    // Filter change events
    document.getElementById('expenseMonth').addEventListener('change', updateExpensesPage);
    document.getElementById('expenseCategory').addEventListener('change', updateExpensesPage);
    document.getElementById('expenseSortBy').addEventListener('change', updateExpensesPage);
    document.getElementById('expenseSortOrder').addEventListener('change', updateExpensesPage);
    
    document.getElementById('incomeMonth').addEventListener('change', updateIncomePage);
    document.getElementById('incomeSource').addEventListener('change', updateIncomePage);
    document.getElementById('incomeSortBy').addEventListener('change', updateIncomePage);
    document.getElementById('incomeSortOrder').addEventListener('change', updateIncomePage);
    
    // Report events
    document.getElementById('generateReportBtn').addEventListener('click', generateReport);
    document.getElementById('reportType').addEventListener('change', updateReportTitle);
    
    // Authentication events
    document.getElementById('loginBtn').addEventListener('click', showLoginModal);
    document.getElementById('registerBtn').addEventListener('click', showRegisterModal);
    document.getElementById('showLoginModal').addEventListener('click', function(e) {
        e.preventDefault();
        $('#registerModal').modal('hide');
        showLoginModal();
    });
    document.getElementById('showRegisterModal').addEventListener('click', function(e) {
        e.preventDefault();
        $('#loginModal').modal('hide');
        showRegisterModal();
    });
    document.getElementById('loginSubmitBtn').addEventListener('click', handleLogin);
    document.getElementById('registerSubmitBtn').addEventListener('click', handleRegister);
}

// Load data from local storage
function loadDataFromStorage() {
    const savedTransactions = localStorage.getItem('expenseTrackerTransactions');
    if (savedTransactions) {
        transactions = JSON.parse(savedTransactions);
    } else {
        // Generate sample data if no data exists
        generateSampleData();
    }
    
    const savedUsers = localStorage.getItem('expenseTrackerUsers');
    if (savedUsers) {
        users = JSON.parse(savedUsers);
    } else {
        // Create a sample user
        users = [
            {
                id: 1,
                name: 'Demo User',
                email: 'demo@example.com',
                password: 'password123'
            }
        ];
        saveDataToStorage();
    }
    
    const savedUser = localStorage.getItem('expenseTrackerCurrentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthUI(true);
    }
}

// Save data to local storage
function saveDataToStorage() {
    localStorage.setItem('expenseTrackerTransactions', JSON.stringify(transactions));
    localStorage.setItem('expenseTrackerUsers', JSON.stringify(users));
    if (currentUser) {
        localStorage.setItem('expenseTrackerCurrentUser', JSON.stringify(currentUser));
    } else {
        localStorage.removeItem('expenseTrackerCurrentUser');
    }
}

// Generate sample data for demonstration
function generateSampleData() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    
    // Generate some expense transactions
    const expenseCategories = ['food', 'transportation', 'housing', 'utilities', 'entertainment', 'health', 'education', 'shopping', 'personal', 'other'];
    const expenseDescriptions = [
        'Grocery shopping', 'Restaurant dinner', 'Gasoline', 'Uber ride', 'Monthly rent', 'Electricity bill',
        'Water bill', 'Internet service', 'Movie tickets', 'Concert tickets', 'Pharmacy', 'Doctor visit',
        'Online course', 'Textbooks', 'Clothing', 'Electronics', 'Haircut', 'Gym membership', 'Office supplies'
    ];
    
    // Generate some income transactions
    const incomeSources = ['salary', 'business', 'freelance', 'investment', 'gifts', 'other'];
    const incomeDescriptions = ['Monthly salary', 'Side business revenue', 'Freelance project', 'Stock dividends', 'Birthday gift', 'Tax refund'];
    
    for (let i = 0; i < 20; i++) {
        // Random expense
        const expenseCategory = expenseCategories[Math.floor(Math.random() * expenseCategories.length)];
        const expenseAmount = Math.floor(Math.random() * 200) + 10;
        const expenseDay = Math.floor(Math.random() * 28) + 1;
        const expenseDate = new Date(currentYear, currentMonth, expenseDay);
        
        transactions.push({
            id: generateId(),
            type: 'expense',
            date: expenseDate.toISOString().split('T')[0],
            category: expenseCategory,
            description: expenseDescriptions[Math.floor(Math.random() * expenseDescriptions.length)],
            amount: expenseAmount
        });
        
        // Random income (fewer income transactions)
        if (i % 4 === 0) {
            const incomeSource = incomeSources[Math.floor(Math.random() * incomeSources.length)];
            const incomeAmount = Math.floor(Math.random() * 2000) + 500;
            const incomeDay = Math.floor(Math.random() * 15) + 1;
            const incomeDate = new Date(currentYear, currentMonth, incomeDay);
            
            transactions.push({
                id: generateId(),
                type: 'income',
                date: incomeDate.toISOString().split('T')[0],
                source: incomeSource,
                description: incomeDescriptions[Math.floor(Math.random() * incomeDescriptions.length)],
                amount: incomeAmount
            });
        }
    }
    
    // Add a big salary income
    transactions.push({
        id: generateId(),
        type: 'income',
        date: new Date(currentYear, currentMonth, 1).toISOString().split('T')[0],
        source: 'salary',
        description: 'Monthly salary',
        amount: 4000
    });
    
    // Sort transactions by date
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Save to local storage
    saveDataToStorage();
}

// Generate a unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Show transaction modal for adding a new transaction
function showAddTransactionModal() {
    document.getElementById('transactionModalLabel').textContent = 'Add Transaction';
    document.getElementById('transactionId').value = '';
    document.getElementById('transactionForm').reset();
    document.getElementById('transactionDate').value = new Date().toISOString().split('T')[0];
    
    const transactionModal = new bootstrap.Modal(document.getElementById('transactionModal'));
    transactionModal.show();
}

// Show transaction modal configured for adding an expense
function showAddExpenseModal() {
    document.getElementById('transactionType').value = 'expense';
    toggleTransactionFields();
    showAddTransactionModal();
}

// Show transaction modal configured for adding income
function showAddIncomeModal() {
    document.getElementById('transactionType').value = 'income';
    toggleTransactionFields();
    showAddTransactionModal();
}

// Toggle appropriate fields based on transaction type
function toggleTransactionFields() {
    const transactionType = document.getElementById('transactionType').value;
    
    if (transactionType === 'expense') {
        document.getElementById('categoryField').style.display = 'block';
        document.getElementById('sourceField').style.display = 'none';
    } else {
        document.getElementById('categoryField').style.display = 'none';
        document.getElementById('sourceField').style.display = 'block';
    }
}

// Save transaction from the modal
function saveTransaction() {
    const transactionId = document.getElementById('transactionId').value;
    const transactionType = document.getElementById('transactionType').value;
    const date = document.getElementById('transactionDate').value;
    const amount = parseFloat(document.getElementById('transactionAmount').value);
    const description = document.getElementById('transactionDescription').value;
    
    // Validate required fields
    if (!date || isNaN(amount) || amount <= 0) {
        alert('Please fill in all required fields with valid values.');
        return;
    }
    
    let transaction;
    
    if (transactionType === 'expense') {
        const category = document.getElementById('transactionCategory').value;
        transaction = {
            id: transactionId || generateId(),
            type: 'expense',
            date: date,
            category: category,
            description: description,
            amount: amount
        };
    } else {
        const source = document.getElementById('transactionSource').value;
        transaction = {
            id: transactionId || generateId(),
            type: 'income',
            date: date,
            source: source,
            description: description,
            amount: amount
        };
    }
    
    // If editing an existing transaction, remove the old one
    if (transactionId) {
        transactions = transactions.filter(t => t.id !== transactionId);
    }
    
    // Add the new/updated transaction
    transactions.push(transaction);
    
    // Sort transactions by date (newest first)
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Save to storage
    saveDataToStorage();
    
    // Update UI
    updateDashboard();
    updateExpensesPage();
    updateIncomePage();
    
    // Close the modal
    const transactionModal = bootstrap.Modal.getInstance(document.getElementById('transactionModal'));
    transactionModal.hide();
    
    // Show success message
    showToast('Transaction saved successfully!', 'success');
}

// Edit a transaction
function editTransaction(id) {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;
    
    document.getElementById('transactionModalLabel').textContent = 'Edit Transaction';
    document.getElementById('transactionId').value = transaction.id;
    document.getElementById('transactionType').value = transaction.type;
    document.getElementById('transactionDate').value = transaction.date;
    document.getElementById('transactionDescription').value = transaction.description;
    document.getElementById('transactionAmount').value = transaction.amount;
    
    if (transaction.type === 'expense') {
        document.getElementById('transactionCategory').value = transaction.category;
    } else {
        document.getElementById('transactionSource').value = transaction.source;
    }
    
    toggleTransactionFields();
    
    const transactionModal = new bootstrap.Modal(document.getElementById('transactionModal'));
    transactionModal.show();
}

// Delete a transaction
function deleteTransaction(id) {
    if (!confirm('Are you sure you want to delete this transaction?')) return;
    
    transactions = transactions.filter(t => t.id !== id);
    
    // Save to storage
    saveDataToStorage();
    
    // Update UI
    updateDashboard();
    updateExpensesPage();
    updateIncomePage();
    
    // Show success message
    showToast('Transaction deleted successfully!', 'success');
}

// Update the dashboard with latest data
function updateDashboard() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    // Filter transactions for the current month
    const currentMonthTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getFullYear() === currentYear && transactionDate.getMonth() === currentMonth;
    });
    
    // Calculate totals
    const totalIncome = currentMonthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = currentMonthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? Math.round((balance / totalIncome) * 100) : 0;
    
    // Update summary cards
    document.getElementById('totalIncome').textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById('totalExpenses').textContent = `$${totalExpenses.toFixed(2)}`;
    document.getElementById('totalBalance').textContent = `$${balance.toFixed(2)}`;
    document.getElementById('savingsRate').textContent = `${savingsRate}%`;
    
    // Update recent transactions table
    const recentTransactionsTable = document.getElementById('recentTransactions');
    recentTransactionsTable.innerHTML = '';
    
    // Get the 5 most recent transactions
    const recentTransactions = [...transactions].slice(0, 5);
    
    recentTransactions.forEach(transaction => {
        const row = document.createElement('tr');
        
        // Format date
        const date = new Date(transaction.date);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        
        // Create table cells
        const dateCell = document.createElement('td');
        dateCell.textContent = formattedDate;
        
        const categoryCell = document.createElement('td');
        if (transaction.type === 'expense') {
            const categoryBadge = document.createElement('span');
            categoryBadge.className = `category-badge category-${transaction.category}`;
            categoryBadge.textContent = getCategoryName(transaction.category);
            categoryCell.appendChild(categoryBadge);
        } else {
            const sourceBadge = document.createElement('span');
            sourceBadge.className = `category-badge source-${transaction.source}`;
            sourceBadge.textContent = getSourceName(transaction.source);
            categoryCell.appendChild(sourceBadge);
        }
        
        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = transaction.description;
        
        const amountCell = document.createElement('td');
        amountCell.className = transaction.type === 'expense' ? 'text-danger' : 'text-success';
        amountCell.textContent = transaction.type === 'expense' ? `-$${transaction.amount.toFixed(2)}` : `$${transaction.amount.toFixed(2)}`;
        
        const typeCell = document.createElement('td');
        typeCell.textContent = transaction.type === 'expense' ? 'Expense' : 'Income';
        
        const actionsCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-sm btn-warning me-2';
        editButton.innerHTML = '<i class="fas fa-edit"></i> Edit';
        editButton.onclick = () => editTransaction(transaction.id);
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-sm btn-danger';
        deleteButton.innerHTML = '<i class="fas fa-trash"></i> Delete';
        deleteButton.onclick = () => deleteTransaction(transaction.id);
        
        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
        
        // Append cells to row
        row.appendChild(dateCell);
        row.appendChild(categoryCell);
        row.appendChild(descriptionCell);
        row.appendChild(amountCell);
        row.appendChild(typeCell);
        row.appendChild(actionsCell);
        
        // Append row to table
        recentTransactionsTable.appendChild(row);
    });
    
    // Update charts
    updateExpenseTrendChart();
    updateCategoryChart();
}

// Update the expenses page
function updateExpensesPage() {
    const selectedMonth = parseInt(document.getElementById('expenseMonth').value);
    const selectedCategory = document.getElementById('expenseCategory').value;
    const sortBy = document.getElementById('expenseSortBy').value;
    const sortOrder = document.getElementById('expenseSortOrder').value;
    
    // Filter expenses
    let filteredExpenses = transactions.filter(t => t.type === 'expense');
    
    // Filter by month if selected
    if (!isNaN(selectedMonth)) {
        filteredExpenses = filteredExpenses.filter(t => {
            const transactionDate = new Date(t.date);
            return transactionDate.getMonth() === selectedMonth;
        });
    }
    
    // Filter by category if selected
    if (selectedCategory !== 'all') {
        filteredExpenses = filteredExpenses.filter(t => t.category === selectedCategory);
    }
    
    // Sort expenses
    filteredExpenses.sort((a, b) => {
        let valueA, valueB;
        
        switch (sortBy) {
            case 'date':
                valueA = new Date(a.date);
                valueB = new Date(b.date);
                break;
            case 'amount':
                valueA = a.amount;
                valueB = b.amount;
                break;
            case 'category':
                valueA = a.category;
                valueB = b.category;
                break;
            default:
                valueA = new Date(a.date);
                valueB = new Date(b.date);
        }
        
        if (sortOrder === 'asc') {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueA < valueB ? 1 : -1;
        }
    });
    
    // Update expenses table
    const expensesTable = document.getElementById('expensesList');
    expensesTable.innerHTML = '';
    
    if (filteredExpenses.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 5;
        cell.textContent = 'No expenses found for the selected filters.';
        cell.className = 'text-center py-4';
        row.appendChild(cell);
        expensesTable.appendChild(row);
    } else {
        filteredExpenses.forEach(expense => {
            const row = document.createElement('tr');
            
            // Format date
            const date = new Date(expense.date);
            const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            
            // Create table cells
            const dateCell = document.createElement('td');
            dateCell.textContent = formattedDate;
            
            const categoryCell = document.createElement('td');
            const categoryBadge = document.createElement('span');
            categoryBadge.className = `category-badge category-${expense.category}`;
            categoryBadge.textContent = getCategoryName(expense.category);
            categoryCell.appendChild(categoryBadge);
            
            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = expense.description;
            
            const amountCell = document.createElement('td');
            amountCell.className = 'text-danger';
            amountCell.textContent = `$${expense.amount.toFixed(2)}`;
            
            const actionsCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.className = 'btn btn-sm btn-warning me-2';
            editButton.innerHTML = '<i class="fas fa-edit"></i> Edit';
            editButton.onclick = () => editTransaction(expense.id);
            
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-sm btn-danger';
            deleteButton.innerHTML = '<i class="fas fa-trash"></i> Delete';
            deleteButton.onclick = () => deleteTransaction(expense.id);
            
            actionsCell.appendChild(editButton);
            actionsCell.appendChild(deleteButton);
            
            // Append cells to row
            row.appendChild(dateCell);
            row.appendChild(categoryCell);
            row.appendChild(descriptionCell);
            row.appendChild(amountCell);
            row.appendChild(actionsCell);
            
            // Append row to table
            expensesTable.appendChild(row);
        });
    }
    
    // Update the expense category chart
    updateExpenseCategoryChart(filteredExpenses);
    
    // Update top categories list
    updateTopCategories(filteredExpenses);
}

// Update the income page
function updateIncomePage() {
    const selectedMonth = parseInt(document.getElementById('incomeMonth').value);
    const selectedSource = document.getElementById('incomeSource').value;
    const sortBy = document.getElementById('incomeSortBy').value;
    const sortOrder = document.getElementById('incomeSortOrder').value;
    
    // Filter income transactions
    let filteredIncome = transactions.filter(t => t.type === 'income');
    
    // Filter by month if selected
    if (!isNaN(selectedMonth)) {
        filteredIncome = filteredIncome.filter(t => {
            const transactionDate = new Date(t.date);
            return transactionDate.getMonth() === selectedMonth;
        });
    }
    
    // Filter by source if selected
    if (selectedSource !== 'all') {
        filteredIncome = filteredIncome.filter(t => t.source === selectedSource);
    }
    
    // Sort income
    filteredIncome.sort((a, b) => {
        let valueA, valueB;
        
        switch (sortBy) {
            case 'date':
                valueA = new Date(a.date);
                valueB = new Date(b.date);
                break;
            case 'amount':
                valueA = a.amount;
                valueB = b.amount;
                break;
            case 'source':
                valueA = a.source;
                valueB = b.source;
                break;
            default:
                valueA = new Date(a.date);
                valueB = new Date(b.date);
        }
        
        if (sortOrder === 'asc') {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueA < valueB ? 1 : -1;
        }
    });
    
    // Update income table
    const incomeTable = document.getElementById('incomeList');
    incomeTable.innerHTML = '';
    
    if (filteredIncome.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 5;
        cell.textContent = 'No income found for the selected filters.';
        cell.className = 'text-center py-4';
        row.appendChild(cell);
        incomeTable.appendChild(row);
    } else {
        filteredIncome.forEach(income => {
            const row = document.createElement('tr');
            
            // Format date
            const date = new Date(income.date);
            const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            
            // Create table cells
            const dateCell = document.createElement('td');
            dateCell.textContent = formattedDate;
            
            const sourceCell = document.createElement('td');
            const sourceBadge = document.createElement('span');
            sourceBadge.className = `category-badge source-${income.source}`;
            sourceBadge.textContent = getSourceName(income.source);
            sourceCell.appendChild(sourceBadge);
            
            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = income.description;
            
            const amountCell = document.createElement('td');
            amountCell.className = 'text-success';
            amountCell.textContent = `$${income.amount.toFixed(2)}`;
            
            const actionsCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.className = 'btn btn-sm btn-warning me-2';
            editButton.innerHTML = '<i class="fas fa-edit"></i> Edit';
            editButton.onclick = () => editTransaction(income.id);
            
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-sm btn-danger';
            deleteButton.innerHTML = '<i class="fas fa-trash"></i> Delete';
            deleteButton.onclick = () => deleteTransaction(income.id);
            
            actionsCell.appendChild(editButton);
            actionsCell.appendChild(deleteButton);
            
            // Append cells to row
            row.appendChild(dateCell);
            row.appendChild(sourceCell);
            row.appendChild(descriptionCell);
            row.appendChild(amountCell);
            row.appendChild(actionsCell);
            
            // Append row to table
            incomeTable.appendChild(row);
        });
    }
    
    // Update the income source chart
    updateIncomeSourceChart(filteredIncome);
    
    // Update income sources list
    updateIncomeSources(filteredIncome);
}

// Update the expense trend chart on the dashboard
function updateExpenseTrendChart() {
    const ctx = document.getElementById('expenseTrendChart').getContext('2d');
    
    // Get current month and year
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    // Calculate dates for the last 7 days
    const dates = [];
    const dailyTotals = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(currentYear, currentMonth, currentDate.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        dates.push(dayName);
        
        // Calculate total expenses for this date
        const dailyExpenses = transactions
            .filter(t => t.type === 'expense' && t.date === dateString)
            .reduce((sum, t) => sum + t.amount, 0);
        
        dailyTotals.push(dailyExpenses);
    }
    
    // If a chart already exists, destroy it
    if (window.expenseTrendChart) {
        window.expenseTrendChart.destroy();
    }
    
    // Create new chart
    window.expenseTrendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Daily Expenses',
                data: dailyTotals,
                borderColor: '#FF9AA2',
                backgroundColor: 'rgba(255, 154, 162, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `$${context.raw.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                }
            }
        }
    });
}

// Update the category chart on the dashboard
function updateCategoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    
    // Get current month and year
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    // Filter expenses for the current month
    const currentMonthExpenses = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return t.type === 'expense' && 
               transactionDate.getFullYear() === currentYear && 
               transactionDate.getMonth() === currentMonth;
    });
    
    // Group expenses by category
    const categoryTotals = {};
    
    currentMonthExpenses.forEach(expense => {
        if (!categoryTotals[expense.category]) {
            categoryTotals[expense.category] = 0;
        }
        categoryTotals[expense.category] += expense.amount;
    });
    
    // Prepare data for chart
    const categories = Object.keys(categoryTotals);
    const categoryNames = categories.map(getCategoryName);
    const totals = categories.map(category => categoryTotals[category]);
    
    // Colors for categories
    const backgroundColors = [
        '#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB',
        '#B5EAD7', '#C7CEEA', '#F8C8DC', '#F0E6EF',
        '#BDE0FE', '#D8D8D8'
    ];
    
    // If a chart already exists, destroy it
    if (window.categoryDoughnutChart) {
        window.categoryDoughnutChart.destroy();
    }
    
    // Create new chart
    window.categoryDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categoryNames,
            datasets: [{
                data: totals,
                backgroundColor: backgroundColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                            return `$${value.toFixed(2)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Update the expense category chart on the expenses page
function updateExpenseCategoryChart(expenses) {
    const ctx = document.getElementById('expenseCategoryChart').getContext('2d');
    
    // Group expenses by category
    const categoryTotals = {};
    
    expenses.forEach(expense => {
        if (!categoryTotals[expense.category]) {
            categoryTotals[expense.category] = 0;
        }
        categoryTotals[expense.category] += expense.amount;
    });
    
    // Prepare data for chart
    const categories = Object.keys(categoryTotals);
    const categoryNames = categories.map(getCategoryName);
    const totals = categories.map(category => categoryTotals[category]);
    
    // Colors for categories
    const backgroundColors = [
        '#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB',
        '#B5EAD7', '#C7CEEA', '#F8C8DC', '#F0E6EF',
        '#BDE0FE', '#D8D8D8'
    ];
    
    // If a chart already exists, destroy it
    if (window.expenseCategoryChart) {
        window.expenseCategoryChart.destroy();
    }
    
    // Create new chart
    window.expenseCategoryChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categoryNames,
            datasets: [{
                data: totals,
                backgroundColor: backgroundColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                            return `$${value.toFixed(2)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Update the income source chart on the income page
function updateIncomeSourceChart(incomeData) {
    const ctx = document.getElementById('incomeSourceChart').getContext('2d');
    
    // Group income by source
    const sourceTotals = {};
    
    incomeData.forEach(income => {
        if (!sourceTotals[income.source]) {
            sourceTotals[income.source] = 0;
        }
        sourceTotals[income.source] += income.amount;
    });
    
    // Prepare data for chart
    const sources = Object.keys(sourceTotals);
    const sourceNames = sources.map(getSourceName);
    const totals = sources.map(source => sourceTotals[source]);
    
    // Colors for sources
    const backgroundColors = [
        '#A0DAA9', '#8DDDD0', '#C1E1C5', '#FDE9C9',
        '#FFCCD5', '#E2E2E2'
    ];
    
    // If a chart already exists, destroy it
    if (window.incomeSourceChart) {
        window.incomeSourceChart.destroy();
    }
    
    // Create new chart
    window.incomeSourceChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: sourceNames,
            datasets: [{
                data: totals,
                backgroundColor: backgroundColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                            return `$${value.toFixed(2)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Update top categories list on the expenses page
function updateTopCategories(expenses) {
    const topCategoriesList = document.getElementById('topCategories');
    topCategoriesList.innerHTML = '';
    
    // Group expenses by category
    const categoryTotals = {};
    
    expenses.forEach(expense => {
        if (!categoryTotals[expense.category]) {
            categoryTotals[expense.category] = 0;
        }
        categoryTotals[expense.category] += expense.amount;
    });
    
    // Convert to array and sort
    const categoryArray = Object.entries(categoryTotals)
        .map(([category, total]) => ({ category, total }))
        .sort((a, b) => b.total - a.total);
    
    // Calculate total expenses
    const totalExpenses = categoryArray.reduce((sum, cat) => sum + cat.total, 0);
    
    // Create list items
    if (categoryArray.length === 0) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item text-center';
        listItem.textContent = 'No expense data available';
        topCategoriesList.appendChild(listItem);
    } else {
        categoryArray.forEach(cat => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            
            const categoryBadge = document.createElement('span');
            categoryBadge.className = `category-badge category-${cat.category}`;
            categoryBadge.textContent = getCategoryName(cat.category);
            
            const detailsSpan = document.createElement('span');
            
            const amountSpan = document.createElement('span');
            amountSpan.className = 'fw-bold';
            amountSpan.textContent = `$${cat.total.toFixed(2)}`;
            
            const percentageSpan = document.createElement('span');
            percentageSpan.className = 'text-muted ms-2';
            const percentage = totalExpenses > 0 ? Math.round((cat.total / totalExpenses) * 100) : 0;
            percentageSpan.textContent = `(${percentage}%)`;
            
            detailsSpan.appendChild(amountSpan);
            detailsSpan.appendChild(percentageSpan);
            
            listItem.appendChild(categoryBadge);
            listItem.appendChild(detailsSpan);
            
            topCategoriesList.appendChild(listItem);
        });
    }
}

// Update income sources list on the income page
function updateIncomeSources(incomeData) {
    const incomeSourcesList = document.getElementById('incomeSources');
    incomeSourcesList.innerHTML = '';
    
    // Group income by source
    const sourceTotals = {};
    
    incomeData.forEach(income => {
        if (!sourceTotals[income.source]) {
            sourceTotals[income.source] = 0;
        }
        sourceTotals[income.source] += income.amount;
    });
    
    // Convert to array and sort
    const sourceArray = Object.entries(sourceTotals)
        .map(([source, total]) => ({ source, total }))
        .sort((a, b) => b.total - a.total);
    
    // Calculate total income
    const totalIncome = sourceArray.reduce((sum, src) => sum + src.total, 0);
    
    // Create list items
    if (sourceArray.length === 0) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item text-center';
        listItem.textContent = 'No income data available';
        incomeSourcesList.appendChild(listItem);
    } else {
        sourceArray.forEach(src => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            
            const sourceBadge = document.createElement('span');
            sourceBadge.className = `category-badge source-${src.source}`;
            sourceBadge.textContent = getSourceName(src.source);
            
            const detailsSpan = document.createElement('span');
            
            const amountSpan = document.createElement('span');
            amountSpan.className = 'fw-bold';
            amountSpan.textContent = `$${src.total.toFixed(2)}`;
            
            const percentageSpan = document.createElement('span');
            percentageSpan.className = 'text-muted ms-2';
            const percentage = totalIncome > 0 ? Math.round((src.total / totalIncome) * 100) : 0;
            percentageSpan.textContent = `(${percentage}%)`;
            
            detailsSpan.appendChild(amountSpan);
            detailsSpan.appendChild(percentageSpan);
            
            listItem.appendChild(sourceBadge);
            listItem.appendChild(detailsSpan);
            
            incomeSourcesList.appendChild(listItem);
        });
    }
}

// Update the report title based on the selected report type
function updateReportTitle() {
    const reportType = document.getElementById('reportType').value;
    const titleElement = document.getElementById('reportTitle');
    
    switch (reportType) {
        case 'monthly':
            titleElement.textContent = 'Monthly Summary';
            break;
        case 'category':
            titleElement.textContent = 'Category Breakdown';
            break;
        case 'trends':
            titleElement.textContent = 'Expense Trends';
            break;
        case 'savings':
            titleElement.textContent = 'Savings Analysis';
            break;
    }
}

// Generate a financial report
function generateReport() {
    const reportType = document.getElementById('reportType').value;
    const startDate = document.getElementById('reportStartDate').value;
    const endDate = document.getElementById('reportEndDate').value;
    
    // Filter transactions within date range
    const reportTransactions = transactions.filter(t => {
        return t.date >= startDate && t.date <= endDate;
    });
    
    // Calculate totals
    const totalIncome = reportTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = reportTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const netSavings = totalIncome - totalExpenses;
    
    // Update summary cards
    document.getElementById('reportIncome').textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById('reportExpenses').textContent = `$${totalExpenses.toFixed(2)}`;
    document.getElementById('reportSavings').textContent = `$${netSavings.toFixed(2)}`;
    
    // Generate the appropriate report
    switch (reportType) {
        case 'monthly':
            generateMonthlySummaryReport(reportTransactions, startDate, endDate);
            break;
        case 'category':
            generateCategoryBreakdownReport(reportTransactions);
            break;
        case 'trends':
            generateExpenseTrendsReport(reportTransactions, startDate, endDate);
            break;
        case 'savings':
            generateSavingsAnalysisReport(reportTransactions, startDate, endDate);
            break;
    }
}

// Generate monthly summary report
function generateMonthlySummaryReport(transactions, startDate, endDate) {
    const ctx = document.getElementById('reportChart').getContext('2d');
    
    // Prepare dates for the chart
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];
    const expenseTotals = [];
    const incomeTotals = [];
    
    // Create a date array for each day in the range
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateString = d.toISOString().split('T')[0];
        dates.push(dateString);
        
        // Calculate totals for this date
        const dayExpenses = transactions
            .filter(t => t.type === 'expense' && t.date === dateString)
            .reduce((sum, t) => sum + t.amount, 0);
        
        const dayIncome = transactions
            .filter(t => t.type === 'income' && t.date === dateString)
            .reduce((sum, t) => sum + t.amount, 0);
        
        expenseTotals.push(dayExpenses);
        incomeTotals.push(dayIncome);
    }
    
    // Format dates for display
    const displayDates = dates.map(d => {
        const date = new Date(d);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    });
    
    // If a chart already exists, destroy it
    if (window.reportChart) {
        window.reportChart.destroy();
    }
    
    // Create new chart
    window.reportChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: displayDates,
            datasets: [
                {
                    label: 'Income',
                    data: incomeTotals,
                    borderColor: '#A0DAA9',
                    backgroundColor: 'rgba(160, 218, 169, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Expenses',
                    data: expenseTotals,
                    borderColor: '#FF9AA2',
                    backgroundColor: 'rgba(255, 154, 162, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: $${context.raw.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                }
            }
        }
    });
    
    // Update report table
    updateReportTable(transactions);
}

// Generate category breakdown report
function generateCategoryBreakdownReport(transactions) {
    const ctx = document.getElementById('reportChart').getContext('2d');
    
    // Filter only expenses
    const expenses = transactions.filter(t => t.type === 'expense');
    
    // Group expenses by category
    const categoryTotals = {};
    
    expenses.forEach(expense => {
        if (!categoryTotals[expense.category]) {
            categoryTotals[expense.category] = 0;
        }
        categoryTotals[expense.category] += expense.amount;
    });
    
    // Prepare data for chart
    const categories = Object.keys(categoryTotals);
    const categoryNames = categories.map(getCategoryName);
    const totals = categories.map(category => categoryTotals[category]);
    
    // Colors for categories
    const backgroundColors = [
        '#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB',
        '#B5EAD7', '#C7CEEA', '#F8C8DC', '#F0E6EF',
        '#BDE0FE', '#D8D8D8'
    ];
    
    // If a chart already exists, destroy it
    if (window.reportChart) {
        window.reportChart.destroy();
    }
    
    // Create new chart
    window.reportChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categoryNames,
            datasets: [{
                label: 'Expenses by Category',
                data: totals,
                backgroundColor: backgroundColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `$${context.raw.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                }
            }
        }
    });
    
    // Update report table
    const reportTableHead = document.getElementById('reportTableHead');
    reportTableHead.innerHTML = `
        <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>% of Total</th>
        </tr>
    `;
    
    const reportTableBody = document.getElementById('reportTableBody');
    reportTableBody.innerHTML = '';
    
    // Calculate total expenses
    const totalExpenses = totals.reduce((sum, total) => sum + total, 0);
    
    // Create table rows
    if (categories.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 3;
        cell.textContent = 'No expense data available for the selected period';
        cell.className = 'text-center py-3';
        row.appendChild(cell);
        reportTableBody.appendChild(row);
    } else {
        // Sort categories by amount (descending)
        const sortedCategories = categories
            .map((category, index) => ({
                category,
                name: categoryNames[index],
                total: totals[index]
            }))
            .sort((a, b) => b.total - a.total);
        
        sortedCategories.forEach(item => {
            const row = document.createElement('tr');
            
            const categoryCell = document.createElement('td');
            const categoryBadge = document.createElement('span');
            categoryBadge.className = `category-badge category-${item.category}`;
            categoryBadge.textContent = item.name;
            categoryCell.appendChild(categoryBadge);
            
            const amountCell = document.createElement('td');
            amountCell.textContent = `$${item.total.toFixed(2)}`;
            
            const percentageCell = document.createElement('td');
            const percentage = totalExpenses > 0 ? Math.round((item.total / totalExpenses) * 100) : 0;
            percentageCell.textContent = `${percentage}%`;
            
            row.appendChild(categoryCell);
            row.appendChild(amountCell);
            row.appendChild(percentageCell);
            
            reportTableBody.appendChild(row);
        });
    }
}

// Generate expense trends report
function generateExpenseTrendsReport(transactions, startDate, endDate) {
    const ctx = document.getElementById('reportChart').getContext('2d');
    
    // Filter only expenses
    const expenses = transactions.filter(t => t.type === 'expense');
    
    // Group expenses by date
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Prepare arrays for the chart
    const weeks = [];
    const weeklyTotals = [];
    
    // Calculate weekly totals
    let currentWeekStart = new Date(start);
    while (currentWeekStart <= end) {
        // Calculate end of week (6 days later or end date, whichever comes first)
        const currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);
        if (currentWeekEnd > end) {
            currentWeekEnd.setTime(end.getTime());
        }
        
        // Format date range for the week label
        const weekLabel = `${currentWeekStart.getMonth() + 1}/${currentWeekStart.getDate()} - ${currentWeekEnd.getMonth() + 1}/${currentWeekEnd.getDate()}`;
        weeks.push(weekLabel);
        
        // Calculate total expenses for this week
        const weeklyExpenses = expenses.filter(t => {
            const date = new Date(t.date);
            return date >= currentWeekStart && date <= currentWeekEnd;
        });
        
        const weeklyTotal = weeklyExpenses.reduce((sum, t) => sum + t.amount, 0);
        weeklyTotals.push(weeklyTotal);
        
        // Move to next week
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    }
    
    // If a chart already exists, destroy it
    if (window.reportChart) {
        window.reportChart.destroy();
    }
    
    // Create new chart
    window.reportChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: weeks,
            datasets: [{
                label: 'Weekly Expenses',
                data: weeklyTotals,
                backgroundColor: 'rgba(255, 154, 162, 0.6)',
                borderColor: '#FF9AA2',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `$${context.raw.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                }
            }
        }
    });
    
    // Update report table
    const reportTableHead = document.getElementById('reportTableHead');
    reportTableHead.innerHTML = `
        <tr>
            <th>Week</th>
            <th>Total Expenses</th>
            <th>Average Daily</th>
        </tr>
    `;
    
    const reportTableBody = document.getElementById('reportTableBody');
    reportTableBody.innerHTML = '';
    
    // Create table rows for each week
    if (weeks.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 3;
        cell.textContent = 'No expense data available for the selected period';
        cell.className = 'text-center py-3';
        row.appendChild(cell);
        reportTableBody.appendChild(row);
    } else {
        weeks.forEach((week, index) => {
            const row = document.createElement('tr');
            
            const weekCell = document.createElement('td');
            weekCell.textContent = week;
            
            const totalCell = document.createElement('td');
            totalCell.textContent = `$${weeklyTotals[index].toFixed(2)}`;
            
            const avgCell = document.createElement('td');
            // Calculate average daily (divide by 7 or fewer days for partial weeks)
            const daysInWeek = index === weeks.length - 1 ? 
                Math.floor((end - new Date(startDate).setDate(new Date(startDate).getDate() + index * 7)) / (1000 * 60 * 60 * 24)) + 1 : 7;
            const avgDaily = daysInWeek > 0 ? weeklyTotals[index] / daysInWeek : 0;
            avgCell.textContent = `$${avgDaily.toFixed(2)}`;
            
            row.appendChild(weekCell);
            row.appendChild(totalCell);
            row.appendChild(avgCell);
            
            reportTableBody.appendChild(row);
        });
    }
}

// Generate savings analysis report
function generateSavingsAnalysisReport(transactions, startDate, endDate) {
    const ctx = document.getElementById('reportChart').getContext('2d');
    
    // Group transactions by month
    const monthlyData = {};
    
    transactions.forEach(t => {
        const date = new Date(t.date);
        const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
        
        if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = {
                income: 0,
                expenses: 0,
                savings: 0,
                savingsRate: 0
            };
        }
        
        if (t.type === 'income') {
            monthlyData[monthKey].income += t.amount;
        } else {
            monthlyData[monthKey].expenses += t.amount;
        }
    });
    
    // Calculate savings and savings rate for each month
    Object.keys(monthlyData).forEach(month => {
        const data = monthlyData[month];
        data.savings = data.income - data.expenses;
        data.savingsRate = data.income > 0 ? (data.savings / data.income) * 100 : 0;
    });
    
    // Prepare data for chart
    const months = Object.keys(monthlyData).sort();
    const displayMonths = months.map(month => {
        const [year, monthNum] = month.split('-');
        return `${Number(monthNum)}/${year.substring(2)}`;
    });
    const savingsRates = months.map(month => monthlyData[month].savingsRate);
    
    // If a chart already exists, destroy it
    if (window.reportChart) {
        window.reportChart.destroy();
    }
    
    // Create new chart
    window.reportChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: displayMonths,
            datasets: [{
                label: 'Savings Rate (%)',
                data: savingsRates,
                borderColor: '#9b87f5',
                backgroundColor: 'rgba(155, 135, 245, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.raw.toFixed(1)}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
    
    // Update report table
    const reportTableHead = document.getElementById('reportTableHead');
    reportTableHead.innerHTML = `
        <tr>
            <th>Month</th>
            <th>Income</th>
            <th>Expenses</th>
            <th>Savings</th>
            <th>Savings Rate</th>
        </tr>
    `;
    
    const reportTableBody = document.getElementById('reportTableBody');
    reportTableBody.innerHTML = '';
    
    // Create table rows for each month
    if (months.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 5;
        cell.textContent = 'No data available for the selected period';
        cell.className = 'text-center py-3';
        row.appendChild(cell);
        reportTableBody.appendChild(row);
    } else {
        months.forEach((month, index) => {
            const data = monthlyData[month];
            const row = document.createElement('tr');
            
            const monthCell = document.createElement('td');
            monthCell.textContent = displayMonths[index];
            
            const incomeCell = document.createElement('td');
            incomeCell.textContent = `$${data.income.toFixed(2)}`;
            
            const expensesCell = document.createElement('td');
            expensesCell.textContent = `$${data.expenses.toFixed(2)}`;
            
            const savingsCell = document.createElement('td');
            savingsCell.textContent = `$${data.savings.toFixed(2)}`;
            if (data.savings >= 0) {
                savingsCell.className = 'text-success';
            } else {
                savingsCell.className = 'text-danger';
            }
            
            const savingsRateCell = document.createElement('td');
            savingsRateCell.textContent = `${data.savingsRate.toFixed(1)}%`;
            if (data.savingsRate >= 20) {
                savingsRateCell.className = 'text-success';
            } else if (data.savingsRate >= 0) {
                savingsRateCell.className = 'text-warning';
            } else {
                savingsRateCell.className = 'text-danger';
            }
            
            row.appendChild(monthCell);
            row.appendChild(incomeCell);
            row.appendChild(expensesCell);
            row.appendChild(savingsCell);
            row.appendChild(savingsRateCell);
            
            reportTableBody.appendChild(row);
        });
    }
}

// Update report table for standard reports
function updateReportTable(transactions) {
    const reportTableHead = document.getElementById('reportTableHead');
    reportTableHead.innerHTML = `
        <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category/Source</th>
            <th>Description</th>
            <th>Amount</th>
        </tr>
    `;
    
    const reportTableBody = document.getElementById('reportTableBody');
    reportTableBody.innerHTML = '';
    
    // Sort transactions by date (newest first)
    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (sortedTransactions.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 5;
        cell.textContent = 'No transactions found for the selected period';
        cell.className = 'text-center py-3';
        row.appendChild(cell);
        reportTableBody.appendChild(row);
    } else {
        sortedTransactions.forEach(transaction => {
            const row = document.createElement('tr');
            
            // Format date
            const date = new Date(transaction.date);
            const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            
            const dateCell = document.createElement('td');
            dateCell.textContent = formattedDate;
            
            const typeCell = document.createElement('td');
            typeCell.textContent = transaction.type === 'expense' ? 'Expense' : 'Income';
            typeCell.className = transaction.type === 'expense' ? 'text-danger' : 'text-success';
            
            const categoryCell = document.createElement('td');
            if (transaction.type === 'expense') {
                const categoryBadge = document.createElement('span');
                categoryBadge.className = `category-badge category-${transaction.category}`;
                categoryBadge.textContent = getCategoryName(transaction.category);
                categoryCell.appendChild(categoryBadge);
            } else {
                const sourceBadge = document.createElement('span');
                sourceBadge.className = `category-badge source-${transaction.source}`;
                sourceBadge.textContent = getSourceName(transaction.source);
                categoryCell.appendChild(sourceBadge);
            }
            
            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = transaction.description;
            
            const amountCell = document.createElement('td');
            amountCell.textContent = `$${transaction.amount.toFixed(2)}`;
            amountCell.className = transaction.type === 'expense' ? 'text-danger' : 'text-success';
            
            row.appendChild(dateCell);
            row.appendChild(typeCell);
            row.appendChild(categoryCell);
            row.appendChild(descriptionCell);
            row.appendChild(amountCell);
            
            reportTableBody.appendChild(row);
        });
    }
}

// Show login modal
function showLoginModal() {
    document.getElementById('loginForm').reset();
    document.getElementById('loginError').classList.add('d-none');
    
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
}

// Show register modal
function showRegisterModal() {
    document.getElementById('registerForm').reset();
    document.getElementById('registerError').classList.add('d-none');
    
    const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
    registerModal.show();
}

// Handle login form submission
function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Basic validation
    if (!email || !password) {
        document.getElementById('loginError').textContent = 'Please fill in all fields';
        document.getElementById('loginError').classList.remove('d-none');
        return;
    }
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Login successful
        currentUser = user;
        updateAuthUI(true);
        saveDataToStorage();
        
        // Close modal
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        loginModal.hide();
        
        // Show success message
        showToast('Login successful!', 'success');
    } else {
        // Login failed
        document.getElementById('loginError').textContent = 'Invalid email or password';
        document.getElementById('loginError').classList.remove('d-none');
    }
}

// Handle register form submission
function handleRegister() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
    
    // Basic validation
    if (!name || !email || !password || !passwordConfirm) {
        document.getElementById('registerError').textContent = 'Please fill in all fields';
        document.getElementById('registerError').classList.remove('d-none');
        return;
    }
    
    if (password !== passwordConfirm) {
        document.getElementById('registerError').textContent = 'Passwords do not match';
        document.getElementById('registerError').classList.remove('d-none');
        return;
    }
    
    // Check if email is already in use
    if (users.some(u => u.email === email)) {
        document.getElementById('registerError').textContent = 'Email already in use';
        document.getElementById('registerError').classList.remove('d-none');
        return;
    }
    
    // Create new user
    const newUser = {
        id: generateId(),
        name,
        email,
        password
    };
    
    users.push(newUser);
    currentUser = newUser;
    updateAuthUI(true);
    saveDataToStorage();
    
    // Close modal
    const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    registerModal.hide();
    
    // Show success message
    showToast('Account created successfully!', 'success');
}

// Update the UI based on authentication state
function updateAuthUI(isLoggedIn) {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
    if (isLoggedIn && currentUser) {
        loginBtn.textContent = currentUser.name;
        loginBtn.onclick = handleLogout;
        registerBtn.style.display = 'none';
    } else {
        loginBtn.textContent = 'Login';
        loginBtn.onclick = showLoginModal;
        registerBtn.style.display = 'block';
    }
}

// Handle logout
function handleLogout() {
    if (confirm('Are you sure you want to log out?')) {
        currentUser = null;
        updateAuthUI(false);
        localStorage.removeItem('expenseTrackerCurrentUser');
        showToast('Logged out successfully', 'info');
    }
}

// Get friendly name for expense category
function getCategoryName(categoryKey) {
    const categoryNames = {
        'food': 'Food & Dining',
        'transportation': 'Transportation',
        'housing': 'Housing',
        'utilities': 'Utilities',
        'entertainment': 'Entertainment',
        'health': 'Health',
        'education': 'Education',
        'shopping': 'Shopping',
        'personal': 'Personal Care',
        'other': 'Other'
    };
    
    return categoryNames[categoryKey] || categoryKey;
}

// Get friendly name for income source
function getSourceName(sourceKey) {
    const sourceNames = {
        'salary': 'Salary',
        'business': 'Business',
        'freelance': 'Freelance',
        'investment': 'Investment',
        'gifts': 'Gifts',
        'other': 'Other'
    };
    
    return sourceNames[sourceKey] || sourceKey;
}

// Show toast message
function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast
    const toastId = `toast-${Date.now()}`;
    const toast = document.createElement('div');
    toast.className = `toast align-items-center border-0 bg-${type}`;
    toast.id = toastId;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    // Toast content
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body text-white">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    
    // Add toast to container
    toastContainer.appendChild(toast);
    
    // Show toast
    const bsToast = new bootstrap.Toast(toast, {
        autohide: true,
        delay: 3000
    });
    
    bsToast.show();
    
    // Remove toast after hiding
    toast.addEventListener('hidden.bs.toast', function() {
        toast.remove();
    });
}
