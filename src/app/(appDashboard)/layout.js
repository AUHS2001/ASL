"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/Context/AuthContext";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/store/features/userSlice";

export default function DashboardLayout({ children }) {
  const [isloading, setIsloading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user, "user");
    if (user) {
      setIsloading(false);
      dispatch(setAuthUser(user));
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <div className="page-content">{!isloading ? children : ""}</div>
    </>
  );
}
