import React, { useState } from 'react';

function AddUser() {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        name: '',
        phone: '',
        role: ''
    });

    const [errors, setErrors] = useState({});
    
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
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(data => {
                if (data && data.error) {
                    const errorMessage = data.error;
                    // Show error message
                    showError(errorMessage);
                } else {
                    // Show success message
                    showSuccess('Berhasil menambahkan user');
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
                showError(errorMessage);
            });
        }
    };
    
    const showError = (errorMessage) => {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('font-regular', 'relative', 'block', 'w-full', 'rounded-lg', 'bg-red-500', 'p-4', 'text-base', 'leading-5', 'text-white', 'opacity-100', 'fixed', 'top-0', 'left-0', 'z-50', 'mt-4');
        errorDiv.setAttribute('data-dismissible', 'alert');
        errorDiv.innerHTML = `
            <div class="mr-12">${errorMessage}</div>
            <div class="absolute top-2.5 right-3 w-max rounded-lg transition-all hover:bg-white hover:bg-opacity-20" data-dismissible-target="alert">
                <button role="button" class="w-max rounded-lg p-1" data-alert-dimissible="true">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;
        document.body.insertBefore(errorDiv, document.body.firstChild);
    
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Set timeout to remove error message after 8 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 3500);
    
        // Event listener to remove error message if clicked anywhere on the screen
        document.addEventListener('click', () => {
            errorDiv.remove();
        });
    };
    
    const showSuccess = (successMessage) => {
        // Show success message in green popup
        const successDiv = document.createElement('div');
        successDiv.classList.add('font-regular', 'relative', 'block', 'w-full', 'rounded-lg', 'bg-green-500', 'p-4', 'text-base', 'leading-5', 'text-white', 'opacity-100', 'fixed', 'top-0', 'left-0', 'z-50', 'mt-4');
        successDiv.setAttribute('data-dismissible', 'alert');
        successDiv.innerHTML = `
            <div class="mr-12">${successMessage}</div>
            <div class="absolute top-2.5 right-3 w-max rounded-lg transition-all hover:bg-white hover:bg-opacity-20" data-dismissible-target="alert">
                <button role="button" class="w-max rounded-lg p-1" data-alert-dimissible="true">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;
        document.body.insertBefore(successDiv, document.body.firstChild);

        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Set timeout to remove success message after 8 seconds
        setTimeout(() => {
            successDiv.remove();
            window.location.href = 'https://sihire.vercel.app/manage-user';
        }, 3500);

        // Event listener to remove success message if clicked anywhere on the screen
        document.addEventListener('click', () => {
            successDiv.remove();
            window.location.href = 'https://sihire.vercel.app/manage-user';
        });
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
            <div className="px-5" style={{paddingTop: '20px', paddingBottom: '15px'}}>
                <h1 className="text-3xl font-bold" style={darkBlueText}>Manage User</h1>
            </div>
            <hr className="divider" style={dividerStyle}></hr>
            <div className="min-h-screen py-8">
                <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
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
    );
}

export default AddUser;
