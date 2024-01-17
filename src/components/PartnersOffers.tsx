import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

const offers = [
  { title: "Les Offres", description: "<p>Mc Fleury offert pour tout achat d'un menu best of</p><p>Offre petit déjeuner à 50%</p>" },
  { title: "Les Offres", description: "<p>Le menu King Deal à 4€</p><p>-2€ sur le menu Double Whooper</p>" },
  { title: "Les Offres", description: "<p>Offre du Mardi (bucket de tenders à 7.95) disponible tous les jours</p>" },
];

export default function PartnersOffers() {
  
  return (
    <section
      style={{
        backgroundImage: "url('/img/cook.jpg')",
        backgroundSize: "cover",
      }}
      className="bg-opacity-75 pt-8 pb-8 relative"
    >
      <div className="flex justify-center space-x-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {offers.map((item, idx) => (
          <Card key={idx}>
          <CardHeader>
            <CardTitle className="text-center">{item.title}</CardTitle>
          </CardHeader>
          <CardContent dangerouslySetInnerHTML={{__html: item.description}} />          
        </Card>  
        ))}          
      </div>
    </section>
  );
}
