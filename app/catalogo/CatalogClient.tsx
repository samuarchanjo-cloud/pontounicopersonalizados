"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { categories, products, whatsappUrl } from "../../lib/products";

type QuoteItem = { slug: string; name: string; quantity: number };

export function CatalogClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [quote, setQuote] = useState<QuoteItem[]>([]);
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("categoria");
    if (param) setCategory(param);
    try { setQuote(JSON.parse(localStorage.getItem("ponto-unico-orcamento") || "[]")); } catch { setQuote([]); }
  }, []);

  const saveQuote = (next: QuoteItem[]) => {
    setQuote(next);
    localStorage.setItem("ponto-unico-orcamento", JSON.stringify(next));
    window.dispatchEvent(new Event("quote-updated"));
  };

  const add = (slug: string, name: string) => {
    const existing = quote.find((item) => item.slug === slug);
    saveQuote(existing ? quote.map((item) => item.slug === slug ? { ...item, quantity: item.quantity + 1 } : item) : [...quote, { slug, name, quantity: 1 }]);
    setQuoteOpen(true);
  };

  const filtered = useMemo(() => {
    const normalized = query.toLocaleLowerCase("pt-BR").trim();
    return products.filter((product) => {
      const matchesCategory = category === "Todos" || product.category === category;
      const haystack = `${product.name} ${product.category} ${product.keywords.join(" ")}`.toLocaleLowerCase("pt-BR");
      return matchesCategory && (!normalized || haystack.includes(normalized));
    });
  }, [query, category]);

  const quoteMessage = `Olá! Vim pelo catálogo da Ponto Único Personalizados e gostaria de solicitar um orçamento:\n\n${quote.map((item) => `• ${item.quantity}x ${item.name}`).join("\n")}\n\nGostaria de receber mais informações sobre personalização e valores.`;
  const navCategories = ["Todos", ...categories.map((item) => item.name), "Camisas", "Presentes", "Datas especiais"];

  return (
    <>
      <SiteHeader catalog />
      <main className="catalog-main">
        <section className="catalog-hero shell"><div><p className="eyebrow">Feitos para contar histórias</p><h1>Catálogo Ponto Único</h1><p>Escolha um produto, imagine a personalização e peça seu orçamento.</p></div></section>
        <section className="catalog-tools shell">
          <label className="search-box"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="O que você procura?" aria-label="Buscar por nome, categoria ou palavra-chave" /></label>
          <button className="quote-toggle" type="button" onClick={() => setQuoteOpen(!quoteOpen)}>Minha lista <span>{quote.reduce((sum, item) => sum + item.quantity, 0)}</span></button>
        </section>
        <nav className="category-scroll shell" aria-label="Categorias do catálogo">
          {navCategories.map((name) => <button type="button" className={category === name ? "active" : ""} onClick={() => setCategory(name)} key={name}>{name}</button>)}
        </nav>
        <div className="catalog-layout shell">
          <section className="product-results" aria-live="polite">
            <div className="results-heading"><div><p className="eyebrow">{category}</p><h2>{filtered.length ? `${filtered.length} ${filtered.length === 1 ? "produto" : "produtos"}` : "Nenhum produto encontrado"}</h2></div><span>Preços sob consulta</span></div>
            {filtered.length ? <div className="product-grid">{filtered.map((product) => <article className="product-card" key={product.slug}><Link href={`/catalogo/${product.slug}`} className="product-image"><img src={product.image} alt={product.name} loading="lazy" /></Link><div className="product-info"><span>{product.category}</span><h3>{product.name}</h3><p>{product.short}</p><strong>Preço sob consulta</strong><div><Link className="outline-button" href={`/catalogo/${product.slug}`}>Ver detalhes</Link><button className="add-button" type="button" onClick={() => add(product.slug, product.name)} aria-label={`Adicionar ${product.name} à lista de orçamento`}>＋</button></div></div></article>)}</div> : <div className="empty-state"><span>♡</span><p>Esta categoria será atualizada com novidades. Enquanto isso, conte o que procura e nós ajudamos.</p><a className="primary-button" href={whatsappUrl("Olá! Vim pelo catálogo da Ponto Único Personalizados e não encontrei o que procuro. Podem me ajudar?")} target="_blank" rel="noreferrer">Pedir ajuda no WhatsApp</a></div>}
          </section>
          <aside className={`quote-panel ${quoteOpen ? "is-open" : ""}`} aria-label="Lista de orçamento">
            <button type="button" className="quote-close" onClick={() => setQuoteOpen(false)} aria-label="Fechar lista">×</button><p className="eyebrow">Sem compromisso</p><h2>Minha lista de orçamento</h2>
            {quote.length ? <><div className="quote-items">{quote.map((item) => <div key={item.slug}><span>{item.name}</span><label>Qtd. <input type="number" min="1" value={item.quantity} onChange={(event) => saveQuote(quote.map((quoteItem) => quoteItem.slug === item.slug ? { ...quoteItem, quantity: Math.max(1, Number(event.target.value)) } : quoteItem))} /></label><button type="button" onClick={() => saveQuote(quote.filter((quoteItem) => quoteItem.slug !== item.slug))}>Remover</button></div>)}</div><a className="primary-button full" href={whatsappUrl(quoteMessage)} target="_blank" rel="noreferrer">Solicitar pelo WhatsApp</a></> : <div className="quote-empty"><span>♡</span><p>Adicione produtos para montar sua lista.</p></div>}
            <small>Nenhum pedido será confirmado aqui. A equipe vai orientar você sobre personalização e valores pelo WhatsApp.</small>
          </aside>
        </div>
        <section className="seasonal shell"><div className="section-heading compact"><p className="eyebrow">Inspirações sazonais</p><h2>Datas especiais <span>♡</span></h2><p>Coleções são preparadas conforme cada época do ano.</p></div><div className="season-grid">{["Dia das Mães", "Dia dos Pais", "Páscoa", "Natal", "Volta às aulas", "Professores", "Formaturas"].map((name) => <a href={whatsappUrl(`Olá! Vim pelo catálogo da Ponto Único Personalizados e gostaria de conhecer as opções para ${name}.`)} target="_blank" rel="noreferrer" key={name}>{name}<span>Consultar →</span></a>)}</div></section>
      </main>
      <SiteFooter />
    </>
  );
}

