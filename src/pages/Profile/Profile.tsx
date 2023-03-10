import "./Profile.css";

//Hooks
import { useEffect, useLayoutEffect, useState } from "react";
import { useProfileUpdate } from "../../hooks/useProfileUpdate";

type Props = {
    user: any;
}

const Profile = (props: Props) => {
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const auxName: string = props.user.displayName;
    const auxEmail: string = props.user.email;

    const [message, setMessage] = useState<boolean>();
    const [error, setError] = useState<any>("");
    const { updateUser, error: authError, loading } = useProfileUpdate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError("");


        //Testing password, if something is wrong handleSubmit finishes
        if (password !== confirmPassword) {
            setError("Passwords must be the same!");
            return;
        };

        const user = {
            name,
            password
        };

        await updateUser(user);
        setMessage(true);
        setTimeout(() => {
            setMessage(false);
        }, 2000);
    }

    useLayoutEffect(() => {
        setName(auxName);
        setEmail(auxEmail);

    }, [auxName, auxEmail]);

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    return (
        <div className="profile">
            <h1>Profile: {props.user && props.user.displayName.split(' ')[0]}</h1>
            <p>Update your profile</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Name:</span>
                    <input type="text" name="displayName" required onChange={(e) => setName(e.target.value)} value={name || ""} />
                </label>
                <label>
                    <span>Email:</span>
                    <input type="email" name="email" disabled onChange={(e) => setEmail(e.target.value)} value={email || ""} />
                </label>
                <label>
                    <span>Password:</span>
                    <input type="password" name="password" required placeholder="Type a new password" onChange={(e) => setPassword(e.target.value)} value={password || ""} />
                </label>
                <label>
                    <span>Confirm Password:</span>
                    <input type="password" name="confirmPassword" required placeholder="Confirm your new password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword || ""} />
                </label>
                {!loading && <button className='btn'>Update</button>}
                {loading && <button className='btn' disabled>Wait...</button>}
                {error && <p className="error">{error}</p>}
                {message && <p className="success">Profile success updated</p>}
            </form>
        </div>
    )
}

export default Profile