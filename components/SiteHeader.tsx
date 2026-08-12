"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { whatsappUrl } from "../lib/products";

type SiteHeaderProps = { catalog?: boolean };

export function SiteHeader({ catalog = false }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [quoteCount, setQuoteCount] = useState(0);

  useEffect(() => {
    const sync = () => {
      try {
        const items = JSON.parse(localStorage.getItem("ponto-unico-orcamento") || "[]") as { quantity: number }[];
        setQuoteCount(items.reduce((sum, item) => sum + item.quantity, 0));
      } catch {
        setQuoteCount(0);
      }
    };
    sync();
    window.addEventListener("quote-updated", sync);
    return () => window.removeEventListener("quote-updated", sync);
  }, []);

  const generalMessage = "Olá! Vim pelo site da Ponto Único Personalizados e gostaria de saber mais sobre os personalizados.";

  return (
    <>
      <div className="announcement" aria-label="Diferenciais rápidos">
        <span>♡ Feito à mão com cuidado</span><span>✦ Enviamos para todo o Brasil</span><a href={whatsappUrl(generalMessage)} target="_blank" rel="noreferrer">Atendimento pelo WhatsApp</a>
      </div>
      <header className={`site-header ${catalog ? "catalog-header" : ""}`}>
        <div className="header-inner">
          <Link className="brand" href="/" aria-label="Ponto Único Personalizados — início">
            <img src="/assets/logo/logo.jpeg" alt="Ponto Único Personalizados" width="150" height="150" />
          </Link>
          <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Navegação principal">
            <Link href="/" onClick={() => setOpen(false)}>Início</Link>
            <Link href="/#personalizados" onClick={() => setOpen(false)}>Personalizados</Link>
            <Link href="/#como-funciona" onClick={() => setOpen(false)}>Como funciona</Link>
            <Link href="/#trabalhos" onClick={() => setOpen(false)}>Trabalhos</Link>
            <Link href="/#sobre" onClick={() => setOpen(false)}>Sobre nós</Link>
            <Link href="/#contato" onClick={() => setOpen(false)}>Contato</Link>
          </nav>
          <div className="header-actions">
            {catalog ? <Link className="text-link" href="/">Voltar ao site</Link> : null}
            <Link className="catalog-button" href="/catalogo">{catalog ? `Orçamento${quoteCount ? ` (${quoteCount})` : ""}` : "Catálogo"}</Link>
            <button className="menu-button" type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

