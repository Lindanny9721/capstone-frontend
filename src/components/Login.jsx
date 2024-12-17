import { useState } from "react";
import axios from "axios";
const Login = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
});
    const [error, setError] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
        ...userData,
        [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userData.email || !userData.password) {
        setError('Both email and password are required.');
        return;
        }
        setError('');
        try {
            const response = await axios.post('http://localhost:4000/users/login', userData);
            console.log(response.data);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error);
            }
        }
    };

    return (
        <div>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Enter your email"
            />
            </div>

            <div>
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Enter your password"
            />
            </div>

            <button type="submit">Login</button>
        </form>
        </div>
    );
};

export default Login;
