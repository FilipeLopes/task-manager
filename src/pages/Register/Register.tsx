//CSS
import "./Register.css";

//Hooks
import { useState, useEffect } from "react";
import { useRegister } from "../../hooks/useRegister";

type Props = {}

const Register = (props: Props) => {

    const [displayName, setDisplayName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [error, setError] = useState<any>("");
    const { createUser, error: authError, loading } = useRegister();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError("");

        //Testing password, if something is wrong handleSubmit finishes
        if (password !== confirmPassword) {
            setError("Passwords must be the same!");

            return;
        };

        //Creating the object user
        const user = {
            displayName,
            email,
            password
        };

        await createUser(user);
    }

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    return (
        <div className="register">
            <h1>Register</h1>
            <p>Create your profile to start using our task manager!</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Name: </span>
                    <input type="text" name="displayName" required placeholder="Type your name" onChange={(e) => { setDisplayName(e.target.value) }} value={displayName || ""} />
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
                {!loading && <button className='btn'>Register</button>}
                {loading && <button className='btn' disabled>Wait...</button>}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )
}

export default Register