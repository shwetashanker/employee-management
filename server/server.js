import express from "express";
import cors from "cors";

const app = express();
const port = 3001;

const employees = [
  {
    id: 1,
    name: "Ava Patel",
    department: "Engineering",
    email: "ava.patel@example.com",
  },
  {
    id: 2,
    name: "Marcus Chen",
    department: "Marketing",
    email: "marcus.chen@example.com",
  },
  {
    id: 3,
    name: "Sofia Rodriguez",
    department: "Human Resources",
    email: "sofia.rodriguez@example.com",
  },
  {
    id: 4,
    name: "Daniel Okafor",
    department: "Finance",
    email: "daniel.okafor@example.com",
  },
];

app.use(cors(
  {
    origin: "http://localhost:5173",
  }
));
app.use(express.json());

app.get("/employees", (request, response) => {
  response.json(employees);
});

app.post("/employees", (request, response) => {
  const { name, department, email } = request.body;
  const newEmployee = {
    id: Math.max(...employees.map((employee) => employee.id)) + 1,
    name,
    department,
    email,
  };

  employees.push(newEmployee);
  response.status(201).json(newEmployee);
});

app.listen(port, () => {
  console.log(`Employee API listening on http://localhost:${port}`);
});
