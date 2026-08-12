"use client";

import Link from "next/link";
import { useState } from "react";
import { SiteFooter } from "../../../components/SiteFooter";
import { SiteHeader } from "../../../components/SiteHeader";
import type { Product } from "../../../lib/products";
import { whatsappUrl } from "../../../lib/products";

export function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [option, setOption] = useState(product.options[0]);
  const [details, setDetails] = useState("");

  const message = `Olá! Vim pelo catálogo da Ponto Único Personalizados e gostaria de solicitar um orçamento para ${product.name}.\n\nQuantidade: ${quantity}\nPersonalização: ${option}${details ? `\nDetalhes: ${details}` : ""}`;
  const addToQuote = () => {
    try {
      const items = JSON.parse(localStorage.getItem("ponto-unico-orcamento") || "[]") as { slug: string; name: string; quantity: number }[];
      const existing = items.find((item) => item.slug === product.slug);
      const next = existing ? items.map((item) => item.slug === product.slug ? { ...item, quantity: item.quantity + quantity } : item) : [...items, { slug: product.slug, name: product.name, quantity }];
      localStorage.setItem("ponto-unico-orcamento", JSON.stringify(next));
      window.dispatchEvent(new Event("quote-updated"));
      window.location.href = "/catalogo";
    } catch { window.location.href = "/catalogo"; }
  };

  return (
    <><SiteHeader catalog /><main className="product-page shell"><nav className="breadcrumbs" aria-label="Caminho de navegação"><Link href="/">Início</Link><span>›</span><Link href="/catalogo">Catálogo</Link><span>›</span><span>{product.name}</span></nav><div className="product-detail-grid"><div className="product-gallery"><div className="main-product-photo"><img src={product.image} alt={product.name} /></div><div className="gallery-note">Imagem de referência • sua peça será personalizada sob encomenda</div></div><section className="product-detail-copy"><p className="eyebrow">{product.category}</p><h1>{product.name}</h1><p className="product-description">{product.description}</p><strong className="consult-price">Preço sob consulta</strong><div className="detail-benefits"><span>♡ Feito sob encomenda</span><span>✦ Personalização exclusiva</span><span>→ Envio para todo o Brasil</span></div><fieldset><legend>O que deseja personalizar?</legend><div className="option-pills">{product.options.map((item) => <button type="button" className={option === item ? "active" : ""} onClick={() => setOption(item)} key={item}>{item}</button>)}</div></fieldset><label className="quantity-field">Quantidade<input type="number" min="1" value={quantity} onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))} /></label><label className="detail-field">Conte um pouco sobre a sua ideia<textarea value={details} onChange={(event) => setDetails(event.target.value)} placeholder="Nome, cores, tema, ocasião ou mensagem..." rows={4} /></label><a className="primary-button full" href={whatsappUrl(message)} target="_blank" rel="noreferrer">Quero personalizar</a><button className="secondary-button full" type="button" onClick={addToQuote}>Adicionar à lista de orçamento</button><small>A personalização e os valores serão combinados diretamente com a equipe pelo WhatsApp.</small></section></div></main><SiteFooter /></>
  );
}

