"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/Context/AuthContext";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/store/features/userSlice";
import { setAIType } from "@/store/features/aiTypeSlice";

export default function DashboardLayout({ children }) {
  const [isloading, setIsloading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const currScenario = JSON.parse(localStorage.getItem("currScenario"));
    if (user) {
      dispatch(setAuthUser(user));
    } else {
      router.push("/login");
    }

    if (currScenario) {
      dispatch(setAIType(currScenario));
    } else {
      router.push("/");
    }

    setIsloading(false);
  }, []);

  return (
    <>
      <div className="page-content">{!isloading ? children : ""}</div>
    </>
  );
}
