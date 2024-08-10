import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import DataService from "../../services/data.service";

const ExpenseRoleManagement = () => {
  const [data, setData] = useState([]);
  const [admin, setAdmin] = useState("");

  const [selectedRoles, setSelectedRoles] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [someChecked, setSomeChecked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getExpenseRole();
  }, []);

  const getExpenseRole = () => {
    DataService.getExpenseRole()
      .then((data) => {
        const fetchedRoles = data.data.data?.ApprovelRole || [];
        setData(data.data.data);
        setSelectedRoles(fetchedRoles);
        setAllChecked(fetchedRoles.length === 2);
        setSomeChecked(fetchedRoles.length > 0 && fetchedRoles.length < 2);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(resMessage, {});
      });
  };

  const handleSubmit = (roles) => {
    const data = {
      ApprovelRole: roles,
    };

    DataService.updateExpenseRole(data).then(
      () => {
        toast.success("Role Selected successfully !!");
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.msg) ||
          error.message ||
          error.toString();
        toast.error(resMessage, {});
      }
    );
  };

  const handleIndividualCheckbox = (role) => {
    setSelectedRoles((prev) => {
      const newRoles = prev.includes(role)
        ? prev.filter((r) => r !== role)
        : [...prev, role];
      handleSubmit(newRoles);
      setAllChecked(newRoles.length === 2);
      setSomeChecked(newRoles.length > 0 && newRoles.length < 2);
      return newRoles;
    });
  };

  const handleSelectAll = () => {
    const newCheckedState = !allChecked;
    const newRoles = newCheckedState ? ["admin", "HR"] : [];
    setSelectedRoles(newRoles);
    handleSubmit(newRoles);
    setAllChecked(newCheckedState);
    setSomeChecked(false);
  };
  return (
    <>
      <div className="Role_Management">
        <div className="role_container">
          <div className="section_a_part_a role-management-space" >
            <h4>Expense Management</h4>
            <div className="radio_btn-top-sec">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={handleSelectAll}
                ref={(input) => {
                  if (input) input.indeterminate = someChecked && !allChecked;
                }}
              />
              <label>Select all</label>
            </div>
          </div>
          <div className="radio_btn_div">
            <div className="radio_btn_a">
              <input
                type="checkbox"
                value={admin}
                checked={selectedRoles.includes("admin")}
                onChange={() => handleIndividualCheckbox("admin")}
              />
              <label>Admin</label>
            </div>
            <div className="radio_btn_a">
              <input
                type="checkbox"
                checked={selectedRoles.includes("HR")}
                onChange={() => handleIndividualCheckbox("HR")}
              />
              <label>HR</label>
            </div>
            {/* <div className="radio_btn_a">
              <input
                type="checkbox"
                checked={selectedRoles.includes("TL")}
                onChange={() => handleIndividualCheckbox("TL")}
              />
              <label>Team Leader</label>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseRoleManagement;
