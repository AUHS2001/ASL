import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Divider,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import { AuthContext } from "@/Context/AuthContext";

const ChatUser = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const user = React.useContext(AuthContext);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(user, "Chatuser");
  const ActionBtn = () => {
    return (
      <div>
        <IconButton>
          <MoreVertIcon
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          />
        </IconButton>

        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              //   maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          }}
        >
          <MenuItem onClick={handleClose}>?asas</MenuItem>
        </Menu>
      </div>
    );
  };
  return (
    <>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          margin: "1rem 0rem",
        }}
      >
        <IconButton type="button" sx={{ p: "5px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Users..."
          inputProps={{ "aria-label": "search user" }}
        />
      </Paper>

      <List dense sx={{ width: "100%", maxWidth: 250, bgcolor: "transparent" }}>
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem
              key={value}
              disablePadding
              sx={{ padding: "0px" }}
              secondaryAction={
                <div style={{ marginRight: "-20px" }}>
                  <IconButton onClick={handleClick}>
                    <MoreVertIcon
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                    />
                  </IconButton>

                  <Menu
                    id="long-menu"
                    // MenuListProps={{
                    //   "aria-labelledby": "long-button",
                    // }}
                    elevation={1}
                    aria-labelledby="long-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <MenuItem onClick={handleClose}>Mute</MenuItem>
                    <MenuItem onClick={handleClose}>Block</MenuItem>
                    <MenuItem onClick={handleClose}>Delete chat</MenuItem>
                    <MenuItem onClick={handleClose}>Mark us read</MenuItem>
                  </Menu>
                </div>
              }
            >
              <ListItemButton
                sx={{
                  padding: "0.5rem 0.5rem",
                  border: `${
                    value === 2 ? "1px solid #40bd5c" : "1px solid transparnet"
                  }`,
                  margin: "0.2rem 0rem",
                  borderRadius: "0.35rem",
                  background: `${value === 2 ? "#40bd5c" : ""}`,
                  color: `${value === 2 ? "white" : ""}`,
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${value + 1}`}
                    src={`/static/images/avatar/${value + 1}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText
                  id={labelId}
                  primary={`Line item ${value + 1}`}
                  secondary={"last Message"}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};
export default ChatUser;
