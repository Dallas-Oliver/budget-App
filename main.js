const budgetInputForm = document.getElementById("budget-input-form");
const budgetInputField = document.getElementById("budget-input-field");
const expensesNameField = document.getElementById("expenses-name-field");
const expensesCostInputForm = document.getElementById("expenses-input-form");
const expensesCostInputField = document.getElementById("expenses-input-field");
const budgetDisplayAmt = document.getElementById("budget-display-amount");
const expensesDisplayAmt = document.getElementById("expenses-display-amount");
const balanceDisplayAmt = document.getElementById("balance-display-amount");
const expenseTable = document.getElementById("expense-table");
const budgetErrorMessage = document.getElementById("budget-error-msg");
const expenseErrorMessage = document.getElementById("expenses-error-msg");

let budgetNumber = 0;
let expenseNumber = 0;
console.log(expensesCostInputField.value);
let expenseRowNum = 0;
let deleteButtonNum = 0;
let expensesList = [0];

function submitBudget(e) {
  e.preventDefault();
  budgetNumber = Number(budgetInputField.value);

  if (isNaN(budgetNumber)) {
    displayError("budget");
    budgetDisplayAmt.innerHTML = "$0";
  } else {
    budgetErrorMessage.innerHTML = "";
    budgetDisplayAmt.innerHTML = "$ " + budgetNumber;
  }
  displayBalance();
}

function submitExpense(e) {
  e.preventDefault();

  if (expensesCostInputField.value !== "") {
    expensesList.push(expensesCostInputField.value);
  }
  console.log(expensesList);

  expenseRowNum++;
  deleteButtonNum++;

  if (isNaN(expenseNumber)) {
    displayError("expense");
    expensesDisplayAmt.innerHTML = "$0";
  } else {
    expenseErrorMessage.innerHTML = "";
    expensesDisplayAmt.innerHTML = "$ " + expenseNumber;
    addExpenseTableItem();
  }
  displayBalance();
}

function addExpenseTableItem() {
  if (expensesNameField.value !== "") {
    let expenseTableRow = expenseTable.insertRow(expenseRowNum);
    let expenseNameData = expenseTableRow.insertCell(0);
    let expenseCostData = expenseTableRow.insertCell(1);
    let deleteExpenseButton = expenseTableRow.insertCell(2);
    expenseNameData.innerHTML = expensesNameField.value;
    expenseCostData.innerHTML = expensesCostInputField.value;
    deleteExpenseButton.innerHTML = `<button id="delete-button ${deleteButtonNum} onclick="deleteExpense(${deleteButtonNum})">delete</button>`;
  }
}

// deleteExpense(buttonNumber) {

// }

function displayBalance() {
  // let totalBalance = Number(budgetNumber) - Number(expenseNumber);

  let totalExpenses = expensesList.reduce((sum, current) => sum + current);
  let totalBalance = Number(budgetNumber) - Number(totalExpenses);

  if (isNaN(totalBalance)) {
    balanceDisplayAmt.innerHTML = "$0";
  } else {
    balanceDisplayAmt.innerHTML = "$ " + totalBalance;
  }
}

function displayError(arg) {
  let errorMessage = `Please enter a valid ${arg}`;

  if (arg === "budget") {
    budgetErrorMessage.innerHTML = errorMessage;
  } else if (arg === "expense") {
    expenseErrorMessage.innerHTML = errorMessage;
  }
}

budgetInputForm.addEventListener("submit", e => submitBudget(e));
expensesCostInputForm.addEventListener("submit", e => submitExpense(e));
