function EmployeeForm({ employee, error, isEditing, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="employee-name">Name</label>
        <input
          id="employee-name"
          name="name"
          type="text"
          value={employee.name}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="employee-department">Department</label>
        <input
          id="employee-department"
          name="department"
          type="text"
          value={employee.department}
          onChange={onChange}
        />
      </div>
      <div>
        <label htmlFor="employee-email">Email</label>
        <input
          id="employee-email"
          name="email"
          type="email"
          value={employee.email}
          onChange={onChange}
        />
      </div>
      {error && <p role="alert">{error}</p>}
      <button type="submit">{isEditing ? "Update Employee" : "Save"}</button>
    </form>
  );
}

export default EmployeeForm;
