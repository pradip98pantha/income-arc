
// Main JavaScript file for ExpenseTracker

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize popovers
    const popoverTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="popover"]')
    );
    
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    
    // Auto-close alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert:not(.alert-permanent)');
    
    alerts.forEach(function(alert) {
        setTimeout(function() {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000);
    });
    
    // Handle expense calendar date clicks
    const calendarDates = document.querySelectorAll('.calendar-date');
    
    calendarDates.forEach(function(date) {
        date.addEventListener('click', function() {
            // Remove selected class from all dates
            calendarDates.forEach(d => d.classList.remove('selected'));
            
            // Add selected class to clicked date
            this.classList.add('selected');
            
            // Show expense details for selected date
            const dateStr = this.getAttribute('data-date');
            showExpensesForDate(dateStr);
        });
    });
    
    function showExpensesForDate(dateStr) {
        // This would be implemented to show expenses for a specific date
        console.log(`Showing expenses for: ${dateStr}`);
        
        // Show loading state
        const detailsContainer = document.getElementById('expense-details');
        if (detailsContainer) {
            detailsContainer.innerHTML = '<div class="text-center p-4"><div class="spinner-border text-primary" role="status"></div><p class="mt-2">Loading expenses...</p></div>';
            
            // In a real app, this would fetch data from the server
            // For demo, simulate loading
            setTimeout(() => {
                // This would be populated with actual data from the server
                detailsContainer.innerHTML = '<p class="text-center text-muted">No expenses for this date</p>';
            }, 500);
        }
    }
    
    // Initialize charts if they exist on the page
    initializeCharts();
});

function initializeCharts() {
    // Initialize expense category chart
    const categoryChartEl = document.getElementById('categoryChart');
    if (categoryChartEl) {
        // Get data from the element's data attributes or from the server
        const labels = JSON.parse(categoryChartEl.getAttribute('data-labels') || '[]');
        const values = JSON.parse(categoryChartEl.getAttribute('data-values') || '[]');
        
        new Chart(categoryChartEl, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: [
                        '#0d6efd', '#6610f2', '#6f42c1', '#d63384', 
                        '#dc3545', '#fd7e14', '#ffc107', '#198754',
                        '#20c997', '#0dcaf0'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Initialize expense trend chart
    const trendChartEl = document.getElementById('trendChart');
    if (trendChartEl) {
        // Get data from the element's data attributes or from the server
        const labels = JSON.parse(trendChartEl.getAttribute('data-labels') || '[]');
        const values = JSON.parse(trendChartEl.getAttribute('data-values') || '[]');
        
        new Chart(trendChartEl, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Expenses',
                    data: values,
                    borderColor: '#0d6efd',
                    backgroundColor: 'rgba(13, 110, 253, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value;
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}
