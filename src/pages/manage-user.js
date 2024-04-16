import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ManageUser() {
  const containerStyle = {
    backgroundColor: "#F2F2F2",
  };

  const contentContainerStyle = {
    padding: "32px 5%",
  };

  const dividerStyle = {
    borderTop: "1px solid #2D3648",
    borderBottom: "2px solid #2D3648",
    marginTop: "5px",
    marginBottom: "5px",
  };

  const darkBlueText = {
    color: "var(--WF-Base-800, #2D3648)",
    fontFamily: "Inter, sans-serif",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thStyle = {
    padding: "12px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
    background: "#f2f2f2",
  };

  const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  };

  const navigate = useNavigate();

    const handleEditUser = (userId) => {
        console.log(`Edit user with ID: ${userId}`);
        navigate(`/edit-user-role/${userId}`);
    };

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  // Add a state variable to hold the selected role filter
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedName, setSelectedName] = useState("");

  // Modify the useEffect hook to fetch data based on the selected role filter
  useEffect(() => {
    // Fetch data from the API with pagination and role filter
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://sihire-be.vercel.app/api/users/get-all-users/?page=${currentPage}&name=${selectedName}&role=${selectedRole}`,
          {
            method: "GET",
            headers: {
              Authorization: "Token " + window.localStorage.getItem("token"),
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUsers(data.results);
          setTotalUsers(data.count);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, selectedRole, selectedName]);

  const totalPages = Math.ceil(totalUsers / 10);

  // const token = JSON.parse(localStorage.getItem('token'));

  // if (!token) {
  //     return <Navigate to="/login" />;
  // }

  return (
    <div className="container mx-auto" style={containerStyle}>
      <div
        className="px-5"
        style={{ paddingTop: "20px", paddingBottom: "15px" }}
      >
        <h1 className="text-3xl font-bold" style={darkBlueText}>
          Manage User
        </h1>
      </div>
      <hr className="divider" style={dividerStyle}></hr>
      <div className="px-5">
        <div className="flex items-center mt-4">
          <h2 className="text-3xl font-bold" style={darkBlueText}>
            Users
          </h2>
          <div className="rounded-lg bg-white shadow-md flex-grow mr-4 ml-4">
            <input
              type="text"
              id="search"
              placeholder="Search"
              className="py-3 px-4 rounded-lg w-full"
              onChange={(e) => setSelectedName(e.target.value)}
            />
          </div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="py-3 px-4 rounded-lg mr-4 shadow-md"
          >
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="General Affairs">General Affairs</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Director">Director</option>
            <option value="Applicant">Applicant</option>
          </select>
          <Link to={`/add-user`}>
            <button
              className="rounded-md bg-blue-700 text-white py-3 px-6"
              style={{ background: "var(--WF-Base-800, #2D3648)" }}
            >
              <label className="font-bold">Add User</label>
            </button>
          </Link>
        </div>
      </div>
      <div style={contentContainerStyle}>
        <p>Total users: {totalUsers}</p>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Username</th>
              <th style={thStyle}>Nama</th>
              <th style={thStyle}>No Telepon</th>
              <th style={thStyle}>Role</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user.user_id}>
                  <td style={tdStyle}>{user.email}</td>
                  <td style={tdStyle}>{user.username}</td>
                  <td style={tdStyle}>{user.name}</td>
                  <td style={tdStyle}>{user.phone}</td>
                  <td style={tdStyle}>{user.role}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleEditUser(user.user_id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                      style={{ background: "var(--WF-Base-800, #2D3648)" }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          disabled={currentPage === 1}
          className={`py-2 px-4 rounded-md mr-2 ${
            currentPage === 1
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700 text-white"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          disabled={currentPage * 10 >= totalUsers}
          className={`py-2 px-4 rounded-md ${
            currentPage * 10 >= totalUsers
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ManageUser;
