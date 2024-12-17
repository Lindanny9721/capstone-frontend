import { Link } from "react-router-dom";
import SignUp from "../components/SignUp";

export default function SignUpPage() {
    return (
        <div className="login">
            <SignUp/>
            <Link to='/login'> Have an have a account?</Link>
        </div>
    );
}