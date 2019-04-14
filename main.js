const budgetInputForm = document.getElementById("budget-input-form");
const budgetInputField = document.getElementById("budget-input-field");
const expensesNameField = document.getElementById("expenses-name-field");
const expensesCostInputForm = document.getElementById("expenses-input-form");
const expensesCostInputField = document.getElementById("expenses-input-field");
const budgetDisplayAmt = document.getElementById("budget-display-amount");
const expensesDisplayAmt = document.getElementById("expenses-display-amount");
const balanceDisplayAmt = document.getElementById("balance-display-amount");
const expenseTableNameContainer = document.getElementById("expense-table-name");
const expenseTableCostContainer = document.getElementById("expense-table-cost");
const expenseTableDeleteButtonContainer = document.getElementById(
  "expense-table-delete-button"
);
const budgetErrorMessage = document.getElementById("budget-error-msg");
const expenseErrorMessage = document.getElementById("expenses-error-msg");

let budgetNumber = 0;
let expenseRowNum = 0;
let expensesList = [0];
let totalExpensesList;
let totalBalance;

function submitExpense(e) {
  e.preventDefault();
  expenseRowNum++;

  if (expensesCostInputField.value !== "") {
    expensesList.push(Number(expensesCostInputField.value));
    totalExpensesList = expensesList.reduce((sum, current) => sum + current);

    if (isNaN(expensesCostInputField.value)) {
      displayError("expense");
    } else {
      expenseErrorMessage.innerHTML = "";
      expensesDisplayAmt.innerHTML = "$ " + totalExpensesList;
    }
  }
  displayBalance();
  addExpenseToTable();
}

function submitBudget(e) {
  e.preventDefault();
  budgetNumber = Number(budgetInputField.value);

  if (isNaN(budgetNumber)) {
    displayError("budget");
    budgetDisplayAmt.innerHTML = "$0";
  } else {
    budgetErrorMessage.innerHTML = "";
    budgetDisplayAmt.innerHTML = "$ " + budgetNumber;
    budgetInputField.value = "";
  }
  displayBalance();
}

function displayBalance() {
  totalBalance = Number(budgetNumber) - totalExpensesList;

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

function addExpenseToTable() {
  let newExpenseItemName = document.createElement("P");
  newExpenseItemName.classList = `item-number-${expenseRowNum}`;
  newExpenseItemName.innerHTML = expensesNameField.value;

  let newExpenseItemCost = document.createElement("P");
  newExpenseItemCost.classList = `item-number-${expenseRowNum}`;
  newExpenseItemCost.innerHTML = expensesCostInputField.value;

  let newExpenseDeleteButton = document.createElement("BUTTON");
  newExpenseDeleteButton.classList = `item-number-${expenseRowNum}`;
  newExpenseDeleteButton.innerHTML = "Delete Expense";

  expenseTableNameContainer.appendChild(newExpenseItemName);
  expenseTableCostContainer.appendChild(newExpenseItemCost);
  expenseTableDeleteButtonContainer.appendChild(newExpenseDeleteButton);
}

budgetInputForm.addEventListener("submit", e => submitBudget(e));
expensesCostInputForm.addEventListener("submit", e => submitExpense(e));
