import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { categories, products, whatsappUrl } from "../lib/products";

export default function Home() {
  const message = "Olá! Vim pelo site da Ponto Único Personalizados e gostaria de saber mais sobre os personalizados.";
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content shell">
            <div className="hero-copy">
              <p className="eyebrow">Ponto Único Personalizados</p>
              <h1 id="hero-title">Presentes que <span>contam histórias</span></h1>
              <p className="hero-lead">Personalizados feitos à mão com amor para transformar momentos em lembranças únicas.</p>
              <div className="hero-actions"><Link className="primary-button" href="/catalogo">Ver catálogo</Link><a className="secondary-button" href={whatsappUrl(message)} target="_blank" rel="noreferrer">Fale no WhatsApp</a></div>
            </div>
          </div>
        </section>

        <section className="trust-strip shell" aria-label="Nossos diferenciais">
          {[
            ["♡", "Feito à mão com amor", "Cada peça recebe carinho e atenção aos detalhes."],
            ["✈", "Enviamos para todo o Brasil", "Seu pedido chega onde estiver."],
            ["✦", "Atendimento personalizado", "Criamos algo único com você."],
            ["✓", "Feito sob encomenda", "Personalização pensada para cada história."],
          ].map(([icon, title, text]) => <article className="trust-item" key={title}><span>{icon}</span><div><h2>{title}</h2><p>{text}</p></div></article>)}
        </section>

        <section className="section shell" id="personalizados">
          <div className="section-heading"><p className="eyebrow">Escolha por categoria</p><h2>Personalizados para cada momento <span>♡</span></h2><p>Descubra ideias criadas para presentear, organizar e tornar a rotina mais especial.</p></div>
          <div className="category-grid">
            {categories.map((category) => <Link className="category-card" href={`/catalogo?categoria=${encodeURIComponent(category.name)}`} key={category.name}><img src={category.image} alt={`${category.name} personalizados da Ponto Único`} loading="lazy" /><span>{category.name}<small>Ver produtos →</small></span></Link>)}
          </div>
        </section>

        <section className="section how-section" id="como-funciona">
          <div className="shell"><div className="section-heading compact"><p className="eyebrow">Do seu jeito</p><h2>Como funciona <span>♡</span></h2></div>
            <div className="steps">
              {[
                ["01", "Você escolhe", "Encontre seu produto favorito no catálogo."],
                ["02", "Personalizamos", "Conte o nome, frase, cores ou tema desejado."],
                ["03", "Produzimos", "Fazemos tudo com cuidado e atenção aos detalhes."],
                ["04", "Enviamos", "Seu pedido segue com carinho para todo o Brasil."],
              ].map(([n, title, text]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="section shell" id="trabalhos">
          <div className="section-heading"><p className="eyebrow">Feitos para encantar</p><h2>Trabalhos que amamos fazer <span>♡</span></h2><p>Uma amostra dos produtos que podem ganhar o seu nome, a sua mensagem e o seu significado.</p></div>
          <div className="work-grid">
            {products.map((product, index) => <Link href={`/catalogo/${product.slug}`} className={`work-card work-${index + 1}`} key={product.slug}><img src={product.image} alt={product.name} loading="lazy" /><span>{product.name}</span></Link>)}
          </div>
          <div className="center"><Link className="primary-button" href="/catalogo">Ver todos os personalizados</Link></div>
        </section>

        <section className="section about-section" id="sobre">
          <div className="shell about-grid">
            <div className="founder-photo"><img src="/assets/sobre-fundadora.webp" alt="Simone de Almeida, fundadora da Ponto Único Personalizados" loading="lazy" /></div>
            <div className="about-copy"><p className="eyebrow">Sobre a Ponto Único</p><h2>Feito com amor para transformar momentos em lembranças.</h2><p>Simone de Almeida é a fundadora da Ponto Único Personalizados. Cada criação nasce do cuidado artesanal, da escuta e da dedicação aos detalhes para transformar uma ideia em algo verdadeiramente especial.</p><p>Da escolha do produto à personalização, você conta com um atendimento próximo e uma peça feita sob encomenda para contar a sua história.</p><a className="secondary-button" href={whatsappUrl("Olá! Conheci a história da Ponto Único Personalizados no site e gostaria de criar um presente especial.")} target="_blank" rel="noreferrer">Conte sua ideia para a Simone</a></div>
          </div>
        </section>

        <section className="section contact-section" id="contato">
          <div className="shell contact-card"><div><p className="eyebrow">Vamos criar juntos?</p><h2>Seu presente único começa com uma conversa.</h2><p>Atendimento personalizado em Jacarepaguá e envios para todo o Brasil.</p></div><div className="contact-links"><a href={whatsappUrl(message)} target="_blank" rel="noreferrer"><strong>WhatsApp</strong><span>(21) 98392-1115</span></a><a href="https://www.google.com/maps/search/?api=1&query=Estrada+do+Camorim%2C+120+-+Jacarepagu%C3%A1+-+Rio+de+Janeiro%2FRJ" target="_blank" rel="noreferrer"><strong>Endereço</strong><span>Estrada do Camorim, 120 - Jacarepaguá - Rio de Janeiro/RJ</span></a><a href="https://www.instagram.com/pontounicopersonalizados_/" target="_blank" rel="noreferrer"><strong>Instagram</strong><span>@pontounicopersonalizados_</span></a></div></div>
        </section>
      </main>
      <SiteFooter />
      <a className="floating-whatsapp" href={whatsappUrl(message)} target="_blank" rel="noreferrer" aria-label="Falar com a Ponto Único pelo WhatsApp">WhatsApp</a>
    </>
  );
}
