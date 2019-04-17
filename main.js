const budgetInputForm = document.getElementById("budget-input-form");
const budgetInputField = document.getElementById("budget-input-field");
const expensesNameField = document.getElementById("expenses-name-field");
const expensesCostInputForm = document.getElementById("expenses-input-form");
const expensesCostInputField = document.getElementById("expenses-input-field");
const budgetDisplayAmt = document.getElementById("budget-display-amount");
const expensesDisplayAmt = document.getElementById("expenses-display-amount");
const expensesDisplayList = document.getElementById("expenses-list-name");
const expensescostDisplayList = document.getElementById("expenses-list-cost");
const balanceDisplayAmt = document.getElementById("balance-display-amount");
const budgetErrorMessage = document.getElementById("budget-error-msg");
const expenseErrorMessage = document.getElementById("expenses-error-msg");

let budgetNumber = 0;
let expenseRowNum = 0;
let expensesList = [0];
let totalExpensesList;
let totalBalance;

localStorage.setItem("expenses", JSON.stringify(expensesList));

function submitExpense(e) {
  e.preventDefault();

  expenseRowNum++;

  if (expensesCostInputField.value !== "") {
    expensesList.push(Number(expensesCostInputField.value));
    localStorage.setItem("expenses", JSON.stringify(expensesList));
    totalExpensesList = expensesList.reduce((sum, current) => sum + current);

    if (isNaN(expensesCostInputField.value)) {
      displayError("expense");
    } else {
      expensesDisplayAmt.innerHTML = "$ " + totalExpensesList;
    }
  }
  displayBalance();
  addExpenseToTable(expensesNameField.value, expensesCostInputField.value);
  changeBalanceColor();
}

function submitBudget(e) {
  e.preventDefault();
  budgetNumber = Number(budgetInputField.value);

  if (isNaN(budgetNumber)) {
    displayError("budget");
  } else {
    budgetDisplayAmt.innerHTML = "$ " + budgetNumber;
    budgetInputField.value = "";
  }
  displayBalance();
  changeBalanceColor();
}

function displayBalance() {
  totalBalance = Number(budgetNumber) - totalExpensesList;
  changeBalanceColor();

  if (isNaN(totalBalance)) {
    balanceDisplayAmt.innerHTML = "0";
  } else {
    balanceDisplayAmt.innerHTML = totalBalance;
  }
}

function changeBalanceColor() {
  console.log(balanceDisplayAmt.innerHTML);
  if (Number(balanceDisplayAmt.innerHTML) <= 0) {
    balanceDisplayAmt.style.color = "red";
  } else {
    balanceDisplayAmt.style.color = "green";
  }
}

function disableInputs(bool) {
  let inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].disabled = bool;
  }
}

function setErrorStyles(arg) {
  arg.style.visibility = "visible";
  disableInputs(true);

  setTimeout(function() {
    arg.style.visibility = "hidden";
    disableInputs(false);
  }, 3000);
}

function displayError(arg) {
  if (arg === "budget") {
    setErrorStyles(budgetErrorMessage);
  } else if (arg === "expense") {
    setErrorStyles(expenseErrorMessage);
  }
}

function addExpenseToTable(expenseName, expenseCost) {
  const expense = document.createElement("li");
  expense.textContent = expenseName;
  expense.classList = "list-item" + expenseRowNum;
  expensesDisplayList.appendChild(expense);

  expenseItemCost = document.createElement("li");
  expenseItemCost.textContent = expenseCost;
  expenseItemCost.classList = "list-item" + expenseRowNum;
  expensescostDisplayList.appendChild(expenseItemCost);
}

budgetInputForm.addEventListener("submit", e => submitBudget(e));
expensesCostInputForm.addEventListener("submit", e => submitExpense(e));
