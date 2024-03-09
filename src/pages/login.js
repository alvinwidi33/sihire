import { useNavigate } from 'react-router-dom';

const Login = () => {
    const handleLogin = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const loginData = {
            login: formData.get('login'),
            password: formData.get('password'),
        };

        try {
            const response = await fetch('https://sihire-be.vercel.app/api/users/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
            
            if (response.ok) {
                var json_response = await response.json();
                window.localStorage.setItem("token", json_response.token);
                console.log('Login successful');
                console.log("ayamayam",json_response)
                if(json_response.role ==="Applicant"){
                    window.location.href = "/job-list-applicant/";
                } else if (json_response.role ==="Director"){
                    window.location.href = "/job-list-other/";
                } else if (json_response.role ==="General Affairs"){
                    window.location.href = "/job-list-other/";
                } else if (json_response.role ==="Project Manager"){
                    window.location.href = "/job-list-other/";
                } else if (json_response.role ==="Admin"){
                    window.location.href = "/manage-user/";
                }   
            } else {
                console.error('Login failed:', response.statusText);
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
                                Log In
                            </h1>
                            <form onSubmit={handleLogin} method="post">
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Username/Email
                                    </label>
                                    <input
                                        type="login"
                                        name="login"
                                        id="login"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="Type your username/email"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required=""
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full my-4 text-white bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Log In
                                </button>
                                <p className="text-sm font-light text-gray-500">
                                    Don't have an account?{" "}
                                    <a
                                        href="/register"
                                        className="font-medium text-primary-600 hover:underline"
                                    >
                                        Register here
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;