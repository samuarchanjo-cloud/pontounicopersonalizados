import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { whatsappUrl } from "../data/products";

export function SiteHeader({ catalog = false }) {
  const [open, setOpen] = useState(false);
  const [quoteCount, setQuoteCount] = useState(0);

  useEffect(() => {
    const sync = () => {
      try {
        const items = JSON.parse(localStorage.getItem("ponto-unico-orcamento") || "[]");
        setQuoteCount(items.reduce((sum, item) => sum + item.quantity, 0));
      } catch { setQuoteCount(0); }
    };
    sync();
    window.addEventListener("quote-updated", sync);
    return () => window.removeEventListener("quote-updated", sync);
  }, []);

  const generalMessage = "Olá! Vim pelo site da Ponto Único Personalizados e gostaria de saber mais sobre os personalizados.";
  return (
    <>
      <div className="announcement" aria-label="Diferenciais rápidos"><span>♡ Feito à mão com cuidado</span><span>✦ Enviamos para todo o Brasil</span><a href={whatsappUrl(generalMessage)} target="_blank" rel="noreferrer">Atendimento pelo WhatsApp</a></div>
      <header className={`site-header ${catalog ? "catalog-header" : ""}`}>
        <div className="header-inner">
          <Link className="brand" to="/" aria-label="Ponto Único — início">
            <span className="brand-rainbow" aria-hidden="true">🌈</span>
            <span className="brand-name">Ponto Único</span>
          </Link>
          <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Navegação principal">
            <Link to="/" onClick={() => setOpen(false)}>Início</Link><Link to="/#personalizados" onClick={() => setOpen(false)}>Personalizados</Link><Link to="/#como-funciona" onClick={() => setOpen(false)}>Como funciona</Link><Link to="/#trabalhos" onClick={() => setOpen(false)}>Trabalhos</Link><Link to="/#sobre" onClick={() => setOpen(false)}>Sobre nós</Link><Link to="/#contato" onClick={() => setOpen(false)}>Contato</Link>
          </nav>
          <div className="header-actions">
            {catalog ? <Link className="text-link" to="/">Voltar ao site</Link> : null}
            <Link className="catalog-button" to="/catalogo">{catalog ? `Orçamento${quoteCount ? ` (${quoteCount})` : ""}` : "Catálogo"}</Link>
            <button className="menu-button" type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /><span /></button>
          </div>
        </div>
      </header>
    </>
  );
}
