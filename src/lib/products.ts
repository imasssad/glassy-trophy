export type Category = "trophy" | "medal" | "shield";

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  material: string;
  blurb: string;
};

export const PRODUCTS: Product[] = [
  { id: "t1", name: "Crystal Summit Trophy", category: "trophy", price: 89.0, material: "Optical crystal", blurb: "A faceted crystal peak on a mirrored base, laser etched with your event name." },
  { id: "t2", name: "Titan Cup", category: "trophy", price: 64.5, material: "Metal plated resin", blurb: "A classic twin handled cup on a marble effect base, engraving plate included." },
  { id: "t3", name: "Apex Star Trophy", category: "trophy", price: 54.0, material: "Resin, polished finish", blurb: "A star topped column built for youth leagues and school competitions." },
  { id: "t4", name: "Ascension Trophy", category: "trophy", price: 112.0, material: "Metal, plated finish", blurb: "A tiered column trophy with a rising figure, weighted for a steady stand." },
  { id: "t5", name: "Championship Obelisk", category: "trophy", price: 138.0, material: "Cast metal", blurb: "A tall obelisk for league finals, with room for a full season roster plate." },
  { id: "t6", name: "Victory Column Trophy", category: "trophy", price: 76.0, material: "Resin, brushed finish", blurb: "A fluted column topped with a laurel wreath, a steady middle tier choice." },

  { id: "m1", name: "Laurel Medal", category: "medal", price: 8.5, material: "Die cast zinc", blurb: "A wreath medal on a grosgrain ribbon, priced for full team orders." },
  { id: "m2", name: "Podium Medal Set", category: "medal", price: 22.0, material: "Plated metal, set of three", blurb: "A matched set of three medals for first, second and third place finishers." },
  { id: "m3", name: "Star Achievement Medal", category: "medal", price: 9.25, material: "Enamel, metal", blurb: "A bright enamel star medal with ribbon colours you can choose per order." },
  { id: "m4", name: "Honor Medallion", category: "medal", price: 14.0, material: "Antique finish metal", blurb: "A heavier medallion with an aged finish, suited to formal ceremonies." },
  { id: "m5", name: "Victory Ribbon Medal", category: "medal", price: 7.75, material: "Stamped metal", blurb: "A light, low cost medal built for bulk orders across a whole school." },
  { id: "m6", name: "Heritage Star Medal", category: "medal", price: 11.5, material: "Plated metal", blurb: "A layered star medal with a wide ribbon, a step up from the entry medal." },

  { id: "s1", name: "Heritage Shield Plaque", category: "shield", price: 46.0, material: "Wood, engraved plate", blurb: "A wood backed shield with an engraved plate, wall mount ready." },
  { id: "s2", name: "Crest Shield Award", category: "shield", price: 58.0, material: "Resin, raised trim", blurb: "A crest shaped award with raised trim, a strong choice for annual honours." },
  { id: "s3", name: "Champion's Shield", category: "shield", price: 95.0, material: "Metal, hand finished", blurb: "A large ceremonial shield, hand finished and built to be handed down each season." },
  { id: "s4", name: "Emblem Shield Trophy", category: "shield", price: 67.0, material: "Resin on wood base", blurb: "A shield shaped trophy on a wood base, a hybrid pick between shield and cup." },
  { id: "s5", name: "Founder's Shield", category: "shield", price: 124.0, material: "Metal, engraved crest", blurb: "A premium shield reserved for lifetime achievement and founder honours." },
  { id: "s6", name: "Guardian Shield Plaque", category: "shield", price: 39.0, material: "Acrylic, printed crest", blurb: "An affordable acrylic shield plaque, a clean pick for smaller ceremonies." },
];

export type FilterValue = "all" | Category;
export type SortValue = "featured" | "price-asc" | "price-desc";

export function categoryLabel(c: Category): string {
  return c === "trophy" ? "Trophy" : c === "medal" ? "Medal" : "Shield";
}

export function formatPrice(n: number): string {
  return "$" + n.toFixed(2);
}
