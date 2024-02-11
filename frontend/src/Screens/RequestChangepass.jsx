import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendChangePassword } from '../actions/userActions';

const RequestChangepass = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error } = userLogin;

    const submitHandler = (e) => {
        e.preventDefault();
        // If email is not valid, do not proceed
        if (!validEmail) {
            console.log('Invalid email');
            return;
        }
        // Dispatch action to send change password request
        dispatch(sendChangePassword(email, password, password2));
    };

    // Function to validate email format
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    // Function to check if email is associated with an active account (dummy implementation)
    const checkEmailValidity = () => {
        // Make a call to your backend to verify email validity
        // For demonstration purposes, assume it's valid
        setValidEmail(true);
    };

    const handleEmailChange = (e) => {
        const { value } = e.target;
        setEmail(value);
        if (validateEmail(value)) {
            checkEmailValidity(); // Check email validity when it's valid
        } else {
            setValidEmail(false); // Reset validity if email format is invalid
        }
    };

    return (
        <div>
            <h2>Request Password Change</h2>
            {error && <p>Error: {error}</p>}
            {loading && <p>Loading...</p>}
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    {!validEmail && email && <p>Email is not valid or associated with an active account</p>}
                </div>
                {validEmail && (
                    <>
                        <div>
                            <label htmlFor="password">New Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password2">Confirm Password</label>
                            <input
                                type="password"
                                id="password2"
                                placeholder="Confirm new password"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                        </div>
                    </>
                )}
                {validEmail && <button type="submit">Submit</button>}
            </form>
        </div>
    );
};

export default RequestChangepass;
