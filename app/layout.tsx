import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito_Sans } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700"], display: "swap" });
const body = Nunito_Sans({ variable: "--font-body", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const base = new URL(`${protocol}://${host}`);
  return {
    metadataBase: base,
    title: { default: "Ponto Único Personalizados | Presentes personalizados em Jacarepaguá", template: "%s | Ponto Único Personalizados" },
    description: "Presentes, canecas, garrafas, papelaria e lembranças personalizadas em Jacarepaguá, Rio de Janeiro. Feitos sob encomenda e enviados para todo o Brasil.",
    keywords: ["personalizados em Jacarepaguá", "presentes personalizados", "canecas personalizadas", "garrafas personalizadas", "papelaria personalizada", "lembranças personalizadas", "brindes personalizados no Rio de Janeiro"],
    openGraph: { type: "website", locale: "pt_BR", siteName: "Ponto Único Personalizados", title: "Presentes que contam histórias", description: "Personalizados feitos à mão com amor para transformar momentos em lembranças únicas.", images: [{ url: new URL("/og.png", base).toString(), width: 1200, height: 630, alt: "Ponto Único Personalizados — presentes que contam histórias" }] },
    twitter: { card: "summary_large_image", title: "Ponto Único Personalizados", description: "Presentes que contam histórias, feitos sob encomenda.", images: [new URL("/og.png", base).toString()] },
    icons: { icon: "/assets/logo/logo.jpeg", shortcut: "/assets/logo/logo.jpeg" },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Ponto Único Personalizados",
    founder: { "@type": "Person", name: "Simone de Almeida" },
    telephone: "+55 21 98392-1115",
    address: { "@type": "PostalAddress", streetAddress: "Estrada do Camorim, 120", addressLocality: "Rio de Janeiro", addressRegion: "RJ", addressCountry: "BR" },
    areaServed: { "@type": "Country", name: "Brasil" },
    sameAs: ["https://www.instagram.com/pontounicopersonalizados_/"],
  };
  return <html lang="pt-BR"><body className={`${display.variable} ${body.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{children}</body></html>;
}
