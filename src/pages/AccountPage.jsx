import { useState, useEffect } from "react";
import AccountTable from "../components/AccountTable";
import AccountForm from "../components/AccountForm";

function AccountPage() {
  const [employees, setEmployees] = useState([]);
  const [activeEmployee, setActiveEmployee] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setEmployees(data);
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);

  const handleDeleteEmployee = (id) => {
    let confirm = window.confirm("Do you want to delete");
    if (!confirm) {
      return;
    }
    let newEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(newEmployees);
  };

  const handleSelectActiveEmployee = (id) => {
    if (activeEmployee === id) setActiveEmployee(null);
    else setActiveEmployee(id);
  };

  const handleEditEmployee = (updatedObject) => {
    let updatedEmployees = [...employees];
    let activeEmployeeIndex = employees.findIndex(
      (employee) => employee.id === activeEmployee
    );
    updatedEmployees[activeEmployeeIndex] = {
      ...updatedEmployees[activeEmployeeIndex],
      ...updatedObject,
    };
    setEmployees(updatedEmployees);
    setActiveEmployee(null);
  };

  let activeEmployeeData = null;
  if (activeEmployee)
    activeEmployeeData = employees.find(
      (employee) => employee.id === activeEmployee
    );

  return (
    <div>
      <AccountTable
        employees={employees}
        setEmployees={setEmployees}
        onDeleteEmployee={handleDeleteEmployee}
        onSelectActiveEmployee={handleSelectActiveEmployee}
        activeEmployee={activeEmployee}
      />
      <AccountForm
        onEditEmployee={handleEditEmployee}
        onAddEmployee={setEmployees}
        activeEmployeeData={activeEmployeeData}
      />
    </div>
  );
}

export default AccountPage;
