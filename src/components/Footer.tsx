import Link from "next/link";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div
        className="
        container
        flex flex-col flex-wrap
        px-4
        py-16
        mx-auto
        md:items-center
        lg:items-start
        md:flex-row md:flex-nowrap
      "
      >
        <div className="flex-shrink-0 w-96 mx-auto text-center md:mx-0 md:text-left">
          <Link href={"/"} className="text-2xl text-white">
            NewsLetter Amiens Food
          </Link>
          <p className="mt-2 text-xs text-justify text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            veniam dolor quo quia, sint repudiandae nam, dicta similique
            consequuntur accusantium earum unde nihil nisi porro vitae.
            Assumenda eligendi mollitia quae?
          </p>
          <div className="flex mt-4">
            <Input type="email" placeholder="Email" />
            <Button variant="destructive" className="ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-send-horizontal text-white"
              >
                <path d="m3 3 3 9-3 9 19-9Z" />
                <path d="M6 12h16" />
              </svg>
            </Button>
          </div>
          <div className="flex justify-center mt-4 space-x-4 lg:mt-2">
            <Link href={""}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-facebook text-blue-500"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>{" "}
            </Link>
            <Link href={""}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-twitter text-sky-300"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </Link>
            <Link href={""}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-instagram text-pink-500"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </Link>
            <Link href={""}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-linkedin text-blue-400"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </Link>
            <Link href={""}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-youtube text-red-600"
              >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="justify-end w-full mt-4 text-center lg:flex">
          <div className="w-full px-4 lg:w-1/3 md:w-1/2">
            <h2 className="mb-2 font-bold tracking-widest text-gray-100">
              Liens Utiles
            </h2>
            <ul className="mb-8 space-y-2 text-sm list-none">
              <li>
                <Link href={"/"} className="text-gray-300">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href={"/"} className="text-gray-300">
                  Les Partenaires
                </Link>
              </li>
              <li>
                <Link href={"/"} className="text-gray-300">
                  Acheter ma carte
                </Link>
              </li>
              <li>
                <Link href={"/"} className="text-gray-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href={"/"} className="text-gray-300">
                  Connexion
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full px-4 lg:w-1/3 md:w-1/2">
            <h2 className="mb-2 font-bold tracking-widest text-gray-100">
              Légales
            </h2>
            <ul className="mb-8 space-y-2 text-sm list-none">
              <li>
                <Link href={"/"} className="text-gray-300">
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link href={"/"} className="text-gray-300">
                  Confidentialités des données
                </Link>
              </li>
              <li>
                <Link href={"/"} className="text-gray-300">
                  Conditions et Termes
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <p className="text-center text-sm text-white pb-2">
          @2024 Tous droits réservés - AmiensFood.
        </p>
      </div>
    </footer>
  );
}
