import NextAuth from "next-auth"
import Credentials from "@auth/core/providers/credentials";

import { PrismaClient } from "@prisma/client"
import {PrismaAdapter} from "@auth/prisma-adapter";
import {compare} from "bcrypt";
import prisma from "@/src/lib/prisma";


export const { handlers: {GET, POST}, auth } = NextAuth({
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
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.id = user.id
            }
            return token
        }
    },
    pages: {
        signIn: '/signin'
    },
    session: {
        strategy: 'jwt'
    },
    adapter: PrismaAdapter(prisma)
})

