import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const categories = [
  "Gebed", "Dankzegging", "Vragen",
  "Bijbelstudie", "Persoonlijk", "Getuigenis",
  "Ondersteuning", "Discussie", "Nieuws"
];

export default function CategorieenPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Categorieën</h1>
        <p className="text-muted-foreground">Ontdek berichten en discussies per onderwerp.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat} className="flex flex-col items-start gap-3 rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
            <h3 className="text-xl font-semibold">{cat}</h3>
            <p className="text-sm text-muted-foreground">Bekijk alle berichten over {cat.toLowerCase()}.</p>
            <Badge variant="outline" className="mt-auto">12 berichten</Badge>
            <Button variant="ghost" className="w-full justify-start pl-0 text-primary hover:text-primary/80 hover:bg-transparent">
              Bekijk Categorie &rarr;
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
