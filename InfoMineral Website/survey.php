<?php
$host = "localhost";      // your database host
$user = "root";           // your database username
$password = "";           // your database password
$dbname = "infomineral";    // your database name

// Create connection
$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

include 'db_connect.php';

// Query to get survey data
$sql = "SELECT survey_id, date, name, surname, campus, age_range, gender, enumerator FROM survey";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>" . $row["survey_id"] . "</td>
                <td>" . $row["date"] . "</td>
                <td>" . $row["name"] . "</td>
                <td>" . $row["surname"] . "</td>
                <td>" . $row["campus"] . "</td>
                <td>" . $row["age_range"] . "</td>
                <td>" . $row["gender"] . "</td>
                <td>" . $row["enumerator"] . "</td>
              </tr>";
    }
} 
else {
    echo "<tr><td colspan='8'>No records found</td></tr>";
}

$conn->close();
?>


<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Prevent SQL injection
    $email = $conn->real_escape_string($email);
    $password = $conn->real_escape_string($password);

    // Query to check user
    $sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Login success
        echo "Login successful! Welcome " . $email;
        // You can redirect to a dashboard:
        // header("Location: dashboard.php");
    } else {
        echo "Invalid email or password.";
    }
}
$conn->close();
?>









?>
