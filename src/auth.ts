import prisma from "@/src/lib/prisma";
import {compare} from "bcryptjs";
import NextAuth, {NextAuthConfig} from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize (credentials, req) {
                // Check if user exists with this email
                const existingUser = await prisma.user.findUnique({
                    where: { email: credentials?.email as string }
                });

                if(existingUser && credentials?.password) {
                    if(await compare(credentials.password as string, existingUser.password ?? '')) {
                        return existingUser
                    }
                }
                return null;
            },
        })
    ],
    callbacks: {
        session: async ({session, token}) => {
            if(session.user && token) {
                session.user.id = token.sub
                session.user.role = token.role
                
            }
            return session
        },
        jwt: async ({user, token}) => {
            if(user) {
                token.sub = user.id
                //@ts-ignore
                token.role = user.role
            }
            return token
        },
        authorized(params) {
            return !!params.auth?.user;
        },
    },
    pages: {
        signIn: '/connexion'
    }
} satisfies NextAuthConfig;

export const { handlers: {GET, POST}, auth, signIn, signOut } = NextAuth(authConfig);