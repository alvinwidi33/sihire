import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SidebarAdmin from '../components/sidebar-admin';
import NotificationPopup from '../components/popupNotification';

function EditRoleUser(props) {
    const { id } = useParams();
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
    const [deleteSuccessVisible, setDeleteSuccessVisible] = useState(false);
    const [editSuccessVisible, setEditSuccessVisible] = useState(false);

    const darkBlueText = {
        color: 'var(--WF-Base-800, #2D3648)',
        fontFamily: 'Inter, sans-serif',
    };

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        name: '',
        phone: '',
        role: ''
    });

    useEffect(() => {
        fetch(`https://sihire-be.vercel.app/api/users/get-user-by-id/${id}/`, {
            headers: {
                'Authorization': 'Token ' + window.localStorage.getItem("token")
            }
        })
            .then(response => response.json())
            .then(data => {
                setFormData({
                    email: data.email,
                    username: data.username,
                    name: data.name,
                    phone: data.phone,
                    role: data.role
                });
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, [id]);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`https://sihire-be.vercel.app/api/users/edit-user-role/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + window.localStorage.getItem("token")
            },
            body: JSON.stringify({ role: formData.role }),
        })
        .then(response => {
            if (response.ok) {
                setEditSuccessVisible(true);
                navigate("/manage-user");
            } else {
                throw new Error('Failed to update role');
            }
        })
        .then(data => {
            // Handle success response
            console.log('Role updated successfully:', data);
        })
        .catch(error => console.error('Error updating role:', error));
    };

    const handleDeleteUser = () => {
        setDeleteConfirmationVisible(true);
    };

    const handleConfirmDelete = () => {
        fetch(`https://sihire-be.vercel.app/api/users/delete-user/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Token ' + window.localStorage.getItem("token")
            },
        })
        .then(response => {
            if (response.ok) {
                setDeleteSuccessVisible(true);
                console.log('User deleted successfully');
            } else {
                console.error('Failed to delete user');
            }
        })
        .catch(error => console.error('Error deleting user:', error));
    };

    const handleCancelDelete = () => {
        setDeleteConfirmationVisible(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
            Manage User
        </p>
        <SidebarAdmin />
        <div
            style={{ marginLeft: "22%", position: "absolute", marginTop: "-160px" }}
            className="w-9/12"
        >
        <div className="container mx-auto">
            <div className="min-h-screen py-8">
                <div
                    className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
                    style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4)' }}
                >
                    <h2 className="text-lg font-semibold mb-4 text-center" style={darkBlueText}>Edit User</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium" style={darkBlueText}>Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                disabled
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium" style={darkBlueText}>Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                disabled
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium" style={darkBlueText}>Nama</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                disabled
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium" style={darkBlueText}>Nomor Telepon</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                disabled
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
                                Update User
                            </button>
                        </div>
                        <div className="mt-6">
                            <button
                                className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-indigo-700"
                                onClick={handleDeleteUser}
                            >
                                Delete User
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
        {/* Confirmation popup for delete action */}
        <NotificationPopup
                isVisible={deleteConfirmationVisible}
                onAccept={handleConfirmDelete}
                onClose={handleCancelDelete}
                popupText="Apakah Anda yakin ingin menghapus user ini?"
                needsConfirmation
                acceptText="Ya"
                declineText="Tidak"
        />
        {/* Success popup
        <NotificationPopup
            isVisible={editSuccessVisible}
            successIcon
            onClose={() => {
                setEditSuccessVisible(false);
                navigate('/manage-user');
            }}
            popupText='Role berhasil diupdate'
            needsConfirmation={false}
        />
        <NotificationPopup
            isVisible={deleteSuccessVisible}
            successIcon
            onClose={() => {
                setDeleteSuccessVisible(false);
                setDeleteConfirmationVisible(false);
                navigate('/manage-user');
            }}
            popupText='User berhasil dihapus'
            needsConfirmation={false}
        /> */}
    </React.Fragment>
    );
}

export default EditRoleUser;
