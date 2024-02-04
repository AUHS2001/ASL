"use client";
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import InsightsIcon from "@mui/icons-material/Insights";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import ScenarioList from "./ScenarioList";
import MyDialog from "./Common/MyDialog";

function ChatHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isScenarioModal, setIsScenrioModal] = useState(false);

  const router = useRouter();

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("currScenario");
    Cookies.remove("user");
    router.push("/login");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const profileMenus = [
    { title: "My account", id: "myAcount", icon: <Avatar sizes="xs" /> },
    {
      title: "Change Scenario",
      id: "scenario",
      icon: <Settings fontSize="small" />,
    },
    { title: "Logout", id: "logout", icon: <Logout fontSize="small" /> },
  ];
  const handleProfileMenu = (e, id) => {
    e.preventDefault();
    switch (id) {
      case "logout":
        handleLogout();
        break;
      case "scenario":
        setIsScenrioModal(true)
        break;
      default:
    }
    handleClose();
  };
  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#ffffff",
          boxShadow: "none",
          color: "black",
          borderBottom: "1px solid #bdbdbd",
          padding: "0px 20px 0px 18px",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <InsightsIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                fill: "#40bd5c",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 4,
                display: { xs: "none", md: "flex" },
                // fontFamily: 'monospace',
                fontWeight: 600,
                letterSpacing: "0.05rem",
                color: "#40bd5c",
                textDecoration: "none",
              }}
            >
              AI SignLab
            </Typography>

            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 600,
                letterSpacing: ".03rem",
                color: "#40bd5c",
                textDecoration: "none",
              }}
            >
              AI SignLab
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))} */}
            </Box>

            <Box
              onClick={handleClick}
              sx={{
                display: "flex",
                // flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
                borderRadius: "24px",
                cursor: "pointer",
                padding: "4px",
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                },
              }}
            >
              <Box
                sx={{
                  margin: "0 8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ lineHeight: 1, mb: 0.3, fontWeight: 500 }}
                >
                  {user?.email}
                </Typography>
              </Box>

              <Tooltip title="Open Profile">
                <IconButton
                  size="small"
                  sx={{ ml: 0 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {user?.email.slice(0, 1)}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="Profile-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {profileMenus.map((item, ind) => (
                <>
                  <MenuItem
                    onClick={(e) => handleProfileMenu(e, item.id)}
                    key={"profileMenu" + ind}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    {item.title}
                  </MenuItem>
                </>
              ))}
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

      <MyDialog
        dialogOpen={isScenarioModal}
        setDialogOpen={setIsScenrioModal}
        title={"Select Your AI Assistant"}
      >
        <ScenarioList setIsScenrioModal={setIsScenrioModal} />
      </MyDialog>
    </>
  );
}
export default ChatHeader;
