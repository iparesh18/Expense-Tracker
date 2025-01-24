# Expense Tracker App

## Description
The **Expense Tracker App** is a user-friendly web application designed to help users manage their personal finances effectively. It allows users to track their income and expenses, view their transaction history, and export a report of their transactions in Excel format.

## Features
- **Track Income and Expenses:** Add transactions as income or expenses to maintain an accurate balance.
- **Transaction History:** View all your transactions in a clear, chronological list.
- **Date Validation:** Ensure proper date formatting (dd/mm/yyyy) for all transactions.
- **Balance Calculation:** Automatically updates your balance based on the type and amount of transactions.
- **Export Transactions:** Generate an Excel report (.xlsx) with transaction details and balance information.
- **Persistent Storage:** Data is saved locally using the browser's local storage.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Excel Export:** SheetJS (XLSX library)
- **Local Storage:** For persistent data storage on the client side

## Getting Started
### Prerequisites
- A modern web browser (e.g., Chrome, Firefox, Edge)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/expense-tracker.git
   ```
2. Navigate to the project directory:
   ```bash
   cd expense-tracker
   ```
3. Open the `index.html` file in your browser to use the application.

### Usage
1. **Add a Transaction:**
   - Enter a title, amount, transaction type (income/expense), and date.
   - Click the "Add Transaction" button.
2. **View Balance:**
   - The current balance is displayed at the top of the app.
3. **Export Data:**
   - Click the "Export Report" button to download an Excel file containing all transactions and the balance.

## File Structure
```
expense-tracker/
├── index.html         # Main HTML file
├── styles.css         # Stylesheet for the app
├── script.js          # JavaScript logic for the app
└── README.md          # Documentation for the project
```

## Dependencies
- [SheetJS (XLSX)](https://github.com/SheetJS/sheetjs)
  
  Include SheetJS in your `index.html` file:
  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
  ```

### Excel Export Example
![Excel Export Example](#)


## Author

- [GitHub Profile](https://github.com/iparesh18)

Feel free to contribute to this project by submitting issues or pull requests!

