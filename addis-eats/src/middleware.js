import { NextResponse } from "next/server";

export const middleware = (request) => {
  if (request.headers.has("next-action")) {
    return NextResponse.next();
  }
  const session = request.cookies.get("session");

  if (!session) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*", "/dashboard/:path*"],
};
