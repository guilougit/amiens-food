import Link from "next/link";

import { Button, buttonVariants } from "@/src/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

export default function SignIn() {
  return (
    <div className="relative flex flex-col justify-center items-center mt-10 overflow-hidden">
      <div className="w-full m-auto bg-white lg:max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Connexion</CardTitle>
            <CardDescription className="text-center">
              Entrer votre email et votre mot de passe pour vous connecter
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" />
            </div>
            <span className=" text-blue-600 hover:underline text-sm">
              Mot de passe oublié ?
            </span>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full">Connexion</Button>
          </CardFooter>
          <div className="relative mb-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou connecte toi avec
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 m-2">
            <Button variant="outline">
              <FaGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline">
              <FaFacebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
          </div>
          <Link href="/signup">
            <p className="mt-2 text-xs text-center text-gray-700">
              {" "}
              Vous n'êtes pas client ?{" "}
              <span className=" text-blue-600 hover:underline">
                Créer un compte
              </span>
            </p>
          </Link>
        </Card>
      </div>
    </div>
  );
}
