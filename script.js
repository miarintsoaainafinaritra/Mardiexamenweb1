
        document.addEventListener('DOMContentLoaded', function() {
            const expenseForm = document.getElementById('expense-form');
            const expenseTable = document.getElementById('expense-table').getElementsByTagName('tbody')[0];
            const colorButton = document.getElementById('color-button');
            const resetButton = document.getElementById('reset-button');
            const notification = document.getElementById('notification');
            
            
            const initialExpenses = [
                { name: 'Déjeuner', amount: 12, category: 'Nourriture' },
                { name: 'Taxi', amount: 8, category: 'Transport' },
                { name: 'Clé USB', amount: 15, category: 'Matériel' },
                { name: 'Café', amount: 3, category: 'Nourriture' },
                { name: 'Bus', amount: 2, category: 'Transport' },
                { name: 'Cahier', amount: 5, category: 'Matériel' }
            ];
            
            initialExpenses.forEach(expense => {
                addExpenseToTable(expense.name, expense.amount, expense.category);
            });
            
            updateStats();
            
    
            expenseForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                const name = document.getElementById('name').value;
                const amount = parseFloat(document.getElementById('amount').value);
                const category = document.getElementById('category').value;
                
                if (name && !isNaN(amount) && category) {
                    addExpenseToTable(name, amount, category);
                    
                
                    expenseForm.reset();
                    
                 
                    showNotification('Dépense ajoutée avec succès!');
                }
            });
            
            
            colorButton.addEventListener('click', function() {
                colorFoodExpenses();
            });
            
           
            resetButton.addEventListener('click', function() {
                resetColors();
            });
            
            
            function addExpenseToTable(name, amount, category) {
                const newRow = expenseTable.insertRow();
                
                const nameCell = newRow.insertCell(0);
                const amountCell = newRow.insertCell(1);
                const categoryCell = newRow.insertCell(2);
                
                nameCell.textContent = name;
                amountCell.textContent = amount;
                categoryCell.textContent = category;
                
                newRow.classList.add(category.toLowerCase());
                
                updateStats();
            }
            
            function colorFoodExpenses() {
                const rows = expenseTable.getElementsByTagName('tr');
                
              
                for (let i = 0; i < rows.length; i++) {
                    rows[i].classList.remove('highlighted');
                }
                
              
                for (let i = 0; i < rows.length; i++) {
                    const categoryCell = rows[i].getElementsByTagName('td')[2];
                    if (categoryCell && categoryCell.textContent === 'Nourriture') {
                        rows[i].classList.add('highlighted');
                    }
                }
                
                showNotification('Dépenses en nourriture mises en évidence!');
            }
            
           
            function resetColors() {
                const rows = expenseTable.getElementsByTagName('tr');
                
                for (let i = 0; i < rows.length; i++) {
                    rows[i].classList.remove('highlighted');
                }
                
                showNotification('Couleurs réinitialisées!');
            }
            
            
            function showNotification(message) {
                notification.textContent = message;
                notification.classList.add('show');
                
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 3000);
            }
            
            function updateStats() {
                const rows = expenseTable.getElementsByTagName('tr');
                let total = 0;
                let count = 0;
                
                for (let i = 0; i < rows.length; i++) {
                    const amountCell = rows[i].getElementsByTagName('td')[1];
                    if (amountCell) {
                        total += parseFloat(amountCell.textContent);
                        count++;
                    }
                }
                
                const average = count > 0 ? (total / count).toFixed(2) : 0;
                
                document.getElementById('total-expenses').textContent = `${total} Ariary`;
                document.getElementById('expenses-count').textContent = count;
                document.getElementById('average-expense').textContent = `${average} Ariary`;
            }
        });