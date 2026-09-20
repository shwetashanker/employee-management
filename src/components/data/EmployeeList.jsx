import { useState } from "react";

const initialEmployees = [
  {
    name: "Ava Patel",
    department: "Engineering",
    email: "ava.patel@example.com",
  },
  {
    name: "Marcus Chen",
    department: "Marketing",
    email: "marcus.chen@example.com",
  },
  {
    name: "Sofia Rodriguez",
    department: "Human Resources",
    email: "sofia.rodriguez@example.com",
  },
  {
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

    setEmployees((currentEmployees) => [...currentEmployees, employeeToAdd]);
    setNewEmployee({ name: "", department: "", email: "" });
    setFormError("");
    setIsAddFormVisible(false);
  }

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Employees</h1>
        <button type="button" onClick={() => setIsAddFormVisible(true)}>
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
          <button type="submit">Save</button>
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
            <tr key={employee.email}>
              <td>{employee.name}</td>
              <td>{employee.department}</td>
              <td>{employee.email}</td>
              <td>
                <button type="button" onClick={() => setSelectedEmployee(employee)}>
                  View
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
