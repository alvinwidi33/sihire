const Register = () => {
    return (
        <div className="Register">
                <section className="pt-20 bg-gray-50">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create an Account
                            </h1>
                            <form action="http://127.0.0.1:8000/api/users/register/" method="post">
                            <div>
                                <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                Email
                                </label>
                                <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Type your email"
                                required=""
                                />
                            </div>
                            <div>
                                <label
                                htmlFor="username"
                                className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                Username
                                </label>
                                <input
                                type="username"
                                name="username"
                                id="username"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Type your username"
                                required=""
                                />
                            </div>
                            <div>
                                <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                Name
                                </label>
                                <input
                                type="name"
                                name="name"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Type your name"
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
                            <div>
                                <label
                                htmlFor="password2"
                                className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                Confirm password
                                </label>
                                <input
                                type="password2"
                                name="password2"
                                id="password2"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required=""
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full my-4 text-white bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Create an account
                            </button>
                            <p className="text-sm font-light text-gray-500">
                                Already have an account?{" "}
                                <a
                                href="/login"
                                className="font-medium text-primary-600 hover:underline"
                                >
                                Login here
                                </a>
                            </p>
                            </form>
                        </div>
                        </div>
                    </div>
                    </section>
        </div>
    );
}
 
export default Register;