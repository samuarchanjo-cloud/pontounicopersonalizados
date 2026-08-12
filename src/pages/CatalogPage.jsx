import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Seo } from "../components/Seo";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { catalogCategories, products, whatsappUrl } from "../data/products";

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [quote, setQuote] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ponto-unico-orcamento") || "[]"); }
    catch { return []; }
  });
  const [quoteOpen, setQuoteOpen] = useState(false);

  const requestedCategory = searchParams.get("categoria") || "todos";
  const selectedCategory = catalogCategories.find((item) => item.slug === requestedCategory || item.name === requestedCategory);
  const categorySlug = selectedCategory?.slug || "todos";
  const categoryName = selectedCategory?.name || "Todos";
  const normalizedQuery = query.toLocaleLowerCase("pt-BR").trim();

  const visibleCategories = useMemo(() => catalogCategories.filter((item) => {
    const relatedProducts = products.filter((product) => product.categorySlug === item.slug);
    const haystack = `${item.name} ${item.keywords.join(" ")} ${relatedProducts.map((product) => product.name).join(" ")}`.toLocaleLowerCase("pt-BR");
    return !normalizedQuery || haystack.includes(normalizedQuery);
  }), [normalizedQuery]);

  const visibleProducts = useMemo(() => {
    if (categorySlug === "todos") return [];
    return products.filter((product) => {
      const haystack = `${product.name} ${product.category} ${product.keywords.join(" ")}`.toLocaleLowerCase("pt-BR");
      return product.categorySlug === categorySlug && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [categorySlug, normalizedQuery]);

  const saveQuote = (next) => { setQuote(next); localStorage.setItem("ponto-unico-orcamento", JSON.stringify(next)); window.dispatchEvent(new Event("quote-updated")); };
  const add = (slug, name) => { const existing = quote.find((item) => item.slug === slug); saveQuote(existing ? quote.map((item) => item.slug === slug ? { ...item, quantity:item.quantity + 1 } : item) : [...quote,{ slug,name,quantity:1 }]); setQuoteOpen(true); };
  const selectCategory = (slug) => { setSearchParams(slug === "todos" ? {} : { categoria:slug }); };
  const quoteMessage = `Olá! Vim pelo catálogo da Ponto Único Personalizados e gostaria de solicitar um orçamento:\n\n${quote.map((item) => `• ${item.quantity}x ${item.name}`).join("\n")}\n\nGostaria de receber mais informações sobre personalização e valores.`;
  const resultCount = categorySlug === "todos" ? visibleCategories.length : visibleProducts.length;
  const resultType = categorySlug === "todos" ? (resultCount === 1 ? "categoria" : "categorias") : (resultCount === 1 ? "produto" : "produtos");

  return <><Seo title="Catálogo de personalizados" description="Canecas, garrafas, papelaria, bolsas, necessaires e kits infantis personalizados. Solicite seu orçamento pelo WhatsApp." /><SiteHeader catalog /><main className="catalog-main">
    <section className="catalog-hero shell"><div><p className="eyebrow">Feitos para contar histórias</p><h1>Catálogo Ponto Único</h1><p>Escolha um produto, imagine a personalização e peça seu orçamento.</p></div></section>
    <section className="catalog-tools shell"><label className="search-box"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="O que você procura?" aria-label="Buscar por nome, categoria ou palavra-chave" /></label><button className="quote-toggle" type="button" onClick={() => setQuoteOpen(!quoteOpen)}>Minha lista <span>{quote.reduce((sum,item) => sum + item.quantity,0)}</span></button></section>
    <nav className="category-scroll shell" aria-label="Categorias do catálogo"><button type="button" className={categorySlug === "todos" ? "active" : ""} onClick={() => selectCategory("todos")}>Todos</button>{catalogCategories.map((item) => <button type="button" className={categorySlug === item.slug ? "active" : ""} onClick={() => selectCategory(item.slug)} key={item.slug}>{item.name}</button>)}</nav>
    <div className="catalog-layout shell"><section className="product-results" aria-live="polite"><div className="results-heading"><div><p className="eyebrow">{categoryName}</p><h2>{resultCount ? `${resultCount} ${resultType}` : "Nenhum produto encontrado"}</h2></div><span>Preços sob consulta</span></div>
      {categorySlug === "todos" && visibleCategories.length ? <div className="product-grid category-product-grid">{visibleCategories.map((item) => <article className="product-card catalog-category-card" key={item.slug}><Link to={`/catalogo?categoria=${item.slug}`} className="product-image"><img src={item.image} alt={`${item.name} personalizados da Ponto Único`} loading="lazy" width="960" height="960" /></Link><div className="product-info"><span>Categoria</span><h3>{item.name}</h3><p>{item.count} {item.count === 1 ? "item disponível" : "itens disponíveis"}</p><div><Link className="outline-button" to={`/catalogo?categoria=${item.slug}`}>Ver itens</Link></div></div></article>)}</div> : null}
      {categorySlug !== "todos" && visibleProducts.length ? <div className="product-grid">{visibleProducts.map((product) => <article className="product-card" key={product.slug}><Link to={`/catalogo/${product.slug}`} className="product-image"><img src={product.image} alt={product.name} loading="lazy" width="960" height="960" /></Link><div className="product-info"><span>{product.category}</span><h3>{product.name}</h3><p>{product.short}</p><strong>Preço sob consulta</strong><div><Link className="outline-button" to={`/catalogo/${product.slug}`}>Visualizar</Link><button className="add-button" type="button" onClick={() => add(product.slug,product.name)} aria-label={`Adicionar ${product.name} à lista de orçamento`}>＋</button></div></div></article>)}</div> : null}
      {!resultCount ? <div className="empty-state"><span>♡</span><p>Não encontramos itens com esse termo. Conte o que procura e nós ajudamos.</p><a className="primary-button" href={whatsappUrl("Olá! Vim pelo catálogo da Ponto Único Personalizados e não encontrei o que procuro. Podem me ajudar?")} target="_blank" rel="noreferrer">Pedir ajuda no WhatsApp</a></div> : null}
    </section><aside className={`quote-panel ${quoteOpen ? "is-open" : ""}`} aria-label="Lista de orçamento"><button type="button" className="quote-close" onClick={() => setQuoteOpen(false)} aria-label="Fechar lista">×</button><p className="eyebrow">Sem compromisso</p><h2>Minha lista de orçamento</h2>{quote.length ? <><div className="quote-items">{quote.map((item) => <div key={item.slug}><span>{item.name}</span><label>Qtd. <input type="number" min="1" value={item.quantity} onChange={(event) => saveQuote(quote.map((quoteItem) => quoteItem.slug === item.slug ? { ...quoteItem,quantity:Math.max(1,Number(event.target.value)) } : quoteItem))} /></label><button type="button" onClick={() => saveQuote(quote.filter((quoteItem) => quoteItem.slug !== item.slug))}>Remover</button></div>)}</div><a className="primary-button full" href={whatsappUrl(quoteMessage)} target="_blank" rel="noreferrer">Solicitar pelo WhatsApp</a></> : <div className="quote-empty"><span>♡</span><p>Adicione produtos para montar sua lista.</p></div>}<small>Nenhum pedido será confirmado aqui. A equipe vai orientar você sobre personalização e valores pelo WhatsApp.</small></aside></div>
    <section className="seasonal shell"><div className="section-heading compact"><p className="eyebrow">Inspirações sazonais</p><h2>Datas especiais <span>♡</span></h2><p>Coleções são preparadas conforme cada época do ano.</p></div><div className="season-grid">{["Dia das Mães","Dia dos Pais","Páscoa","Natal","Volta às aulas","Professores","Formaturas"].map((name) => <a href={whatsappUrl(`Olá! Vim pelo catálogo da Ponto Único Personalizados e gostaria de conhecer as opções para ${name}.`)} target="_blank" rel="noreferrer" key={name}>{name}<span>Consultar →</span></a>)}</div></section>
  </main><SiteFooter /></>;
}
