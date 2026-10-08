import { useEffect, useState } from "react";
import EmployeeForm from "./EmployeeForm";
import EmployeeTable from "./EmployeeTable";

/**const initialEmployees = [
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
];**/

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
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

  useEffect(() => {
    fetch("http://localhost:3001/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data));
  }, []);

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

  async function handleSaveEmployee(event) {
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
      try {
        const response = await fetch("http://localhost:3001/employees", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employeeToAdd),
        });

        if (!response.ok) {
          throw new Error("Unable to add employee");
        }

        const createdEmployee = await response.json();
        setEmployees((currentEmployees) => [...currentEmployees, createdEmployee]);
      } catch {
        setFormError("Unable to add employee. Please try again.");
        return;
      }
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
    <section className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold text-blue-600">Employees</h1>
        <button type="button" onClick={handleAddEmployee}>
          + Add Employee
        </button>
      </div>
      {isAddFormVisible && (
        <EmployeeForm
          employee={newEmployee}
          error={formError}
          isEditing={Boolean(editingEmployee)}
          onChange={handleNewEmployeeChange}
          onSubmit={handleSaveEmployee}
        />
      )}
      <input
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search employees"
        aria-label="Search employees by name"
      />
      <EmployeeTable
        employees={filteredEmployees}
        onDelete={handleDeleteEmployee}
        onView={setSelectedEmployee}
        onEdit={handleEditEmployee}
      />
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
