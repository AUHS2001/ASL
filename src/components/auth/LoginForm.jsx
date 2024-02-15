"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_URL } from "@/constant/ApiUrl";
import ButtonLoader from "../Common/ButtonLoader";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/store/features/userSlice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, setIsloading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsloading(true);
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
        const user = { email, id: response?.data?.data };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(setAuthUser(user));
        Cookies.set("user", JSON.stringify(user),{ expires: 7 });
        router.push("/");
        toast.success("Login Successfully!");
      } else {
        setIsloading(false);
        toast.error("User not found!");
      }
    } catch (error) {
      console.error("Error calling Login APi", error);
      setIsloading(false);
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          size="small"
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
        {/* <Button
          type="submit"
          fullWidth
          variant="contained"
          color="success"
          sx={{ mt: 2, mb: 2 }}
          size="small"
        >
          Continue
        </Button> */}
        <ButtonLoader
          loading={isLoading}
          title={"Continue"}
          type="submit"
          fullWidth
          variant="contained"
          color="success"
          sx={{ mt: 2, mb: 2 }}
          size="small"
        />
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
      </Box>
    </>
  );
}
