"use client";
import React, { useEffect, useState } from "react";
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
import Link from "next/link";
import { Typography } from "@mui/material";

export default function SignupForm() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [isLoading, setIsloading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsloading(true);
        const data = new FormData(event.currentTarget);
        const userName = data.get("userName");
        const email = data.get("email");
        const password = data.get("password");

        try {
            const response = await axios({
                url: `${API_URL}/auth/sign_up`,
                method: "POST",
                data: {
                    name:userName,
                    email: email,
                    password: password
                },
            });
            console.log("SignUp APi Call", response.data);
            if (response?.data?.status_code === 200) {
                const user = response?.data?.data 
                localStorage.setItem("user", JSON.stringify(user));
                dispatch(setAuthUser(user));
                Cookies.set("user", JSON.stringify(user), { expires: 7 });
                router.push("/");
                toast.success("SignUp Successfully!");
            } else {
                setIsloading(false);
                toast.error("User not found!");
            }
        } catch (error) {
            console.error("Error calling SignUp APi", error);
            setIsloading(false);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something Went Wrong!");
            }
        }
    };

    return (
        <>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Box sx={{ display: 'flex' }}>

                    <TextField
                        margin="dense"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="userName"
                        autoFocus
                        size="small"
                        sx={{ mr: 1 }}
                    />
                    <TextField
                        margin="dense"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoFocus
                        size="small"
                    />
                </Box>

                <TextField
                    margin="dense"
                    fullWidth
                    required
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    size="small"
                />

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

            </Box>
            <Box sx={{ display: "flex" }}>
                <Typography sx={{ mr: 1, fontSize: '0.9rem' }}>
                    Already have an account?
                </Typography>
                <Link href="/login" variant="body2">
                    {"Login here."}
                </Link>
            </Box>
        </>
    );
}
