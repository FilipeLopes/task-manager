//CSS
import "./Register.css";

//Hooks
import { useState } from "react";

type Props = {}

const Register = (props: Props) => {

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(confirmPassword);
    }

    return (
        <div className="register">
            <h1>Register</h1>
            <p>Create your profile to start using our task manager!</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Name: </span>
                    <input type="text" name="displayName" required placeholder="Type your name" onChange={(e) => { setName(e.target.value) }} value={name || ""} />
                </label>
                <label>
                    <span>Email: </span>
                    <input type="email" name="email" required placeholder="Type your email" onChange={(e) => { setEmail(e.target.value) }} value={email || ""} />
                </label>
                <label>
                    <span>Password: </span>
                    <input type="password" name="password" required placeholder="Type your password" onChange={(e) => { setPassword(e.target.value) }} value={password || ""} />
                </label>
                <label>
                    <span>Confirm password: </span>
                    <input type="password" name="confirmPassword" required placeholder="Confirm your password" onChange={(e) => { setConfirmPassword(e.target.value) }} value={confirmPassword || ""} />
                </label>
                <button className="btn">Register</button>
            </form>
        </div>
    )
}

export default Register