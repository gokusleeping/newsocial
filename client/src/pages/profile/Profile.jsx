import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Profile() {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [user, setUser] = useState({});

	const [modal, setModal] = useState(false);
	const imageUploadRef = useRef(null);

	const [encodedImage, setEncodedImage] = useState("");

	const username = useParams().username;

	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`/users?username=${username}`);
			setUser(res.data);
		};
		fetchUser();
	}, [username]);

	const showImage = (e) => {
		if (e.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);
			reader.onloadend = (a) => setEncodedImage(a.target.result);
		}
	};

	return (
		<>
			<Dialog open={modal} onClose={() => setModal(false)} aria-labelledby="form-dialog-title" fullWidth>
				<DialogTitle id="form-dialog-title">Update Profile</DialogTitle>
				<DialogContent>
					<div style={{ width: 150, height: 150, margin: "auto" }}>
						<img
							style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "contain" }}
							src={encodedImage ? encodedImage : user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
							onClick={() => imageUploadRef?.current?.click()}
							alt="Profile"
						/>
					</div>

					<TextField autoFocus margin="dense" label="Username" type="text" fullWidth />
					<TextField margin="dense" label="Status" type="text" fullWidth />
					<TextField margin="dense" label="Gaming ID" type="text" fullWidth />
					<TextField margin="dense" label="City" type="text" fullWidth />
					<TextField margin="dense" label="Email Address" type="email" fullWidth />
					<TextField margin="dense" label="Old Password" type="password" fullWidth />
					<TextField margin="dense" label="New Password" type="password" fullWidth />
					<input style={{ display: "none" }} type="file" ref={imageUploadRef} accept="image/*" onChange={showImage} />
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setModal(false)} color="primary">
						Cancel
					</Button>
					<Button color="primary">Update</Button>
				</DialogActions>
			</Dialog>

			<Topbar />
			<div className="profile">
				<Sidebar />
				<div className="profileRight">
					<div className="profileRightTop">
						<div className="profileCover">
							<img className="profileCoverImg" src={user.coverPicture ? PF + user.coverPicture : PF + "person/noCover.png"} alt="" />
							<img className="profileUserImg" src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" />
						</div>
						<div className="profileInfo">
							<h4 className="profileInfoName" onClick={() => setModal(true)}>
								{user.username}
							</h4>
							<span className="profileInfoDesc">{user.desc}</span>
						</div>
					</div>
					<div className="profileRightBottom">
						<Feed username={username} />
						<Rightbar user={user} />
					</div>
				</div>
			</div>
		</>
	);
}
