import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarAdmin from '../components/sidebar-admin';
import SidebarApplicant from '../components/sidebar-applicant';
import SidebarGA from "../components/sidebar-ga";
import SidebarOther from '../components/sidebar-other';

function EditMyProfile() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const [profileData, setProfileData] = useState(null);

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
        setProfileData({ ...profileData, [name]: value });
    };

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch('https://sihire-be.vercel.app/api/users/logged-in/', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Token ' + window.localStorage.getItem("token")
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                } else {
                    console.error('Failed to fetch profile data');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, []);

    const saveProfileChanges = async (e) => {
        try {
            const response = await fetch('https://sihire-be.vercel.app/api/users/edit-my-profile/', {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Token ' + window.localStorage.getItem("token"),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'name': profileData.name,
                    'phone': profileData.phone,
                    'foto': profileData.foto
                })
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Profile successfully updated: ' + data);
                navigate('/my-profile');
            } else {
                console.error('Failed to update profile data');
            }
        } catch (error) {
            console.error('Error updating profile data:', error);
        }
    };

    const darkBlueText = {
        color: 'var(--WF-Base-800, #2D3648)',
        fontFamily: 'Inter, sans-serif',
    };

    const profilePictureStyle = {
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        backgroundColor: '#F2F2F2',
        margin: '0 auto',
        backgroundImage: profileData?.foto ? `url(${profileData.foto})` : 'url(https://cdn-icons-png.flaticon.com/512/709/709699.png)',
        backgroundSize: 'cover',
    };

    const profileInfoStyle = {
        textAlign: 'left',
        marginTop: '20px',
    };

    let marginTop = "-180px";

    if (profileData?.role === "General Affairs") {
        marginTop = "-280px";
    } else if (profileData?.role === "Applicant") {
        marginTop = "-180px";
    } else if (profileData?.role === "Admin") {
        marginTop = "-100px";
    } else {
        marginTop = "-220px";
    }

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
                My Profile
            </p>
            {profileData && (
                <>
                    {profileData.role === "General Affairs" && <SidebarGA />}
                    {profileData.role === "Applicant" && <SidebarApplicant />}
                    {profileData.role === "Admin" && <SidebarAdmin />}
                    {profileData.role !== "General Affairs" && profileData.role !== "Applicant" && profileData.role !== "Admin" && <SidebarOther />}
                </>
            )}

            <div
                style={{ marginLeft: "22%", position: "absolute", marginTop: marginTop }}
                className="w-9/12"
            >
                <div
                    className="container mx-auto"
                    style={{marginLeft: '-15%'}}
                >
                    {profileData && (
                        <div className="flex flex-col items-center">
                            <div className="flex justify-center items-center space-x-4">

                                <div className="flex-row justify-center items-center">
                                    <div className='flex flex-col items-center' style={profilePictureStyle}></div>
                                    <div className='flex flex-col items-center'>
                                        <div className="">
                                            <button
                                                className="text-blue-500 hover:text-blue-700 rounded-md"
                                                style={{ fontSize: '1rem' }}
                                                onClick={() => {saveProfileChanges()}}
                                            >
                                                ✎ Ubah Foto
                                            </button>
                                        </div>
                                        <div className="">
                                                <button
                                                    className="text-red-500 hover:text-red-700 rounded-md"
                                                    style={{ fontSize: '1rem' }}
                                                >
                                                    Hapus Foto
                                                </button>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className="flex flex-col justify-center">
                                    <h6 className="font-bold text-2xl" style={darkBlueText}>{profileData.username}</h6>
                                    <div style={profileInfoStyle}>
                                        <div className="flex flex-col">
                                            <div className="flex mb-4">
                                                <div className="w-20">
                                                    <p className="font-bold">Nama</p>
                                                </div>
                                                <div className='ml-2'>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        value={profileData.name}
                                                        onChange={handleChange}
                                                        required
                                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex mb-4">
                                                <div className="w-20">
                                                    <p className="font-bold">Email</p>
                                                </div>
                                                <div className='ml-2'>
                                                    <p>{profileData.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-20">
                                                    <p className="font-bold">No Telpon</p>
                                                </div>
                                                <div className='ml-2'>
                                                    <input
                                                        type="text"
                                                        id="phone"
                                                        name="phone"
                                                        value={profileData.phone}
                                                        onChange={handleChange}
                                                        required
                                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                                    <p className="text-sm text-gray-500 mt-1">Contoh: 08123456789</p>
                                                </div>
                                            </div>
                                            <div className="flex mb-4">
                                                <div className="w-20">
                                                    <p className="font-bold">Password</p>
                                                </div>
                                                <div className='ml-2'>
                                                    <a href="/change-password" className='text-blue-500 hover:text-blue-700'>
                                                        Ubah Password
                                                    </a>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end mt-4 mr-10">
                        
                        <div className="mr-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                                style={{ background: 'var(--WF-Base-800, #2D3648)', fontSize: '1rem' }}
                                onClick={() => {saveProfileChanges()}}
                            >
                                Simpan
                            </button>
                        </div>
                        <div className="mr-4">
                            <a href='/my-profile'>
                                <button
                                    className="bg-red-700 text-white py-2 px-4 rounded-md"
                                    style={{ fontSize: '1rem' }}
                                >
                                    Batalkan
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default EditMyProfile;
