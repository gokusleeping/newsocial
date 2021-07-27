import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import apiEndpoints from "../../apiEndpoints";
import TextField from "@material-ui/core/TextField";
import "./register.css";

export default function Register() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordAgain, setPasswordAgain] = useState("");
	const [error, setError] = useState("");

	const history = useHistory();

	useEffect(() => {
		if (passwordAgain !== password) {
			setError("Passwords do not match");
		} else setError("");
	}, [password, passwordAgain]);

	const handleClick = async (e) => {
		e.preventDefault();
		try {
			const { status } = await axios.post(apiEndpoints.REGISTER, { username, email, password });
			if (status === 200) history.push("/login");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">Social App</h3>
					<span className="loginDesc">Connect with friends and the world around you on Social App.</span>
				</div>
				<div className="loginRight">
					<form className="loginBox" onSubmit={handleClick}>
						<TextField variant="outlined" name="username" label="Username" onChange={(e) => setUsername(e.target.value)} required />
						<TextField variant="outlined" name="email" label="Email" type="email" onChange={(e) => setEmail(e.target.value)} required />
						<TextField variant="outlined" name="password" onChange={(e) => setPassword(e.target.value)} label="Password" type="password" required />
						<TextField
							variant="outlined"
							name="passwordAgain"
							onChange={(e) => setPasswordAgain(e.target.value)}
							error={!!error}
							helperText={error}
							label="Confirm Password"
							type="password"
							required
						/>

						<button className="loginButton" type="submit">
							Sign Up
						</button>
						<button type="button" className="loginRegisterButton" onClick={() => history.push("/login")}>
							Log into Account
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
