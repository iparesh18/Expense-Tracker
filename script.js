const balanceElement = document.getElementById("balance");
const transactionsElement = document.getElementById("transactions");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const transactionType = document.getElementById("transaction-type");
const dateInput = document.getElementById("transaction-date");
const addTransactionButton = document.getElementById("add-transaction");
const exportButton = document.getElementById("export-data");

let balance = 0;
let transactions = [];

// Load data from local storage
function loadData() {
  const savedBalance = localStorage.getItem("balance");
  const savedTransactions = JSON.parse(localStorage.getItem("transactions"));

  if (savedBalance !== null) {
    balance = parseFloat(savedBalance);
  }

  if (savedTransactions) {
    transactions = savedTransactions;
  }

  updateUI();
}

// Set default date in dd/mm/yyyy format
function setDefaultDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const yyyy = today.getFullYear();
  dateInput.value = `${dd}/${mm}/${yyyy}`; // Set date in dd/mm/yyyy format
}

// Initialize default date on page load
setDefaultDate();
loadData();

// Validate date format (dd/mm/yyyy)
function isValidDate(date) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/; // Matches dd/mm/yyyy format
  if (!regex.test(date)) return false;

  const [dd, mm, yyyy] = date.split("/").map(Number);
  const isValid = dd >= 1 && dd <= 31 && mm >= 1 && mm <= 12 && yyyy >= 1000;
  return isValid;
}

// Convert dd/mm/yyyy to yyyy-mm-dd for storage
function convertToStorageDate(date) {
  const [dd, mm, yyyy] = date.split("/");
  return `${yyyy}-${mm}-${dd}`;
}

// Convert yyyy-mm-dd to dd/mm/yyyy for display
function convertToDisplayDate(date) {
  const [yyyy, mm, dd] = date.split("-");
  return `${dd}/${mm}/${yyyy}`;
}

// Add a new transaction
addTransactionButton.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = transactionType.value;
  let date = dateInput.value;

  if (!title) {
    alert("Please enter a valid title");
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  if (!isValidDate(date)) {
    alert("Please enter a valid date in dd/mm/yyyy format");
    return;
  }

  // Convert date to yyyy-mm-dd for internal storage
  date = convertToStorageDate(date);

  // Update balance
  if (type === "income") {
    balance += amount;
  } else {
    balance -= amount;
  }

  // Save transaction
  transactions.push({ title, type, amount, date });
  saveData();
  updateUI();
  titleInput.value = "";
  amountInput.value = "";
});

// Save data to local storage
function saveData() {
  localStorage.setItem("balance", balance.toString());
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Update the UI
function updateUI() {
  balanceElement.textContent = balance.toFixed(2);

  transactionsElement.innerHTML = "";
  transactions.forEach((transaction, index) => {
    // Convert date from yyyy-mm-dd to dd/mm/yyyy for display
    const formattedDate = convertToDisplayDate(transaction.date);
    const li = document.createElement("li");

    // Display the income/expense sign (+/-) based on the transaction type
    const sign = transaction.type === "income" ? "+" : "-";

    li.innerHTML = `
      <strong>${transaction.title}</strong> 
      <span>${sign}₹${transaction.amount.toFixed(2)}</span> 
      <span>(${formattedDate})</span>
      <button onclick="deleteTransaction(${index})">X</button>
    `;
    transactionsElement.appendChild(li);
  });
}

// Delete a transaction
function deleteTransaction(index) {
  const transaction = transactions[index];
  balance += transaction.type === "income" ? -transaction.amount : transaction.amount;
  transactions.splice(index, 1);
  saveData();
  updateUI();
}

// Export data as an Excel file
exportButton.addEventListener("click", () => {
  const data = [
    ["Title", "Type", "Amount (₹)", "Date"],
    ...transactions.map((t) => [
      t.title,
      t.type === "income" ? "Income" : "Expense",
      t.amount.toFixed(2),
      convertToDisplayDate(t.date),
    ]),
    ["", "", "Balance:", balance.toFixed(2)],
  ];

  const ws = XLSX.utils.aoa_to_sheet(data); // Convert array of arrays to worksheet
  const wb = XLSX.utils.book_new(); // Create a new workbook
  XLSX.utils.book_append_sheet(wb, ws, "Transactions"); // Append the worksheet

  XLSX.writeFile(wb, "Daily_Expense_Report.xlsx"); // Save the file
});
