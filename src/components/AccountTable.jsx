function AccountTable({
  employees,
  setEmployees,
  onDeleteEmployee,
  onSelectActiveEmployee,
  activeEmployee,
}) {
  const handleSort = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const sortOption = data.get("sortOption");
    console.log(sortOption);

    let newEmployees = [...employees];

    switch (sortOption) {
      case "name": {
        newEmployees.sort((a, b) => a.name.localeCompare(b.name));
        break;
      }
      case "phone": {
        newEmployees.sort((a, b) => a.phone.localeCompare(b.phone));
        break;
      }
      case "company": {
        newEmployees.sort((a, b) =>
          a.company.name.localeCompare(b.company.name)
        );
        break;
      }
      case "email": {
        newEmployees.sort((a, b) => a.email.localeCompare(b.email));
        break;
      }
      default:
    }

    setEmployees(newEmployees);
    console.log(newEmployees);
    console.log(employees);
  };

  return (
    <div>
      <form onSubmit={handleSort}>
        <label htmlFor="sortOption">Choose a sort option:</label>
        <select id="sortOption" name="sortOption">
          <option value="name">Name</option>
          <option value="phone">Phone</option>
          <option value="email">Email</option>
          <option value="company">Company</option>
        </select>
        <input type="submit" value="Sort" />
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            return (
              <>
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.email}</td>
                  <td>{employee.company.name}</td>
                  <td>
                    <button onClick={() => onSelectActiveEmployee(employee.id)}>
                      {activeEmployee === employee.id ? "Unedit" : "Edit"}
                    </button>
                  </td>
                  <td>
                    <button onClick={() => onDeleteEmployee(employee.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AccountTable;
