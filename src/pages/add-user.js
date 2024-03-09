import React, { useState } from 'react';

function AddUser() {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        name: '',
        role: ''
    });

    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form validation
        const validationErrors = {};
        if (!formData.email || !formData.email.includes('@')) {
            validationErrors.email = 'Please enter a valid email address';
        }
        setErrors(validationErrors);
        // If there are no errors, submit the form
        if (Object.keys(validationErrors).length === 0) {
            // Submit the form data to the API using POST method
            fetch('https://sihire-be.vercel.app/api/users/add-user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => {
                if (response.ok) {
                    console.log('User added successfully');
                    // Reset form data
                    setFormData({
                        email: '',
                        username: '',
                        name: '',
                        role: ''
                    });
                } else {
                    throw new Error('Failed to add user');
                }
            })
            .catch(error => {
                console.error('Error adding user:', error);
            });
        }
    };

    const darkBlueText = {
        color: 'var(--WF-Base-800, #2D3648)',
        fontFamily: 'Inter, sans-serif',
    };

    const containerStyle = {
        backgroundColor: "#F2F2F2"
    };

    const dividerStyle = {
        borderTop: '1px solid #2D3648',
        borderBottom: '2px solid #2D3648',
        marginTop: '5px',
        marginBottom: '5px',
    };

    return (
        <div className="container mx-auto" style={containerStyle}>
            <div className="px-5" style={{paddingTop: '80px', paddingBottom: '15px'}}>
                <h1 className="text-3xl font-bold" style={darkBlueText}>Manage User</h1>
            </div>
            <hr className="divider" style={dividerStyle}></hr>
            <div className="min-h-screen py-8">
                <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-4 text-center" style={darkBlueText}>Add User</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium" style={darkBlueText}>Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`mt-1 p-2 block w-full border ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium" style={darkBlueText}>Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium" style={darkBlueText}>Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="role" className="block text-sm font-medium" style={darkBlueText}>Role</label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select Role</option>
                                <option value="General Affairs">General Affairs</option>
                                <option value="Project Manager">Project Manager</option>
                                <option value="Director">Director</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                        <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-indigo-800 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                            style={{ background: 'var(--WF-Base-800, #2D3648)' }}
                        >
                            Add User
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddUser;
