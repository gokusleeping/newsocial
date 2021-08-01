import { useContext, useEffect, useState, useRef } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Button, CardMedia, Divider, Grid } from "@material-ui/core";

import { Photo, Cancel } from "@material-ui/icons";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

export default function Feed({ username }) {
	const [posts, setPosts] = useState([]);
	const { user } = useContext(AuthContext);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	useEffect(() => {
		const fetchPosts = async () => {
			const res = username ? await axios.get("/posts/profile/" + username) : await axios.get("posts/timeline/" + user._id);
			setPosts(
				res.data.sort((p1, p2) => {
					return new Date(p2.createdAt) - new Date(p1.createdAt);
				})
			);
		};
		fetchPosts();
	}, [username, user._id]);

	const desc = useRef();
	const [file, setFile] = useState(null);

	const submitHandler = async (e) => {
		e.preventDefault();
		const newPost = {
			userId: user._id,
			desc: desc.current.value
		};
		if (file) {
			const data = new FormData();
			const fileName = Date.now() + file.name;
			data.append("name", fileName);
			data.append("file", file);
			newPost.img = fileName;
			console.log(newPost);
			try {
				await axios.post("/upload", data);
			} catch (err) {}
		}
		try {
			await axios.post("/posts", newPost);
			window.location.reload();
		} catch (err) {}
	};

	return (
		<div className="feed">
			<Grid container spacing={3}>
				<Grid item style={{ width: "100%" }}>
					<Card>
						<CardHeader
							title={
								<Typography variant="h5" style={{ fontWeight: "bold" }}>
									What's on your mind ?
								</Typography>
							}
						/>
						<CardContent style={{ paddingTop: 0 }}>
							<textarea
								style={{ height: "8rem", width: "100%", maxWidth: "100%", minWidth: "100%", border: "1px dashed #aaa", padding: 4, borderRadius: 8 }}
								placeholder={"Hey " + user.username + ". Got something to share?"}
								ref={desc}
							/>
						</CardContent>

						{file && (
							<div className="shareImgContainer">
								<CardMedia style={{ height: "250px", backgroundSize: "contain" }} image={URL.createObjectURL(file)} title="Paella dish" />
								<Cancel className="shareCancelImg" onClick={() => setFile(null)} />
							</div>
						)}

						<Divider />

						<CardActions disableSpacing>
							<form onSubmit={submitHandler} style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
								<label htmlFor="file" style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
									<Photo htmlColor="tomato" />
									<span style={{ paddingLeft: 8 }}>Upload Image</span>
									<input style={{ display: "none" }} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])} />
								</label>
								<Button type="submit" style={{ background: "#ff6347", color: "white", marginLeft: "auto", padding: "0.25rem 2.5rem" }}>
									Share
								</Button>
							</form>
						</CardActions>
					</Card>
				</Grid>

				{posts.map((p) => (
					<Grid item style={{ width: "100%" }}>
						<Post key={p._id} post={p} setPosts={setPosts} />
					</Grid>
				))}
			</Grid>
		</div>
	);
}
