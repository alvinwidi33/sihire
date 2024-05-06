import { createClient } from "@supabase/supabase-js";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import SidebarAdmin from '../components/sidebar-admin';
import SidebarApplicant from '../components/sidebar-applicant';
import SidebarGA from "../components/sidebar-ga";
import SidebarOther from '../components/sidebar-other';
import NotificationPopup from '../components/popupNotification';

function EditMyProfile() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [editSuccessVisible, setEditSuccessVisible] = useState(false);
    const cdnURL = "https://lwchpknnmkmpfbkwcrjs.supabase.co/storage/v1/object/public/sihire-profilepicture/"

    const [profileData, setProfileData] = useState({
        username: '',
        role: '',
        name: '',
        email: '',
        phone: '',
        foto: '',
    });
    const [profilePictureURL, setProfilePictureURL] = useState(undefined);

    const supabase = createClient(
        "https://lwchpknnmkmpfbkwcrjs.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3Y2hwa25ubWttcGZia3djcmpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4Njc3MTQsImV4cCI6MjAyOTQ0MzcxNH0.J7OHUVBFnaRF5b_cpX3LEYfD3uFSrzz6_DnCK3pfPHU"
    );

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
                    setProfileData({
                        ...profileData,
                        username: data.username,
                        role: data.role,
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        foto: data.foto,
                    });

                    setProfilePictureURL(data.foto)
                    
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

            const formData = new FormData();
            formData.append('name', profileData.name);
            formData.append('phone', profileData.phone);
            if (profilePictureURL !== profileData.foto) {
                formData.append('foto', profilePictureURL);
            }

            const response = await fetch('https://sihire-be.vercel.app/api/users/edit-my-profile/', {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Token ' + window.localStorage.getItem("token"),
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Profile successfully updated: ' + data[0]);
                setEditSuccessVisible(true);
                setTimeout(() => {
                    setEditSuccessVisible(false);
                    navigate('/my-profile');
                }, 5000); // 5 seconds delay
            } else {
                console.error('Failed to update profile data');
            }
        } catch (error) {
            console.error('Error updating profile data:', error);
        }
    };

    const handleUbahFoto = async (e) => {
        const file = e.target.files[0]; // Get the file from input
        
        const { data, error } = await supabase
            .storage
            .from("sihire-profilepicture")
            .upload(profileData.username + "/" + uuidv4(), file, {
                cacheControl: '3600', // Cache for 1 hour
                upsert: false, // If the file already exists, don't overwrite it
                contentType: 'image/*', // Change to the appropriate content type
            });
        
        if (data) {
            setImageUrl();
        }
        
    };

    const setImageUrl = async () => {
        const { data, error } = await supabase
            .storage
            .from("sihire-profilepicture")
            .list(profileData?.username + "/", {
                limit: 1,
                offset: 0,
                sortBy: { column: "created_at", order: "desc"}
            });
        
            if (data != null) {
                setProfilePictureURL(cdnURL + profileData.username + "/" + data[0].name);
            }
            else {
                console.log("error loading images " + error);
            }
    }

    const handleHapusFoto = async (e) => {
        setProfilePictureURL("");
    }
    
    

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
                                    {profilePictureURL ? (
                                        <img src={profilePictureURL} alt="Profile Pic" style={profilePictureStyle} className='flex flex-col items-center'/>
                                    ) : (
                                        <img src="https://cdn-icons-png.flaticon.com/512/709/709699.png" alt="Profile Pic" style={profilePictureStyle} className='flex flex-col items-center'/>
                                    )}
                                    <div className='flex flex-col items-center mt-2'>
                                        <div className="">
                                            <div className="flex flex-col items-center">
                                                <label htmlFor="foto" className="text-blue-500 hover:text-blue-700 rounded-md" style={{ fontSize: '1rem', cursor: 'pointer' }}>
                                                    ✎ Ubah Foto
                                                </label>
                                                <input
                                                    type="file"
                                                    id="foto"
                                                    name="foto"
                                                    onChange={handleUbahFoto}
                                                    className="invisible"
                                                />
                                            </div>
                                        </div>
                                        <div style={{marginTop: '-25px'}}>
                                                <button
                                                    className="text-red-500 hover:text-red-700 rounded-md"
                                                    style={{ fontSize: '1rem' }}
                                                    onClick={handleHapusFoto}
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
                    {/* <button
                        className="bg-red-700 text-white py-2 px-4 rounded-md"
                        style={{ fontSize: '1rem' }}
                        onClick={(e) => {
                            console.log(profileData)
                            console.log(profilePictureURL)
                        }}
                    >
                        console log
                    </button> */}
                </div>
            </div>
            {/* Success popup */}
            <NotificationPopup
                isVisible={editSuccessVisible}
                successIcon
                onClose={() => {
                    setEditSuccessVisible(false);
                    navigate('/my-profile');
                }}
                popupText='Profil berhasil diupdate'
                needsConfirmation={false}
            />
        </React.Fragment>
    );
}

export default EditMyProfile;
