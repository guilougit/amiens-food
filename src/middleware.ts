import {authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes} from "@/src/routes";
import NextAuth from "next-auth";
import {authConfig} from "@/src/auth";
import {$Enums} from "@prisma/client";
import Roles = $Enums.Roles;

const {auth} = NextAuth(authConfig);

export default auth((req): any => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

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
    
    // Admin route
    if(nextUrl.pathname.startsWith('/admin')) {
        // Check if user has role admin
        if (req?.auth?.user.role !== Roles.ADMIN) { // don't have admin role -> redirect to homepage
            return Response.redirect(new URL('/', nextUrl))
        }
    }
    return null;    
})

export const config = {
    matcher: ['/compte', '/connexion', '/payment', '/admin'],
}
