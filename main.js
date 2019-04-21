const container = document.querySelector(".container");
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

const popupWindow = document.getElementById("popup-window");
const popupButton = document.getElementById("change-window");
const menuList = document.getElementById("menu-list");

let budgetNumber = 0;
let expenseRowNum = 0;
let expensesCostList = [0];
let totalExpensesList;
let totalBalance;
let changeView = false;

function addLocalStorage() {
  window.localStorage.setItem(
    expensesNameField.value,
    expensesCostInputField.value
  );
}

function submitExpense(e) {
  e.preventDefault();

  if (expensesNameField.value !== "" && expensesCostInputField.value !== "") {
    addExpenseToTable(expensesNameField.value, expensesCostInputField.value);
  } else {
    displayError("expense");
  }

  changeBalanceColor();
  addLocalStorage();
  expenseRowNum++;

  if (expensesCostInputField.value !== "" && expensesNameField.value !== "") {
    expensesCostList.push(Number(expensesCostInputField.value));

    totalExpensesList = expensesCostList.reduce(
      (sum, current) => sum + current
    );

    if (isNaN(expensesCostInputField.value)) {
      displayError("expense");
    } else {
      expensesDisplayAmt.innerHTML = "$ " + totalExpensesList.toFixed(2);
      expensesNameField.value = "";
      expensesCostInputField.value = "";
    }
  } else {
    expensesNameField.value = "";
    expensesCostInputField.value = "";
  }
  displayBalance();
  changeBalanceColor();
}

function submitBudget(e) {
  e.preventDefault();
  budgetNumber = Number(budgetInputField.value);

  if (isNaN(budgetNumber)) {
    displayError("budget");
  } else {
    budgetDisplayAmt.innerHTML = "$ " + budgetNumber.toFixed(2);
    budgetInputField.value = "";
  }
  displayBalance();
  changeBalanceColor();
}

function displayBalance() {
  totalBalance = Number(budgetNumber) - totalExpensesList;
  changeBalanceColor();

  if (isNaN(totalBalance)) {
    return;
  } else {
    balanceDisplayAmt.innerHTML = totalBalance.toFixed(2);
  }
}

function changeBalanceColor() {
  if (Number(balanceDisplayAmt.innerHTML) <= 0) {
    balanceDisplayAmt.style.color = "#C02B23";
  } else {
    balanceDisplayAmt.style.color = "#4ce66a";
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

// function expenseTableInfo(nameOrCost, list, expenseValue) {
//   nameOrCost = document.createElement("li");
//   nameOrCost.textContent = expenseValue;
//   nameOrCost.classList = "list-item" + expenseRowNum;
//   list.appendChild(nameOrCost);
// }

function addExpenseToTable(expenseName, expenseCost) {
  const expense = document.createElement("li");
  expense.textContent = expenseName;
  expense.classList = "list-item" + expenseRowNum;
  expensesDisplayList.appendChild(expense);

  const expenseItemCost = document.createElement("li");
  expenseItemCost.textContent = "$ " + Number(expenseCost).toFixed(2);
  expenseItemCost.classList = "list-item" + expenseRowNum;
  expensescostDisplayList.appendChild(expenseItemCost);

  // if (expensesCostInputField.value !== "") {
  //   if (expenseName === expensesNameField.value) {
  //     expenseTableInfo(expense, expensesDisplayList, expenseName);
  //   } else if (expenseName === expensesCostInputField.value) {
  //     expenseTableInfo(expenseItemCost, expensesCostDisplayList);
  //   }
  // }
}

function displayMenu() {
  if (changeView === false) {
    popupWindow.style.visibility = "visible";
    menuList.style.visibility = "visible";
    container.style.filter = "blur(3px)";
    changeView = true;
  }
}

function hideMenu() {
  if (changeView === true) {
    popupWindow.style.visibility = "hidden";
    menuList.style.visibility = "hidden";
    container.style.filter = "none";
    changeView = false;
  }
}

budgetInputForm.addEventListener("submit", e => submitBudget(e));
expensesCostInputForm.addEventListener("submit", e => submitExpense(e));
