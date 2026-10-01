function EmployeeTable({ employees, onDelete, onView, onEdit }) {
  return (
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
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.department}</td>
            <td>{employee.email}</td>
            <td>
              <button type="button" onClick={() => onDelete(employee.id)}>
                Delete
              </button>
              <button type="button" onClick={() => onView(employee)}>
                View
              </button>
              <button type="button" onClick={() => onEdit(employee)}>
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
