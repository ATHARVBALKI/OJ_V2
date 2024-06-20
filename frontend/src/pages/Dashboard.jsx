import { jwtDecode } from "jwt-decode";
import React from "react";
import { useSelector } from "react-redux";
import StudentDash from "../components/StudentDash";
import AdminDash from "../components/AdminDash";

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const payload = jwtDecode(token);
  const accountType = payload.accountType;
  console.log("PAYLOAD----->>>",payload);
  return (
    <div>
      <div>
        {accountType === "Student" ? (
          <StudentDash></StudentDash>
        ) : (
          <AdminDash></AdminDash>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
