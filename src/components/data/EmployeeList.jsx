import { useState } from "react";

const initialEmployees = [
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

function EmployeeList() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    department: "",
    email: "",
  });
  const [formError, setFormError] = useState("");
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  function handleNewEmployeeChange(event) {
    const { name, value } = event.target;
    setNewEmployee((currentEmployee) => ({
      ...currentEmployee,
      [name]: value,
    }));
  }

  function handleSaveEmployee(event) {
    event.preventDefault();

    const employeeToAdd = {
      name: newEmployee.name.trim(),
      department: newEmployee.department.trim(),
      email: newEmployee.email.trim(),
    };

    if (!employeeToAdd.name || !employeeToAdd.department || !employeeToAdd.email) {
      setFormError("Please complete all fields.");
      return;
    }

    if (editingEmployee) {
      setEmployees((currentEmployees) =>
        currentEmployees.map((employee) =>
          employee.id === editingEmployee.id
            ? { ...employeeToAdd, id: employee.id }
            : employee,
        ),
      );
      setSelectedEmployee((currentEmployee) =>
        currentEmployee?.id === editingEmployee.id
          ? { ...employeeToAdd, id: editingEmployee.id }
          : currentEmployee,
      );
    } else {
      setEmployees((currentEmployees) => {
        const nextId = Math.max(...currentEmployees.map((employee) => employee.id)) + 1;

        return [...currentEmployees, { ...employeeToAdd, id: nextId }];
      });
    }

    setNewEmployee({ name: "", department: "", email: "" });
    setFormError("");
    setIsAddFormVisible(false);
    setEditingEmployee(null);
  }

  function handleEditEmployee(employee) {
    setEditingEmployee(employee);
    setNewEmployee({
      name: employee.name,
      department: employee.department,
      email: employee.email,
    });
    setFormError("");
    setIsAddFormVisible(true);
  }

  function handleAddEmployee() {
    setEditingEmployee(null);
    setNewEmployee({ name: "", department: "", email: "" });
    setFormError("");
    setIsAddFormVisible(true);
  }

  function handleDeleteEmployee(id) {
    setEmployees((currentEmployees) =>
      currentEmployees.filter((employee) => employee.id !== id),
    );
    setSelectedEmployee((currentEmployee) =>
      currentEmployee?.id === id ? null : currentEmployee,
    );
  }

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Employees</h1>
        <button type="button" onClick={handleAddEmployee}>
          + Add Employee
        </button>
      </div>
      {isAddFormVisible && (
        <form onSubmit={handleSaveEmployee}>
          <div>
            <label htmlFor="employee-name">Name</label>
            <input
              id="employee-name"
              name="name"
              type="text"
              value={newEmployee.name}
              onChange={handleNewEmployeeChange}
            />
          </div>
          <div>
            <label htmlFor="employee-department">Department</label>
            <input
              id="employee-department"
              name="department"
              type="text"
              value={newEmployee.department}
              onChange={handleNewEmployeeChange}
            />
          </div>
          <div>
            <label htmlFor="employee-email">Email</label>
            <input
              id="employee-email"
              name="email"
              type="email"
              value={newEmployee.email}
              onChange={handleNewEmployeeChange}
            />
          </div>
          {formError && <p role="alert">{formError}</p>}
          <button type="submit">
            {editingEmployee ? "Update Employee" : "Save"}
          </button>
        </form>
      )}
      <input
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search employees"
        aria-label="Search employees by name"
      />
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Department</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.email}</td>
              <td>
                <button type="button" onClick={() => handleDeleteEmployee(employee.id)}>
                  Delete
                </button>
                <button type="button" onClick={() => setSelectedEmployee(employee)}>
                  View
                </button>
                <button type="button" onClick={() => handleEditEmployee(employee)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedEmployee && (
        <section>
          <h2>Employee Details</h2>
          <p>Name: {selectedEmployee.name}</p>
          <p>Department: {selectedEmployee.department}</p>
          <p>Email: {selectedEmployee.email}</p>
        </section>
      )}
    </section>
  );
}

export default EmployeeList;
