import "./Login.css";

//Hooks
import { useState, useEffect } from "react";
import { useLogIn } from "../../hooks/useLogIn";

type Props = {}

const Login = (props: Props) => {

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const [error, setError] = useState<any>();
    const { login, error: logError, loading } = useLogIn();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError("");

        const user = {
            email,
            password
        }
        await login(user);
    }

    useEffect(() => {
        if (logError) {
            setError(logError);
        }
    }, [logError]);

    return (
        <div className="login">
            <h1>Login</h1>
            <p>Log in if you already have an account!</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Email:</span>
                    <input type="email" name="email" placeholder="Type your email" required onChange={(e) => setEmail(e.target.value)} value={email || ""} />
                </label>
                <label>
                    <span>Password:</span>
                    <input type="password" name="password" placeholder="Type your password" required onChange={(e) => setPassword(e.target.value)} value={password || ""} />
                </label>
                {!loading && <button className='btn'>Login</button>}
                {loading && <button className='btn' disabled>Wait...</button>}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )
}

export default Login