import type { Metadata } from "next";
import { CatalogClient } from "./CatalogClient";

export const metadata: Metadata = {
  title: "Catálogo de personalizados",
  description: "Canecas, garrafas, papelaria, bolsas, necessaires e kits infantis personalizados. Solicite seu orçamento pelo WhatsApp.",
};

export default function CatalogPage() {
  return <CatalogClient />;
}

