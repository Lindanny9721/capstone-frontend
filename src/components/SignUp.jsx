import { useState } from "react";
import axios from "axios";
const SignUp = () => {
  const [userData, setUserData] = useState({
    username: '',
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
        console.log(userData);
        if (!userData.username || !userData.email || !userData.password) {
            setError('All fields are required.');
            return;
        }
        setError('');
        try {
            const response = await axios.post('http://localhost:4000/users/signup', userData);
            console.log(response.data);
        } catch (error) {
            console.log(error.response);
            setError(error.response.data.error);
        }
    };

    return (
        <div>
        <h2>Sign Up</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                value={userData.username}
                onChange={handleChange}
                placeholder="Enter a username"
            />
            </div>

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

            <button type="submit">Sign Up</button>
        </form>
        </div>
    );
};

export default SignUp;
