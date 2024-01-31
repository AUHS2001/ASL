"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import InsightsIcon from "@mui/icons-material/Insights";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function ChatHeader() {
  const pages = [];
  const settings = ["Logout"];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const router = useRouter();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (type) => {
    console.log(type, "tt");
    if (type === "Logout") {
      handleLogout();
    }
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    Cookies.remove("user");
    router.push("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#f0f2f5",
        boxShadow: "none",
        color: "black",
        borderBottom: "1px solid #bdbdbd",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <InsightsIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, fill: "#40bd5c" }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
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

          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
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
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <button
              onClick={handleOpenUserMenu}
              style={{
                p: 0,
                background: "none",
                border: "none",
                outline: "none",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  // flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Tooltip title="Open settings">
                  <Avatar
                    alt={user?.email.slice(0, 1)}
                    src="/static/images/avatar/2.jpg"
                  />
                </Tooltip>
                <Box
                  sx={{
                    ml: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ lineHeight: 1, mb: 0.3, fontWeight: 500 }}
                  >
                    {" "}
                    {user?.email.slice(0, 6)}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ lineHeight: 1, fontWeight: 300, color: "#8b8b8b" }}
                  >
                    {" "}
                    {user?.email}
                  </Typography>
                </Box>
              </Box>
            </button>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ChatHeader;
