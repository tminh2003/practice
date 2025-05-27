function AccountForm({ onAddEmployee, activeEmployeeData, onEditEmployee }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    let name = data.get("name");
    let phone = data.get("phone");
    let email = data.get("email");
    let company_name = data.get("company");

    if (!data || !name || !phone || !email || !company_name) return;
    if (activeEmployeeData) {
      onEditEmployee({
        name,
        phone,
        email,
        company: { name: company_name },
        id: Math.random().toFixed(3),
      });
    } else {
      onAddEmployee((prev) => {
        return [
          ...prev,
          {
            name,
            phone,
            email,
            company: { name: company_name },
            id: Math.random().toFixed(3),
          },
        ];
      });
    }

    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        placeholder="Enter your name"
        id="name"
        name="name"
        defaultValue={activeEmployeeData?.name}
      />
      <label htmlFor="phone">Phone</label>
      <input
        type="text"
        placeholder="Enter your phone number"
        id="phone"
        name="phone"
        defaultValue={activeEmployeeData?.phone}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="Enter your email"
        id="email"
        name="email"
        defaultValue={activeEmployeeData?.email}
      />
      <label htmlFor="company">Company</label>
      <input
        type="text"
        placeholder="Enter your company"
        id="company"
        name="company"
        defaultValue={activeEmployeeData?.company?.name}
      />
      <button>{activeEmployeeData ? "Edit Employee" : "Add Employee"}</button>
    </form>
  );
}

export default AccountForm;
