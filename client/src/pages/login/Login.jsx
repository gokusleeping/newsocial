import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress, TextField } from "@material-ui/core";
import "./login.css";

export default function Login() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const { isFetching, dispatch } = useContext(AuthContext);

	const history = useHistory();

	const handleClick = (e) => {
		e.preventDefault();
		loginCall({ email, password }, dispatch);
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
						<TextField variant="outlined" label="Username or Email" onChange={(e) => setEmail(e.target.value)} required />
						<TextField variant="outlined" label="Enter Password" onChange={(e) => setPassword(e.target.value)} required type="password" />

						<button className="loginButton" type="submit" disabled={isFetching}>
							{isFetching ? <CircularProgress color="white" size="20px" /> : "Log In"}
						</button>
						<span className="loginForgot">Forgot Password?</span>
						<button type="button" onClick={() => history.pushState("/register")} className="loginRegisterButton">
							Create a New Account
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
