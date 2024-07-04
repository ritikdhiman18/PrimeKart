import { useState, useEffect } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-hot-toast';
import { setCredentials } from "../Slices/authSlice.js";
import { useUpdateUserMutation } from '../Slices/apiSlice.js'

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const [updateProfile, { isLoading }] = useUpdateUserMutation()
    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.setEmail, userInfo.setName])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmpassword] = useState('')
    const submitHandler = async (e) => {
        debugger
        e.preventDefault();
        if (password !== confirmpassword || password === "") {
            toast.error("Please enter password.", { autoClose: 800 })
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password
                }).unwrap();
                dispatch(setCredentials({ ...res }))
                toast.success('Profile Updated.', { autoClose: 800 })
            } catch (err) {
                toast.error(err?.data?.message || err.message, { autoClose: 800 })
            }
        }
    }
    return (
        <div>
            <h1>Update Profile</h1>
            <Form onSubmit={submitHandler}>
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
                    <Form.Control type="password" value={confirmpassword} placeholder="Confirm password" onChange={(e) => setConfirmpassword(e.target.value)} />
                </FormGroup>
                <Button type="submit" varient="primary" className="mt-3">
                    Update
                </Button>
            </Form>
        </div>
    )
}

export default ProfileScreen;