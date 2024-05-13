import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NotificationPopup from '../components/popupNotification';
import SidebarAdmin from '../components/sidebar-admin';

function AddUser() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        name: '',
        phone: '',
        role: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Perform validation for phone number
        if (name === 'phone' && !/^\d+$/.test(value)) {
            setErrors({ ...errors, phone: 'Phone number must contain only numbers' });
        } else if (name === 'phone' && !value.startsWith('08')) {
            setErrors({ ...errors, phone: 'Phone number must start with "08"' });
        } else {
            setErrors({ ...errors, [name]: undefined }); // Clear phone error if validation passes
        }
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form validation
        const validationErrors = {};
        if (!formData.email || !formData.email.includes('@')) {
            validationErrors.email = 'Please enter a valid email address';
        }
        if (!formData.phone) {
            validationErrors.phone = 'Please enter a phone number';
        }
        setErrors(validationErrors);
        // If there are no errors, submit the form
        if (Object.keys(validationErrors).length === 0) {
            // Submit the form data to the API using POST method
            fetch('https://sihire-be.vercel.app/api/users/add-user/', {
                method: 'POST',
                headers: {
                    'Authorization': "Token " + window.localStorage.getItem("token"),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(data => {
                if (data && data.error) {
                    const errorMessage = data.error;
                    // Show error message
                    setErrorMessage(errorMessage);
                    setShowError(true);
                } else {
                    // Show success message
                    setSuccessMessage('Berhasil menambahkan user');
                    setShowSuccess(true);
                    // Reset form data
                    setFormData({
                        email: '',
                        username: '',
                        phone: '',
                        name: '',
                        role: ''
                    });
                }
            })
            .catch(error => {
                console.error('Error adding user:', error);
                const errorMessage = 'Failed to add user. Please try again later.';
                // Show error message
                setErrorMessage(errorMessage);
                setShowError(true);
            });
        }
    };

    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => {
                setShowSuccess(false);
                navigate('/manage-user');
            }, 5000); // 5 seconds
            return () => clearTimeout(timer);
        }
    }, [showSuccess, navigate]);

    const darkBlueText = {
        color: 'var(--WF-Base-800, #2D3648)',
        fontFamily: 'Inter, sans-serif',
    };

    return (
        <React.Fragment>
        <p
            style={{
            marginLeft: "22%",
            fontWeight: "bold",
            fontSize: "32px",
            color: "#2A3E4B",
            position: "absolute",
            }}
        >
            Manage Users
        </p>
        <SidebarAdmin />

        <div
            style={{ marginLeft: "22%", position: "absolute", marginTop: "-160px" }}
            className="w-9/12"
        >
        <div className="container mx-auto">
            {/* Breadcrum */}
            <div
                className="flex flex-row items-center mb-2"
                style={{marginTop: '-40px'}}
            >
                <Link
                to="/manage-user"
                style={{
                    textDecoration: "none",
                    color: "#2A3E4B",
                    cursor: "pointer",
                }}
                >
                    <p style={{ display: "inline", marginLeft: "4px" }}>Manage Users</p>
                </Link>
                <span style={{ display: "inline", marginLeft: "10px" }}>{">"}</span>
                <Link
                to={"/add-user"}
                style={{
                    textDecoration: "none",
                    color: "#2A3E4B",
                    cursor: "pointer",
                }}
                >
                    <p style={{ display: "inline", marginLeft: "10px" }}>
                        Tambah User
                    </p>
                </Link>
            </div>
            
            {/* Main Part */}
            
            <div className="min-h-screen py-8">
                <div
                    className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
                    style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4)'}}
                >
                    <h2 className="text-lg font-semibold mb-4 text-center" style={darkBlueText}>Add User</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium" style={darkBlueText}>Email <span className="text-red-500">*</span></label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required // Added required attribute
                                className={`mt-1 p-2 block w-full border ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium" style={darkBlueText}>Username <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required // Added required attribute
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium" style={darkBlueText}>Nama <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required // Added required attribute
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium" style={darkBlueText}>Nomor Telepon <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required // Added required attribute
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            <p className="text-sm text-gray-500 mt-1">Contoh: 08123456789</p>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="role" className="block text-sm font-medium" style={darkBlueText}>Role <span className="text-red-500">*</span></label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required // Added required attribute
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Pilih Role</option>
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
        </div>
        <NotificationPopup
                isVisible={showSuccess || showError}
                onClose={() => {
                    setShowSuccess(false);
                    setShowError(false);
                    if (showSuccess) {
                        navigate('/manage-user');                    }
                }}
                popupText={showSuccess ? successMessage : errorMessage}
                successIcon={showSuccess}
                errorIcon={showError}
                needsConfirmation={false}
        />
        </React.Fragment>
    );
}

export default AddUser;
