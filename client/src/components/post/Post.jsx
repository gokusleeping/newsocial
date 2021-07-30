import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { Menu, MenuItem } from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

export default function Post({ post }) {
	const [like, setLike] = useState(post.likes.length);
	const [isLiked, setIsLiked] = useState(false);
	const [user, setUser] = useState({});
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user: currentUser } = useContext(AuthContext);

	const [anchorEl, setAnchorEl] = useState(null);
	const [expanded, setExpanded] = useState(false);

	useEffect(() => {
		setIsLiked(post.likes.includes(currentUser._id));
	}, [currentUser._id, post.likes]);

	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`/users?userId=${post.userId}`);
			setUser(res.data);
		};
		fetchUser();
	}, [post.userId]);

	const likeHandler = () => {
		try {
			axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
		} catch (err) {}
		setLike(isLiked ? like - 1 : like + 1);
		setIsLiked(!isLiked);
	};

	return (
		<Card>
			<CardHeader
				avatar={
					<Link to={`/profile/${user.username}`}>
						<Avatar aria-label="recipe" src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt={user.username} />
					</Link>
				}
				action={
					<IconButton aria-label="settings">
						<MoreVert aria-controls="simple-menu" aria-haspopup="true" onClick={(e) => setAnchorEl(e.currentTarget)} />
						<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
							<MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
							<MenuItem onClick={() => setAnchorEl(null)}>My account</MenuItem>
							<MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
						</Menu>
					</IconButton>
				}
				title={user.username}
				subheader={format(post.createdAt)}
			/>
			{post.img && <img className="postImg" src={PF + post.img} alt="" />}
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton>
				<IconButton aria-label="add to favorites">
					<FavoriteIcon onClick={likeHandler} style={isLiked ? { color: "indianred" } : {}} />
				</IconButton>
				<span className="postLikeCounter">{like} people like it</span>
				<IconButton onClick={() => setExpanded((e) => !e)} aria-expanded={expanded} aria-label="show more" style={{ marginLeft: "auto" }}>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography paragraph>Method:</Typography>
					<Typography paragraph>Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.</Typography>
					<Typography paragraph>
						Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until
						lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
						onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to
						a boil.
					</Typography>
					<Typography paragraph>
						Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes.
						Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook again without stirring, until mussels have opened and rice is
						just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)
					</Typography>
					<Typography>Set aside off of the heat to let rest for 10 minutes, and then serve.</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
}
