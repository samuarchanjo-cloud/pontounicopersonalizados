import { useEffect } from "react";

const defaultTitle = "Ponto Único Personalizados | Presentes personalizados em Jacarepaguá";
const defaultDescription = "Presentes, canecas, garrafas, papelaria e lembranças personalizadas em Jacarepaguá, Rio de Janeiro. Feitos sob encomenda e enviados para todo o Brasil.";

function setMeta(selector, attribute, value) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    const [key, rawValue] = selector.match(/meta\[([^=]+)="([^"]+)"\]/)?.slice(1) || [];
    if (key && rawValue) element.setAttribute(key, rawValue);
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

export function Seo({ title, description = defaultDescription, image = "/og.png" }) {
  useEffect(() => {
    const pageTitle = title ? `${title} | Ponto Único Personalizados` : defaultTitle;
    const absoluteImage = new URL(image, window.location.origin).toString();
    document.title = pageTitle;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", pageTitle);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", window.location.href);
    setMeta('meta[property="og:image"]', "content", absoluteImage);
    setMeta('meta[name="twitter:title"]', "content", pageTitle);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", absoluteImage);
  }, [title, description, image]);

  return null;
}

