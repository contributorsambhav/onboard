import { NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";

export default async function authMiddleware(request) {
  // extracting out full path of the url except base url
  const { pathname, search, hash } = request.nextUrl;
  const fullPath = `${pathname}${search}${hash}`;

  const { data: session } = await betterFetch("/api/auth/get-session", {
    baseURL: request.nextUrl.origin,
    headers: {
      //get the cookie from the request
      cookie: request.headers.get("cookie") || "",
    },
  });

  if (!session) {
    // adding user current route in searchParam
    const redirectURL = new URL("/sign-in", request.url);
    redirectURL.searchParams.set("redirectURL", fullPath);
    return NextResponse.redirect(redirectURL);
  }
  if (pathname == "/sign-in") {
    const redirectURL = new URL("/", request.url);
    redirectURL.searchParams.set("redirectURL", fullPath);
    return NextResponse.redirect(redirectURL);
  }
  return NextResponse.next();
}

export const config = {
  // add matcher functions here
  matcher: ["/", "/recipients"],
};
