CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status ENUM('cleaned','pending','error') NOT NULL
);  