import Credentials from "@auth/core/providers/credentials";
import prisma from "@/src/lib/prisma";
import {compare} from "bcrypt";
import NextAuth, {NextAuthConfig} from "next-auth";

export const authConfig = {
    debug: true,
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
            if(session.user) {
                if(token.sub) {
                    session.user.id = token.sub
                }
            }
            return session
        },
        jwt: async ({user, token}) => {
            if(user) {
                token.sub = user.id
            }
            return token
        },
        authorized(params) {
            return !!params.auth?.user;
        },
    },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);