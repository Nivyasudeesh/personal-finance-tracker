<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Summary</title>
  <link rel="stylesheet" href="style.css" />
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <div class="container">
    <h1>📊 Financial Summary</h1>
    <div class="summary">
      <div class="card green">Total Income: ₹<span id="totalIncome">0</span></div>
      <div class="card red">Total Expenses: ₹<span id="totalExpense">0</span></div>
      <div class="card blue">Balance: ₹<span id="balance">0</span></div>
    </div>

    <canvas id="categoryChart"></canvas>

    <a href="index.html" class="link-btn">⬅️ Back to Add</a>
  </div>

  <script src="script.js"></script>
</body>
</html>
