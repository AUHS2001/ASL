"use client";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import InsightsIcon from "@mui/icons-material/Insights";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_URL } from "@/constant/ApiUrl";
import LoginSide from "@/components/serverSide/LoginSide";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsloading] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");

    try {
      const response = await axios({
        url: `${API_URL}/auth/sign_up`,
        method: "POST",
        data: {
          email: email,
        },
      });
      console.log("Login APi Call", response.data);
      if (response?.data?.status_code === 200) {
        localStorage.setItem(
          "user",
          JSON.stringify({ email, id: response?.data?.data })
        );
        router.push("/");
      }
    } catch (error) {
      console.error("Error calling Login APi", error);
    }
  };

  useEffect(() => {
    document.title = "Login AI-SignLab";
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      router.push("/");
    } else {
      setIsloading(false);
    }
  }, []);

  return (
    <>
      {!isLoading ? (
        <>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <LoginSide />
            <Grid
              item
              xs={12}
              sm={8}
              md={6}
              component={Paper}
              elevation={6}
              square
              justifyContent={"center"}
              display={"flex"}
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "#40bd5c" }}>
                    <InsightsIcon />
                  </Avatar>
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    sx={{
                      fontWeight: 600,
                      letterSpacing: "0.05rem",
                      color: "#40bd5c",
                      textDecoration: "none",
                    }}
                  >
                    AI SignLab
                  </Typography>
                </Box>
                <Typography component="h1" variant="h5" color={"#8b8b8b"}>
                  Log In
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
                  {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="success"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Continue
                  </Button>
                  <Grid container>
                    {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
                  </Grid>
                  <Copyright sx={{ mt: 1 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </>
      ) : (
        ""
      )}
    </>
  );
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        AI-SignLab
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
