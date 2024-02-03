import { NextResponse } from "next/server";
import { authRoutes, protectedRoutes } from "./router/routes";

export function middleware(request) {
  const currentUser = request.cookies.get("user")?.value;
  console.log(currentUser, "cur");
  if (
    protectedRoutes.includes(request.nextUrl.pathname) &&
    !currentUser &&
    !authRoutes.includes(request.nextUrl.pathname)
  ) {
    request.cookies.delete("user");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("user");
    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
