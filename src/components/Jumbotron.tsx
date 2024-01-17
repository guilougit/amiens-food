"use client";
import Image from "next/image";
import Arrow from "@/public/img/arrow.png";
import { PiShoppingCartBold } from "react-icons/pi";
import { Button } from "@/src/components/ui/button"
import MockupCard from "@/public/img/mockup_carte.png";

export default function Jumbotron() {
  return (
    <section className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 pt-8 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-gray-800 text-6xl font-bold mb-4">TA CARTE FOOD</h1>
        <h2 className="text-gray-800 text-3xl font-bold">
          Tes restaurants préférés à prix réduits
        </h2>
        <div className="flex justify-end">
          <Image src={Arrow} alt="Arrow" width={300} />
          <Image src={MockupCard} alt="MockupCard" width={400} />
        </div>
      </div>
      <Button variant="outline" className="border border-gray-800 rounded absolute left-1/2 bottom-0 transform -translate-x-1/2 -translate-y-1/2">J'ACHETE MA CARTE <PiShoppingCartBold className="ml-2" size={20}/></Button>
    </section>
  );
}
