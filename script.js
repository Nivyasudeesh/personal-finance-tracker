let transactions = JSON.parse(localStorage.getItem("transactions") || "[]");

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function deleteTransaction(index) {
  if (confirm("Delete this transaction?")) {
    transactions.splice(index, 1);
    saveTransactions();
    location.reload();
  }
}

function clearAll() {
  if (confirm("Clear all transactions?")) {
    transactions = [];
    saveTransactions();
    location.reload();
  }
}

function loadTransactions() {
  const list = document.getElementById("transactionList");
  if (!list) return;

  list.innerHTML = "";
  transactions.forEach((tx, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${tx.type === "income" ? "🟢" : "🔴"} ₹${tx.amount}</strong> - ${tx.category} (${tx.date})
        ${tx.note ? `<br><small>📝 ${tx.note}</small>` : ""}
      </div>
      <button onclick="deleteTransaction(${i})">❌</button>
    `;
    list.appendChild(li);
  });
}

function setupForm() {
  const form = document.getElementById("transactionForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = +document.getElementById("amount").value;
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const note = document.getElementById("note").value;

    transactions.push({ amount, type, category, date, note });
    saveTransactions();
    form.reset();
    loadTransactions();
  });
}

function loadSummary() {
  const income = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  document.getElementById("totalIncome").textContent = income;
  document.getElementById("totalExpense").textContent = expense;
  document.getElementById("balance").textContent = balance;

  const categories = {};
  transactions.forEach(t => {
    if (!categories[t.category]) categories[t.category] = 0;
    categories[t.category] += t.amount;
  });

  const chart = document.getElementById("categoryChart");
  if (chart) {
    new Chart(chart, {
      type: "doughnut",
      data: {
        labels: Object.keys(categories),
        datasets: [{
          label: "Category Breakdown",
          data: Object.values(categories),
          backgroundColor: [
            "#4caf50", "#f44336", "#ff9800", "#2196f3", "#9c27b0", "#00bcd4"
          ]
        }]
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupForm();
  loadTransactions();
  loadSummary();
});
