<?php
// CORS headers - MUST be first!
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include config
require_once 'config.php';

// Get request
$action = isset($_GET['action']) ? $_GET['action'] : '';

// Debug: Log all requests
// error_log("Action: " . $action . " | Method: " . $_SERVER['REQUEST_METHOD']);

if (empty($action)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'No action specified']);
    exit();
}

// Route requests
switch ($action) {
    case 'get_projects':
        getProjects();
        break;
    case 'create_project':
        createProject();
        break;
    case 'update_project':
        updateProject();
        break;
    case 'delete_project':
        deleteProject();
        break;
    case 'get_error_logs':
        getErrorLogs();
        break;
    case 'get_users':
        getUsers();
        break;
    case 'get_user_stats':
        getUserStats();
        break;
    case 'get_data_sources':
        getDataSources();
        break;
    case 'get_kpis':
        getKPIs();
        break;
    default:
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid action: ' . $action]);
        break;
}

// ==================== PROJECTS ====================

function getProjects() {
    global $conn;
    try {
        $sql = "SELECT * FROM projects ORDER BY created DESC";
        $result = $conn->query($sql);

        if ($result === FALSE) {
            throw new Exception("Query error: " . $conn->error);
        }

        $projects = [];
        while ($row = $result->fetch_assoc()) {
            $projects[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $projects]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
}

function createProject() {
    global $conn;
    try {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['name']) || !isset($data['description']) || !isset($data['owner'])) {
            throw new Exception('Missing required fields');
        }

        $name = $conn->real_escape_string($data['name']);
        $description = $conn->real_escape_string($data['description']);
        $owner = $conn->real_escape_string($data['owner']);

        $sql = "INSERT INTO projects (name, description, owner) VALUES ('$name', '$description', '$owner')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => true, 'message' => 'Project created', 'id' => $conn->insert_id]);
        } else {
            throw new Exception($conn->error);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
}

function updateProject() {
    global $conn;
    try {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['id']) || !isset($data['name']) || !isset($data['description']) || !isset($data['owner'])) {
            throw new Exception('Missing required fields');
        }

        $id = intval($data['id']);
        $name = $conn->real_escape_string($data['name']);
        $description = $conn->real_escape_string($data['description']);
        $owner = $conn->real_escape_string($data['owner']);

        $sql = "UPDATE projects SET name='$name', description='$description', owner='$owner' WHERE id=$id";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => true, 'message' => 'Project updated']);
        } else {
            throw new Exception($conn->error);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
}

function deleteProject() {
    global $conn;
    try {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['id'])) {
            throw new Exception('Project ID required');
        }

        $id = intval($data['id']);
        $sql = "DELETE FROM projects WHERE id=$id";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => true, 'message' => 'Project deleted']);
        } else {
            throw new Exception($conn->error);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
}

function getErrorLogs() {
    global $conn;
    try {
        $sql = "SELECT * FROM error_logs ORDER BY created DESC LIMIT 10";
        $result = $conn->query($sql);

        if ($result === FALSE) {
            throw new Exception($conn->error);
        }

        $logs = [];
        while ($row = $result->fetch_assoc()) {
            $logs[] = [
                'id' => $row['id'],
                'type' => $row['type'],
                'message' => $row['message'],
                'time' => formatTime($row['created'])
            ];
        }
        echo json_encode(['success' => true, 'data' => $logs]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
}

function getUsers() {
    global $conn;
    try {
        $sql = "SELECT * FROM users ORDER BY created DESC";
        $result = $conn->query($sql);

        if ($result === FALSE) {
            throw new Exception($conn->error);
        }

        $users = [];
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $users]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
}

function getUserStats() {
    global $conn;
    try {
        $sql = "SELECT role, COUNT(*) as count FROM users GROUP BY role";
        $result = $conn->query($sql);

        if ($result === FALSE) {
            throw new Exception($conn->error);
        }

        $stats = ['Admin' => 0, 'Analyst' => 0, 'Viewer' => 0];

        while ($row = $result->fetch_assoc()) {
            $stats[$row['role']] = (int)$row['count'];
        }

        echo json_encode(['success' => true, 'data' => $stats]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
}

function getDataSources() {
    global $conn;
    try {
        $sql = "SELECT COUNT(*) as total FROM data_sources";
        $result = $conn->query($sql);

        if ($result === FALSE) {
            throw new Exception($conn->error);
        }

        $total = $result->fetch_assoc()['total'];

        $sql2 = "SELECT status, COUNT(*) as count FROM data_sources GROUP BY status";
        $result2 = $conn->query($sql2);

        $sources = [];
        while ($row = $result2->fetch_assoc()) {
            $sources[] = ['status' => $row['status'], 'total' => (int)$row['count']];
        }

        echo json_encode(['success' => true, 'data' => ['total' => (int)$total, 'sources' => $sources]]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
}

function getKPIs() {
    global $conn;
    try {
        $sql = "SELECT * FROM kpis LIMIT 1";
        $result = $conn->query($sql);

        if ($result === FALSE) {
            throw new Exception($conn->error);
        }

        if ($result->num_rows > 0) {
            $kpi = $result->fetch_assoc();
            echo json_encode(['success' => true, 'data' => $kpi]);
        } else {
            echo json_encode(['success' => true, 'data' => null]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
}

function formatTime($timestamp) {
    $time = strtotime($timestamp);
    $now = time();
    $diff = $now - $time;

    if ($diff < 60) {
        return 'Just now';
    } elseif ($diff < 3600) {
        return intval($diff / 60) . ' mins ago';
    } elseif ($diff < 86400) {
        return intval($diff / 3600) . ' hours ago';
    } else {
        return intval($diff / 86400) . ' days ago';
    }
}

?>