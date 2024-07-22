import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { setIsSignupOpen, setIsLoginOpen } from '../../../Slices/Reducers/features.js'
import { setCredentials } from "../../../Slices/Reducers/authSlice.js";
import { useRegisterMutation } from "@/Slices/customHooks/authHooks.js";
const RegisterScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { mutateAsync: register } = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
        } else {
            try {
                const res = await register({ name, email, password });
                dispatch(setCredentials({ ...res }));
                navigate('/');
                dispatch(setIsSignupOpen(false));
                toast.success("Registration successful.");
            } catch (err) {
                toast.error(err?.data?.message || err.message);
            }
        }
    };

    const switchToLogin = () => {
        dispatch(setIsSignupOpen(false));
        setTimeout(() => dispatch(setIsLoginOpen(true)), 200);
    };

    return (
        <div className="p-2">
            <div className="text-center"> <h1 className="text-4xl font-bold ">Join PrimeKart</h1>
                <p className="text-gray-500">Get ready to explore wide variety of Products.</p></div>

            <Form onSubmit={submitHandler} className="font-bold">
                <FormGroup className="my-2" controlId="name">
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control type="text" value={name} placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
                </FormGroup>
                <FormGroup className="my-2" controlId="email">
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control type="email" value={email} placeholder="Enter Email...." onChange={(e) => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup className="my-2" controlId="password">
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control type="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                </FormGroup>
                <FormGroup className="my-2" controlId="confirmPassword">
                    <Form.Label>
                        Confirm Password
                    </Form.Label>
                    <Form.Control type="password" value={confirmPassword} placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
                </FormGroup>
                <button type="submit" className="mt-3 bg-black_100 text-white p-2 w-full rounded-md text-lg">
                    Sign Up
                </button>
                <p>Already have an account? <span className="text-blue-600 cursor-pointer" onClick={switchToLogin}>Login</span></p>
            </Form>
        </div>
    )
}

export default RegisterScreen;