import { NextResponse } from "next/server";

export function middleware(req) {
  const cookie = req.cookies.get("token")?.value;
  if (req.nextUrl.pathname.startsWith('/admin')){
    if(cookie === undefined){
        return NextResponse.redirect(new URL('/login', req.url));
    }
  }
  return NextResponse.next();
}