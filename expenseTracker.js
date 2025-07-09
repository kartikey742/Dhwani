let totalExpenses = 0;
let doller = document.getElementById("amount");

function addExpense() {
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  if (!description || isNaN(amount) || amount <= 0) {
    alert('Please enter a valid description and amount.');
    return;
  }

  const expensesList = document.getElementById('expenses');
  const expenseItem = document.createElement('li');
  expenseItem.innerText = `${description}: Rs ${amount.toFixed(2)}`;
  expensesList.appendChild(expenseItem);

  totalExpenses += amount;
  const totalElement = document.getElementById('total');
  totalElement.innerText = totalExpenses.toFixed(2);

  // Check if totalExpenses exceeds 10000
  if (totalExpenses > 10000) {
    alert('Warning: You have exceeded 10000 in expenses for this month!');
  }

  // Clear input fields
  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';
}

