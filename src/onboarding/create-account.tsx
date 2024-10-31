import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../schema';
import { SignupFormData } from '../interface';


const SignupForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });
    const [serverError, setServerError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: SignupFormData) => {
        setIsLoading(true);
        setServerError(null); // Clear previous errors

        try {
            const response = await fetch("https://yourapi.com/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to create account. Please try again.");
            }

            // On successful response, navigate or show a success message
            alert("Account created successfully!"); // Replace with navigation logic if needed
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setServerError(error?.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-[100%] h-[100vh] flex items-center justify-center flex-col p-6 bg-white">
            <div className='w-[40%] h-[300px]'>
                <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="w-[100%] flex flex-col gap-[20px]">
                    <div className='w-full flex flex-col items-center '>
                        <label htmlFor="email" className="w-[100%] flex justify-start text-sm font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register("email")}
                            className="w-full mt-1 p-2 border rounded"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className='w-full flex flex-col items-center '>
                        <label htmlFor="username" className="w-[100%] flex justify-start text-sm font-medium">Username</label>
                        <input
                            type="text"
                            id="username"
                            {...register("username")}
                            className="w-full mt-1 p-2 border rounded"
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </div>

                    <div className='w-full flex flex-col items-center '>
                        <label htmlFor="password" className="w-[100%] flex justify-start text-sm font-medium">Password</label>
                        <input
                            type="password"
                            id="password"
                            {...register("password")}
                            className="w-full mt-1 p-2 border rounded"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

                    <button
                        type="submit"
                        className="w-full p-2 mt-4 bg-blue-500 text-white rounded"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
