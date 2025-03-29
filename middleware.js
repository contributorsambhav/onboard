import { NextResponse } from "next/server";
import { getSession } from "./lib/data";

export default async function authMiddleware(request) {
  // extracting out full path of the url except base url
  const { pathname, search, hash } = request.nextUrl;
  const fullPath = `${pathname}${search}${hash}`;

  const session = await getSession();

  if (!session) {
    // adding user current route in searchParam
    const redirectURL = new URL("/sign-in", request.url);
    redirectURL.searchParams.set("redirectURL", fullPath);
    return NextResponse.redirect(redirectURL);
  }
  return NextResponse.next();
}

export const config = {
  // add matcher functions here
  matcher: ["/", "/recipients"],
};
