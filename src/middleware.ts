import {authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes} from "@/src/routes";
import NextAuth from "next-auth";
import {authConfig} from "@/src/auth";

const {auth} = NextAuth(authConfig);

export default auth((req): any => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    console.log(nextUrl)
    
    // Sign in page -> redirect the user to his account if he's connected
    if(nextUrl.pathname === "/connexion") {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null;
    }
    
    // Auth pages and not connected
    if (isAuthRoute && !isLoggedIn) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl);

        return Response.redirect(new URL(
            `/connexion?callbackUrl=${encodedCallbackUrl}`,
            nextUrl
        ));
    }

    return null;    
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
