import type { DefaultSession, DefaultUser } from "next-auth";
import Roles = $Enums.Roles;

declare module "next-auth" {

    interface Session extends DefaultSession {
        user: DefaultUser & {
            id: string,
            role: Roles
            password?: string
        }
    }
}