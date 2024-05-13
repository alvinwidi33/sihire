import React, { useState, useEffect } from 'react';
import SidebarGA from "../components/sidebar-ga";
import SidebarApplicant from '../components/sidebar-applicant';
import SidebarOther from '../components/sidebar-other';
import SidebarAdmin from '../components/sidebar-admin';
import SidebarDirector from '../components/sidebar-director';
import { Link } from 'react-router-dom';

const ChangePassword = () => {
      
    const handleLogin = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const loginData = {
            old_password: formData.get('old_password'),
            password: formData.get('password'),
            password2: formData.get('password2'),
        };

        try {
            const response = await fetch('https://sihire-be.vercel.app/api/users/change-password/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + window.localStorage.getItem("token"),
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                var json_response = await response.json();
                console.log('Change password successful');
                window.location.href = "/my-profile";
            } else {
                console.error('Change password failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    let marginTop = "-240px";

    if (window.localStorage.getItem("role") === "General Affairs") {
        marginTop = "-450px";
    } else if (window.localStorage.getItem("role") === "Applicant") {
        marginTop = "-350px";
    } else if (window.localStorage.getItem("role") === "Admin") {
        marginTop = "-270px";
    } else if (window.localStorage.getItem("role") === "Director") {
        marginTop = "-450px";
    } else {
        marginTop = "-380px";
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
            {window.localStorage.getItem("role") && (
                <>
                    {window.localStorage.getItem("role") === "General Affairs" && <SidebarGA />}
                    {window.localStorage.getItem("role") === "Applicant" && <SidebarApplicant />}
                    {window.localStorage.getItem("role") === "Admin" && <SidebarAdmin />}
                    {window.localStorage.getItem("role") === "Director" && <SidebarDirector />}
                    {window.localStorage.getItem("role") === "Project Manager" && <SidebarOther />}
                </>
            )}

            {/* Breadcrum */}
            <div
                className='container mx-auto'
            >
            <div
                        className="flex flex-row items-center"
                        style={{marginLeft: '240px', marginTop: '-200px'}}
                    >
                        <Link
                        to="/my-profile"
                        style={{
                            textDecoration: "none",
                            color: "#2A3E4B",
                            cursor: "pointer",
                        }}
                        >
                            <p style={{ display: "inline", marginLeft: "4px" }}>Profil Diri</p>
                        </Link>
                        <span style={{ display: "inline", marginLeft: "10px" }}>{">"}</span>
                        <Link
                        to={"/edit-my-profile"}
                        style={{
                            textDecoration: "none",
                            color: "#2A3E4B",
                            cursor: "pointer",
                        }}
                        >
                            <p style={{ display: "inline", marginLeft: "10px" }}>
                                Edit Profil
                            </p>
                        </Link>
                        <span style={{ display: "inline", marginLeft: "10px" }}>{">"}</span>
                        <Link
                        to={"/change-password"}
                        style={{
                            textDecoration: "none",
                            color: "#2A3E4B",
                            cursor: "pointer",
                        }}
                        >
                            <p style={{ display: "inline", marginLeft: "10px" }}>
                                Ubah Password
                            </p>
                        </Link>
                    </div>
                    
                    {/* Main Part */}
                    

            {/* <div
                style={{ marginLeft: "22%", position: "absolute", marginTop: marginTop }}
                className="w-9/12"
            > */}
            <div className="min-h-screen">
        <div className="Login">
            <section className="">
                <div className="flex flex-col items-center justify-center mt-10 ml-48">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Ubah Password
                            </h1>
                            <form onSubmit={handleLogin} method="post">
                                <div>
                                    <label htmlFor="old_password" className="block mb-2 text-sm font-medium text-gray-900">Password Lama</label>
                                    <input type="password" name="old_password" id="old_password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password Baru</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password2" className="block mb-2 text-sm font-medium text-gray-900">Konfirmasi Password Baru</label>
                                    <input type="password" name="password2" id="password2" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full my-4 text-white bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Ubah Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </div>
        </div>
        </React.Fragment>
    );
};

export default ChangePassword;