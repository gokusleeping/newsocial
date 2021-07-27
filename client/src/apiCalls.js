import axios from "axios";
import apiEndpoints from "./apiEndpoints";

export const loginCall = async (userCredential, dispatch) => {
	dispatch({ type: "LOGIN_START" });
	try {
		const res = await axios.post(apiEndpoints.LOGIN, userCredential);
		if (res?.status === 200) dispatch({ type: "LOGIN_SUCCESS", payload: res?.data });
	} catch (err) {
		dispatch({ type: "LOGIN_FAILURE", payload: err });
	}
};
