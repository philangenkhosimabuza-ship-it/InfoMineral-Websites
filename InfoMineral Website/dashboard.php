<?php
// Database connection
$conn = new mysqli("localhost", "root", "", "infomineral");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Insert new task if form submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $status = $_POST['status'];
    $conn->query("INSERT INTO tasks (status) VALUES ('$status')");
}

// Calculate stats
$total = $conn->query("SELECT COUNT(*) as total FROM tasks")->fetch_assoc()['total'];
$cleaned = $total ? round($conn->query("SELECT COUNT(*) as c FROM tasks WHERE status='cleaned'")->fetch_assoc()['c'] / $total * 100) : 0;
$pending = $total ? round($conn->query("SELECT COUNT(*) as p FROM tasks WHERE status='pending'")->fetch_assoc()['p'] / $total * 100) : 0;
$errors  = $total ? round($conn->query("SELECT COUNT(*) as e FROM tasks WHERE status='error'")->fetch_assoc()['e'] / $total * 100) : 0;
?>
<!DOCTYPE html>
<html>
<head>
  <title>Cleaning Dashboard</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    .stat-card { padding:20px; color:#fff; border-radius:8px; margin:10px; display:inline-block; }
  </style>
</head>
<body>
  <h3>Cleaning Progress</h3>

  <!-- Insert Form -->
  <form method="POST">
    <select name="status">
      <option value="cleaned">Cleaned</option>
      <option value="pending">Pending</option>
      <option value="error">Error</option>
    </select>
    <button type="submit">Add Task</button>
  </form>

  <!-- Chart -->
  <canvas id="cleaningChart" width="400" height="200"></canvas>

  <!-- Stats -->
  <div>
    <div class="stat-card" style="background:linear-gradient(135deg,#27ae60 0%,#229954 100%);">
      <h4>Cleaned</h4>
      <div class="value"><?php echo $cleaned; ?>%</div>
    </div>
    <div class="stat-card" style="background:linear-gradient(135deg,#f39c12 0%,#d68910 100%);">
      <h4>Pending</h4>
      <div class="value"><?php echo $pending; ?>%</div>
    </div>
    <div class="stat-card" style="background:linear-gradient(135deg,#e74c3c 0%,#c0392b 100%);">
      <h4>Errors</h4>
      <div class="value"><?php echo $errors; ?>%</div>
    </div>
  </div>

  <script>
    const ctx = document.getElementById('cleaningChart').getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Cleaned', 'Pending', 'Errors'],
        datasets: [{
          data: [<?php echo $cleaned; ?>, <?php echo $pending; ?>, <?php echo $errors; ?>],
          backgroundColor: ['#27ae60', '#f39c12', '#e74c3c']
        }]
      }
    });
  </script>
</body>
</html>