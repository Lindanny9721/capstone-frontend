import Login from "../components/Login";
import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="login">
            <Login/>
            <Link to='/signup'> Don't have a account?</Link>
        </div>
    );
}