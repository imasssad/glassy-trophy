"use client";

import { AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";

type Props = {
  products: Product[];
  onAdd: (id: string, qty: number) => void;
};

export function ProductGrid({ products, onAdd }: Props) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-[22px]">
      <AnimatePresence>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </AnimatePresence>
    </div>
  );
}
