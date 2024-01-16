"use client";
import Image from "next/image";
import Arrow from "@/public/img/arrow.png";
import MockupCard from "@/public/img/mockup_carte.png";

export default function Jumbotron() {
  return (
    <section className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400 pt-16 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-gray-800 text-6xl font-bold mb-4">TA CARTE FOOD</h1>
        <h2 className="text-gray-800 text-3xl font-bold">
          Tes restaurants préférés à prix réduits
        </h2>
        <div className="flex justify-center">
          <Image src={Arrow} alt="Arrow" width={300} />
          <Image src={MockupCard} alt="MockupCard" width={600} />
        </div>
      </div>
    </section>
  );
}
