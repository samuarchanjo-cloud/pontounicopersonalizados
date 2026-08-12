import { Link } from "react-router-dom";
import { whatsappUrl } from "../data/products";

export function SiteFooter() {
  const message = "Olá! Vim pelo site da Ponto Único Personalizados e gostaria de saber mais sobre os personalizados.";
  return <footer className="site-footer"><div className="footer-grid shell"><div className="footer-brand"><img src="/assets/logo/logo.jpeg" alt="Ponto Único Personalizados" width="150" height="150" loading="lazy" /><p>Presentes feitos à mão com amor e significado.</p></div><div><h3>Navegação</h3><Link to="/">Início</Link><Link to="/#personalizados">Personalizados</Link><Link to="/#como-funciona">Como funciona</Link><Link to="/#trabalhos">Trabalhos</Link><Link to="/catalogo">Catálogo</Link></div><div><h3>Fale com a gente</h3><a href={whatsappUrl(message)} target="_blank" rel="noreferrer">WhatsApp: (21) 98392-1115</a><a href="https://www.instagram.com/pontounicopersonalizados_/" target="_blank" rel="noreferrer">Instagram: @pontounicopersonalizados_</a><p>Estrada do Camorim, 120 - Jacarepaguá - Rio de Janeiro/RJ</p></div><div><h3>De onde você estiver</h3><p>Produzimos sob encomenda e enviamos para todo o Brasil.</p><Link className="footer-cta" to="/catalogo">Conhecer o catálogo →</Link></div></div><div className="copyright">© {new Date().getFullYear()} Ponto Único Personalizados. Todos os direitos reservados.</div></footer>;
}
