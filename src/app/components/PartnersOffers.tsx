"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

export default function PartnersOffers() {
  return (
    <section
      style={{
        backgroundImage: "url('/img/cook.jpg')",
        backgroundSize: "cover",
      }}
      className="pt-8 pb-8 relative"
    >
      <div className="flex justify-center space-x-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Les Offres</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Mc Fleury offert pour tout achat d'un menu best of</p>
            <p>Offre petit déjeuner à 50%</p>
          </CardContent>          
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Les Offres</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Le menu King Deal à 4€</p>
            <p>-2€ sur le menu Double Whooper</p>
          </CardContent>          
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Les Offres</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Offre du Mardi (bucket de tenders à 7.95) disponible tous les jours</p>
          </CardContent>
        </Card>        
      </div>
    </section>
  );
}
