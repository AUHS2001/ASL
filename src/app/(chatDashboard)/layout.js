"use client";
// import node module libraries
import { useState, useEffect, useContext } from "react";

// import theme style scss file
import "@/styles/layout.css";
import { useRouter } from "next/navigation";

// import sub components
// import NavbarVertical from '/layouts/navbars/NavbarVertical';
// import NavbarTop from '/layouts/navbars/NavbarTop';
// import SideBar from "@/layouts/SideBar";
import { AuthContext } from "@/Context/AuthContext";

export default function DashboardLayout({ children }) {
  const [showMenu, setShowMenu] = useState(true);
  const router = useRouter();

  const ToggleMenu = () => {
    return setShowMenu(!showMenu);
  };
  return (
    <>
      <div className="page-content">{children}</div>
    </>
  );
}
