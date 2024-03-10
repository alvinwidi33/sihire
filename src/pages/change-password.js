import React, { useState, useEffect } from 'react';

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
            const response = await fetch('http://127.0.0.1:8000/api/users/change-password/', {
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

    return (
        <div className="Login">
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Change Password
                            </h1>
                            <form onSubmit={handleLogin} method="post">
                                <div>
                                    <label htmlFor="old_password" className="block mb-2 text-sm font-medium text-gray-900">Old Password</label>
                                    <input type="password" name="old_password" id="old_password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password2" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                                    <input type="password" name="password2" id="password2" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full my-4 text-white bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Change Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ChangePassword;