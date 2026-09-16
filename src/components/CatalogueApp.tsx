"use client";

import { useMemo, useState } from "react";
import { PRODUCTS, formatPrice, type FilterValue, type SortValue } from "@/lib/products";
import { GradientDefs } from "./icons";
import { BackgroundOrbs } from "./BackgroundOrbs";
import { Topbar } from "./Topbar";
import { Hero } from "./Hero";
import { CatalogueControls } from "./CatalogueControls";
import { ProductGrid } from "./ProductGrid";
import { OrderPanel, type CartLine } from "./OrderPanel";
import { OrderModal } from "./OrderModal";
import { Footer } from "./Footer";

export function CatalogueApp() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [sort, setSort] = useState<SortValue>("featured");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStage, setModalStage] = useState<"confirm" | "done">("confirm");

  const visibleProducts = useMemo(() => {
    let list = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);
    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [filter, sort]);

  const cartLines: CartLine[] = useMemo(
    () =>
      Object.entries(cart)
        .filter(([, qty]) => qty > 0)
        .map(([id, qty]) => ({ product: PRODUCTS.find((p) => p.id === id)!, qty })),
    [cart]
  );

  const subtotal = cartLines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const cartCount = cartLines.reduce((sum, l) => sum + l.qty, 0);

  function handleAdd(id: string, qty: number) {
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + qty }));
  }

  function handleRemove(id: string) {
    setCart((c) => {
      const next = { ...c };
      delete next[id];
      return next;
    });
  }

  function handleSubmit() {
    setModalStage("confirm");
    setModalOpen(true);
  }

  function handleSend() {
    setModalStage("done");
  }

  function handleDone() {
    setCart({});
    setModalOpen(false);
    setCartOpen(false);
  }

  return (
    <>
      <GradientDefs />
      <BackgroundOrbs />
      <Topbar cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <Hero />

      <section id="catalogue" className="relative z-[1] max-w-[1360px] mx-auto px-[6vw] pt-2.5 pb-10">
        <div className="mb-[34px]">
          <h2 className="text-[1.9rem] text-ink-1">The full catalogue</h2>
          <p className="text-ink-2 mt-2">Filter by type, sort by price, and build your order below.</p>
        </div>

        <CatalogueControls filter={filter} sort={sort} onFilterChange={setFilter} onSortChange={setSort} />
        <ProductGrid products={visibleProducts} onAdd={handleAdd} />
      </section>

      <Footer />

      <OrderPanel
        open={cartOpen}
        lines={cartLines}
        subtotal={subtotal}
        onClose={() => setCartOpen(false)}
        onRemove={handleRemove}
        onSubmit={handleSubmit}
      />

      <OrderModal
        open={modalOpen}
        stage={modalStage}
        itemCount={cartCount}
        subtotalLabel={formatPrice(subtotal)}
        onCancel={() => setModalOpen(false)}
        onSend={handleSend}
        onDone={handleDone}
      />
    </>
  );
}
