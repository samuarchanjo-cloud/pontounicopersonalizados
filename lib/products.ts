export type Product = {
  slug: string;
  name: string;
  category: string;
  image: string;
  short: string;
  description: string;
  keywords: string[];
  options: string[];
};

export const products: Product[] = [
  {
    slug: "caneca-personalizada",
    name: "Caneca personalizada",
    category: "Canecas",
    image: "/assets/categoria-canecas.webp",
    short: "Uma lembrança única para presentear com significado.",
    description: "Caneca feita sob encomenda, com arte desenvolvida para combinar com a pessoa, ocasião ou mensagem que você deseja celebrar.",
    keywords: ["caneca", "presente", "lembrança", "personalizada"],
    options: ["Nome", "Frase", "Tema especial"],
  },
  {
    slug: "garrafa-personalizada",
    name: "Garrafa personalizada",
    category: "Garrafas",
    image: "/assets/categoria-garrafas.webp",
    short: "Prática, delicada e criada especialmente para você.",
    description: "Garrafa personalizada sob encomenda para presentear, levar na rotina ou compor kits especiais.",
    keywords: ["garrafa", "squeeze", "presente", "personalizada"],
    options: ["Nome", "Frase", "Tema especial"],
  },
  {
    slug: "caderno-personalizado",
    name: "Caderno personalizado",
    category: "Papelaria",
    image: "/assets/categoria-papelaria.webp",
    short: "Papelaria que organiza e guarda histórias.",
    description: "Caderno personalizado com composição visual feita para o seu tema, nome ou ocasião.",
    keywords: ["caderno", "agenda", "papelaria", "escolar"],
    options: ["Nome", "Frase", "Tema especial"],
  },
  {
    slug: "bolsa-personalizada",
    name: "Bolsa personalizada",
    category: "Bolsas",
    image: "/assets/categoria-bolsas.webp",
    short: "Um presente útil com identidade e carinho.",
    description: "Bolsa personalizada sob encomenda para presentear ou tornar a rotina ainda mais especial.",
    keywords: ["bolsa", "presente", "nome", "personalizada"],
    options: ["Nome", "Tema especial", "Ocasião"],
  },
  {
    slug: "necessaire-personalizada",
    name: "Necessaire personalizada",
    category: "Necessaires",
    image: "/assets/categoria-necessaires.webp",
    short: "Delicadeza e praticidade em cada detalhe.",
    description: "Necessaire personalizada para organizar, viajar e presentear com uma criação feita especialmente para você.",
    keywords: ["necessaire", "estojo", "viagem", "presente"],
    options: ["Nome", "Tema especial", "Ocasião"],
  },
  {
    slug: "kit-infantil-personalizado",
    name: "Kit infantil personalizado",
    category: "Infantil",
    image: "/assets/categoria-infantil.webp",
    short: "Para a rotina dos pequenos ficar cheia de personalidade.",
    description: "Kit infantil feito sob encomenda com tema e nome escolhidos para tornar cada momento mais divertido e único.",
    keywords: ["infantil", "escolar", "kit", "criança"],
    options: ["Nome", "Personagem ou tema", "Ocasião"],
  },
];

export const categories = [
  { name: "Canecas", image: "/assets/categoria-canecas.webp" },
  { name: "Garrafas", image: "/assets/categoria-garrafas.webp" },
  { name: "Papelaria", image: "/assets/categoria-papelaria.webp" },
  { name: "Bolsas", image: "/assets/categoria-bolsas.webp" },
  { name: "Necessaires", image: "/assets/categoria-necessaires.webp" },
  { name: "Infantil", image: "/assets/categoria-infantil.webp" },
];

export const whatsappNumber = "5521983921115";

export function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
