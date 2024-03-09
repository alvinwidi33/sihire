import React, { useEffect, useState } from 'react';

function ManageUser() {
    const containerStyle = {
        backgroundColor: "#F2F2F2"
    };

    const contentContainerStyle = {
        padding: '32px 5%',
    };

    const dividerStyle = {
        borderTop: '1px solid #2D3648',
        borderBottom: '2px solid #2D3648',
        marginTop: '5px',
        marginBottom: '5px',
    };

    const darkBlueText = {
        color: 'var(--WF-Base-800, #2D3648)',
        fontFamily: 'Inter, sans-serif',
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
    };

    const thStyle = {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '2px solid #ddd',
        background: '#f2f2f2'
    };

    const tdStyle = {
        padding: '12px',
        borderBottom: '1px solid #ddd'
    };

    const handleEditUser = (userId) => {
        // Implement your navigation logic here
        console.log(`Edit user with ID: ${userId}`);
        // You can replace the console.log with your navigation logic
    };

    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        fetch('https://sihire-be.vercel.app/api/users/get-all-users/?format=json')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="container mx-auto" style={containerStyle}>
            <div className="px-5" style={{paddingTop: '80px', paddingBottom: '15px'}}>
                <h1 className="text-3xl font-bold" style={darkBlueText}>Manage User</h1>
            </div>
            <hr className="divider" style={dividerStyle}></hr>
            <div className="px-5">
                <h2 className="text-3xl font-bold" style={darkBlueText}>Users</h2>
                <div className="flex items-center mt-4 mb-8">
                    <div className="rounded-lg bg-white shadow-md flex-grow mr-4">
                        <input type='text' id="search" placeholder='Search' className="py-3 px-4 rounded-lg w-full" />
                    </div>
                    <button className="rounded-md bg-blue-700 text-white py-3 px-6" style={{ background: 'var(--WF-Base-800, #2D3648)' }}>
                        <label className="font-bold">Add User</label>
                    </button>
                </div>
            </div>
            <div style={contentContainerStyle}>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>User ID</th>
                            <th style={thStyle}>Email</th>
                            <th style={thStyle}>Username</th>
                            <th style={thStyle}>Name</th>
                            <th style={thStyle}>Role</th>
                            <th style={thStyle}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.user_id}>
                                <td style={tdStyle}>{user.user_id}</td>
                                <td style={tdStyle}>{user.email}</td>
                                <td style={tdStyle}>{user.username}</td>
                                <td style={tdStyle}>{user.name}</td>
                                <td style={tdStyle}>{user.role}</td>
                                <td style={tdStyle}>
                                    <button
                                        onClick={() => handleEditUser(user.user_id)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                                        style={{ background: 'var(--WF-Base-800, #2D3648)' }}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageUser;