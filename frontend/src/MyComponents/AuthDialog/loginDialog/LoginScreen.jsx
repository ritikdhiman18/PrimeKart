import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form, FormGroup } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { setIsSignupOpen, setIsLoginOpen, setLoading } from '../../../Slices/Reducers/features.js'
import { setCredentials } from "../../../Slices/Reducers/authSlice.js";
import { useLoginMutation } from "@/Slices/customHooks/authHooks.js";

const LoginScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginMutation = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const result = await loginMutation.mutateAsync({ email, password });
            dispatch(setCredentials(result));
            dispatch(setLoading(false));
            toast.success("Sign-In successful.");
            dispatch(setIsLoginOpen(false));
        } catch (err) {
            toast.error("Enter correct details or check server.");
            dispatch(setLoading(false));
        }
    };

    const switchToSignup = () => {
        dispatch(setIsLoginOpen(false));
        dispatch(setIsSignupOpen(true));
    };
    return (
        <>
            <div className="flex flex-col justify-center px-4 font-bold">
                <h1 className="text-black text-4xl font-extrabold flex gap-2 items-center ">Welcome Back to PrimeKart...</h1>
                <Form onSubmit={submitHandler}>
                    <FormGroup className="my-2" controlId="email">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3"
                        >
                            <Form.Control type="email" value={email} placeholder="Enter Email...." onChange={(e) => setEmail(e.target.value)} />
                        </FloatingLabel>
                    </FormGroup>
                    <FormGroup className="my-2" controlId="password">
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                        </FloatingLabel>
                    </FormGroup>
                    <button type="submit" className="mt-3 text-white bg-black_100 text-xl px-3 py-2 rounded-md w-full">
                        Sign In
                    </button>
                    <p>Don't have an account? <span className="text-blue-600 cursor-pointer" onClick={switchToSignup}>Sign Up</span></p>
                </Form>
            </div>
        </>)
}

export default LoginScreen;