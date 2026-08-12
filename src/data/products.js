const categoryDefinitions = [
  { slug:"acessorios", name:"Acessórios", folder:"acessorios", cover:"porta-joias", keywords:["porta-joias","acessório"] },
  { slug:"blusas", name:"Blusas", folder:"blusas", cover:"camisa", keywords:["blusa","camisa","vestuário"] },
  { slug:"bolsas", name:"Bolsas", folder:"bolsas", cover:"bolsa-feira", keywords:["bolsa","shoulder bag"] },
  { slug:"canecas", name:"Canecas", folder:"caneca", cover:"caneca-personalizada", keywords:["caneca","presente"] },
  { slug:"garrafas", name:"Garrafas", folder:"garrafa", cover:"garrafa-infantil-patrulha-canina", keywords:["garrafa","térmica","squeeze"] },
  { slug:"infantil", name:"Infantil", folder:"infantil", cover:"mochila_ursinho_azul", keywords:["infantil","criança","escolar"] },
  { slug:"necessaires", name:"Necessaires", folder:"necessaeire", cover:"necessaeire-personalizada", keywords:["necessaire","carteira","estojo"] },
  { slug:"papelaria", name:"Encadernação", folder:"papelaria", cover:"agenda", keywords:["agenda","caderno","caderneta"] },
  { slug:"presentes", name:"Presentes", folder:"presentes", cover:"caneca-personalizada-2", keywords:["presente","lembrança"] },
];

const productDefinitions = [
  ["acessorios","porta-joias","Porta-joias personalizado"],
  ["blusas","camisa","Camisa personalizada"],
  ["blusas","camisa-2","Camisa personalizada 2"],
  ["blusas","camisa-3","Camisa personalizada 3"],
  ["bolsas","bolsa-feira","Bolsa para feira personalizada"],
  ["bolsas","bolsa-pokemon","Bolsa Pokémon personalizada"],
  ["bolsas","shouderbag","Shoulder bag personalizada"],
  ["bolsas","shouderbag-2","Shoulder bag personalizada 2"],
  ["bolsas","shouderbag-3","Shoulder bag personalizada 3"],
  ["bolsas","shouderbag-4","Shoulder bag personalizada 4"],
  ["canecas","caneca-personalizada","Caneca personalizada"],
  ["canecas","caneca-personalizada-2","Caneca personalizada 2"],
  ["canecas","caneca-personalizada-3","Caneca personalizada 3"],
  ["canecas","caneca-personalizada-4","Caneca personalizada 4"],
  ["garrafas","garrafa-infantil-patrulha-canina","Garrafa infantil Patrulha Canina"],
  ["garrafas","garrafa-termica-personalizada","Garrafa térmica personalizada"],
  ["garrafas","garrafa-termica-personalizada-2","Garrafa térmica personalizada 2"],
  ["garrafas","garrafa-termica-personalizada-3","Garrafa térmica personalizada 3"],
  ["garrafas","garrafa-termica-personalizada-4","Garrafa térmica personalizada 4"],
  ["infantil","almofada-de-colorir","Almofada de colorir personalizada"],
  ["infantil","bobbiegoods","Caderno Bobbie Goods personalizado"],
  ["infantil","caderno-de-colorir","Caderno de colorir personalizado"],
  ["infantil","mochila_astronauta","Mochila astronauta personalizada"],
  ["infantil","mochila_mario","Mochila Mario personalizada"],
  ["infantil","mochila_ursinho_azul","Mochila ursinho azul personalizada"],
  ["infantil","mochila_ursinho_rosa","Mochila ursinho rosa personalizada"],
  ["necessaires","carteira","Carteira personalizada"],
  ["necessaires","carteira-2","Carteira personalizada 2"],
  ["necessaires","necessaeire-personalizada","Necessaire personalizada"],
  ["necessaires","necessaeire-personalizada-2","Necessaire personalizada 2"],
  ["necessaires","necessaeire-personalizada-3","Necessaire personalizada 3"],
  ["papelaria","agenda","Agenda personalizada"],
  ["papelaria","agenda-2","Agenda personalizada 2"],
  ["papelaria","agenda-3","Agenda personalizada 3"],
  ["papelaria","caderneta-de-vacinacao","Caderneta de vacinação personalizada"],
  ["papelaria","caderneta-de-vacinacao-2","Caderneta de vacinação personalizada 2"],
  ["papelaria","caderneta-de-vacinacao-3","Caderneta de vacinação personalizada 3"],
  ["papelaria","caderneta-de-vacinacao-roblox","Caderneta de vacinação Roblox"],
  ["presentes","camisa-2","Camisa personalizada para presente"],
  ["presentes","caneca-personalizada-2","Caneca personalizada para presente"],
  ["presentes","garrafa-termica-personalizada-3","Garrafa térmica para presente"],
  ["presentes","shouderbag-2","Shoulder bag para presente"],
];

const categoryBySlug = Object.fromEntries(categoryDefinitions.map((category) => [category.slug, category]));

export const products = productDefinitions.map(([categorySlug, file, name]) => {
  const category = categoryBySlug[categorySlug];
  return {
    slug:`${categorySlug}-${file.replaceAll("_","-")}`,
    name,
    category:category.name,
    categorySlug,
    sourceFolder:category.folder,
    image:`/assets/categorias/${category.folder}/${file}.webp`,
    short:"Peça personalizada e produzida sob encomenda.",
    description:"Peça personalizada sob encomenda, preparada com cuidado para combinar com o nome, tema ou ocasião escolhida.",
    keywords:[...category.keywords, ...name.toLocaleLowerCase("pt-BR").split(" ")],
    options:["Nome","Frase","Tema especial"],
  };
});

export const catalogCategories = categoryDefinitions.map((category) => ({
  ...category,
  image:`/assets/categorias/${category.folder}/${category.cover}.webp`,
  count:products.filter((product) => product.categorySlug === category.slug).length,
}));

// Cards da página institucional permanecem com a composição visual já aprovada.
export const categories = [
  { name:"Canecas", slug:"canecas", image:"/assets/categoria-canecas.webp" },
  { name:"Garrafas", slug:"garrafas", image:"/assets/categoria-garrafas.webp" },
  { name:"Encadernação", slug:"papelaria", image:"/assets/categoria-papelaria.webp" },
  { name:"Bolsas", slug:"bolsas", image:"/assets/categoria-bolsas.webp" },
  { name:"Necessaires", slug:"necessaires", image:"/assets/categoria-necessaires.webp" },
  { name:"Infantil", slug:"infantil", image:"/assets/categoria-infantil.webp" },
];

const featuredSlugs = [
  "canecas-caneca-personalizada",
  "garrafas-garrafa-termica-personalizada",
  "papelaria-agenda",
  "bolsas-bolsa-feira",
  "necessaires-necessaeire-personalizada",
  "infantil-mochila-ursinho-azul",
];
export const featuredProducts = featuredSlugs.map((slug) => products.find((product) => product.slug === slug)).filter(Boolean);

export const whatsappNumber = "5521983921115";
export function whatsappUrl(message) { return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`; }
