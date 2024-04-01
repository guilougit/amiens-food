import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Button } from "@/src/components/ui/button";

export default function Contact() {
  return (
    <div className="relative flex flex-col justify-center items-center mt-10 overflow-hidden w-full lg:w-3/4 xl:w-2/3 m-auto">
      <div className="bg-white">
        <h2 className="text-3xl font-bold">Contactez-Nous</h2>
        <p className="text-gray-500">
          Veuillez remplir le formulaire ci-dessous et nous vous répondrons dans
          les plus brefs délais.
        </p>
      </div>
      <div className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label
            className="text-gray-600 required"
            htmlFor="name"
          >
            Nom et Prénom
          </Label>
          <Input
            className="border-gray-300 bg-white w-full"
            id="name"
            placeholder="Entrer votre nom et prénom"
            required
          />
        </div>
        <div className="space-y-2">
          <Label
            className="text-gray-600 required"
            htmlFor="object"
          >
            Objet
          </Label>
          <Input
            className="border-gray-300 bg-white w-full"
            id="object"
            placeholder="Entrer votre objet"
            required
          />
        </div>
        <div className="space-y-2">
          <Label
            className="text-gray-600 required"
            htmlFor="message"
          >
            Message
          </Label>
          <textarea
            className="border-gray-300 bg-white w-full p-2"
            id="message"
            placeholder="Ecrivez-votre demande"
            required
            rows={4}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            className="text-gray-600"
            id="agreement"
            required
          />
          <Label
            className="text-sm font-normal text-gray-600"
            htmlFor="agreement"
          >
            {"J'accepte les"}
            <button className="underline underline-offset-2 text-gray-600 ml-2">
              Conditions générales {"d'utilisation"}
            </button>
          </Label>
        </div>
        <Button className="w-full" type="submit">
          Envoyer
        </Button>
      </div>
    </div>
  );
}
