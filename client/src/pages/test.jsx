import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import MailIcon from "@material-ui/icons/Mail";

import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import { CardMedia, Grid, Menu, MenuItem, Paper } from "@material-ui/core";

import { RssFeed, Chat, Group, Bookmark } from "@material-ui/icons";

import Feed from "../components/feed/Feed";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex"
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		background: theme.palette.grey[700]
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	drawerContainer: {
		overflow: "auto"
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},

	grow: {
		flexGrow: 1
	},
	inputRoot: {
		color: "inherit"
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch"
		}
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: theme.palette.grey[50],
		"&:hover": {
			backgroundColor: theme.palette.common.white
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: "100%",
		color: theme.palette.common.black,
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(3),
			width: "auto"
		}
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},

	orange: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500]
	},

	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary
	}
}));

const menuId = "primary-search-account-menu";

export default function ClippedDrawer({ history }) {
	const classes = useStyles();

	const [users, setUsers] = useState([]);

	const { user } = useContext(AuthContext);

	useEffect(
		() =>
			(async () => {
				const res = await axios.get("/users/all");
				setUsers(res.data);
			})(),
		[]
	);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [open, setOpen] = React.useState(false);
	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
		setOpen(true);
	};
	const handleProfileMenuClose = (event) => {
		setAnchorEl(null);
		setOpen(false);
	};

	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			onClose={handleProfileMenuClose}
			open={open}
		>
			<Link to={`/profile/${user.username}`}>
				<MenuItem>Profile</MenuItem>
			</Link>
			{/* <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem> */}
			<MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.root}>
			{renderMenu}
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<Link to="/">
						<Typography variant="h6" noWrap>
							Social App
						</Typography>
					</Link>
					<div className={classes.grow} />
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput
							}}
							inputProps={{ "aria-label": "search" }}
						/>
					</div>
					<IconButton aria-label="show 4 new mails" color="inherit">
						<Badge badgeContent={4} color="secondary">
							<MailIcon />
						</Badge>
					</IconButton>
					<IconButton aria-label="show 17 new notifications" color="inherit">
						<Badge badgeContent={17} color="secondary">
							<NotificationsIcon />
						</Badge>
					</IconButton>
					<IconButton edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
						<AccountCircle />
					</IconButton>
				</Toolbar>
			</AppBar>

			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper
				}}
			>
				<Toolbar />
				<div className={classes.drawerContainer}>
					<List>
						<ListItem button key="0">
							<ListItemIcon>
								<RssFeed />
							</ListItemIcon>
							<ListItemText primary="Feed" />
						</ListItem>
						<ListItem button key="1">
							<ListItemIcon>
								<Chat />
							</ListItemIcon>
							<ListItemText primary="Chat" />
						</ListItem>
						<ListItem button key="2">
							<ListItemIcon>
								<Bookmark />
							</ListItemIcon>
							<ListItemText primary="Saved" />
						</ListItem>
						<ListItem button key="3">
							<ListItemIcon>
								<Group />
							</ListItemIcon>
							<ListItemText primary="Friends" />
						</ListItem>
					</List>
					<Divider />
					<List>
						<ListItem>
							<h2 style={{ fontWeight: 700, textAlign: "center" }}>Users</h2>
						</ListItem>

						{users.map((user, index) => (
							<Link to={`/profile/${user.username}`} color="inherit" key={index + 1}>
								<ListItem button>
									<ListItemIcon>
										<Avatar src={user.profilePicture} />
									</ListItemIcon>
									<ListItemText primary={user.name} />
								</ListItem>
							</Link>
						))}
					</List>
				</div>
			</Drawer>

			<main className={classes.content}>
				<Toolbar />

				<Grid container spacing={2}>
					<Grid item xs={7} md={8}>
						<Feed />
					</Grid>
					<Grid item xs={5} md={4}>
						<img style={{ height: "auto", maxWidth: "100%", borderRadius: 6, marginBottom: 12 }} src="/assets/ad.png" />

						<Paper>
							<List>
								<ListItem>
									<h2 style={{ fontWeight: 500, textAlign: "center" }}>Online Users</h2>
								</ListItem>
								<Divider />
								{users.map((user, index) => (
									<ListItem button key={index + 1}>
										<Link to={`/profile/${user.username}`} color="inherit" style={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
											<ListItemIcon>
												<Avatar src={user.profilePicture} />
											</ListItemIcon>
											<ListItemText primary={user.name} />
										</Link>
										<Link to={`/chats/${user.username}`}>
											<ListItemIcon>
												<Chat style={{ marginLeft: "auto" }} />
											</ListItemIcon>
										</Link>
									</ListItem>
								))}
							</List>
						</Paper>
					</Grid>
				</Grid>
			</main>
		</div>
	);
}
