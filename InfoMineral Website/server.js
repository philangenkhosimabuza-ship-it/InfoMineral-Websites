// server.js
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(bodyParser.json());
app.use(session({ secret: "supersecret", resave: false, saveUninitialized: true }));

// Mock DB
const users = [];
const projects = [];
const tasks = [];

// Authentication
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  users.push({ email, password: hashed, role: "client" });
  res.json({ message: "User registered" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email, role: user.role }, "jwtsecret", { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Client Portal
app.get("/projects", (req, res) => {
  res.json(projects);
});

// Admin Backend
app.post("/admin/project", (req, res) => {
  const { name, details } = req.body;
  projects.push({ name, details });
  res.json({ message: "Project added" });
});

// Weekly Task Management
app.post("/tasks", (req, res) => {
  const { projectId, description } = req.body;
  tasks.push({ projectId, description, status: "pending" });
  res.json({ message: "Task created" });
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.listen(3000, () => console.log("Server running on port 3000"));