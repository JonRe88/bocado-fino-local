import { useEffect, useRef, useState } from "react";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale, .gold-line-expand",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#inicio", label: "Inicio" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#menu", label: "Menú" },
    { href: "#paquetes", label: "Paquetes" },
    { href: "#comentarios", label: "Reseñas" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "nav-blur py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3 group">
          <img
            src="/iconobocado.png"
            alt="Bocado Fino"
            className="w-10 h-10 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="hidden sm:block">
            <p className="gold-text font-serif text-lg font-bold leading-none tracking-widest uppercase">
              Bocado Fino
            </p>
            <p className="text-xs tracking-[0.3em] text-amber-400/60 uppercase mt-0.5">
              Catering
            </p>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-widest uppercase text-amber-100/70 hover:text-amber-400 transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <a
          href="#contacto"
          className="hidden md:block btn-gold text-xs tracking-widest"
        >
          Reservar
        </a>

        <button
          className="md:hidden text-amber-400 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className="space-y-1.5">
            <span
              className={`block w-6 h-px bg-amber-400 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-amber-400 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-px bg-amber-400 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden nav-blur border-t border-amber-900/20 mt-2 py-4 px-6 space-y-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm tracking-widest uppercase text-amber-100/70 hover:text-amber-400 transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="w-full h-full" style={{ background: "#000000" }} />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      <div className="particles absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-amber-400/20"
            style={{
              left: `${(i * 8.3) % 100}%`,
              top: `${(i * 13.7) % 100}%`,
              animation: `float ${3 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${i % 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div
          className="animate-fadeIn"
          style={{ animationDelay: "0.1s", animationFillMode: "both" }}
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden animate-goldPulse border-2 border-amber-400/40">
            <img
              src="/iconobocado.png"
              alt="Bocado Fino"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div
          className="animate-fadeInUp"
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        >
          <p className="text-xs tracking-[0.5em] uppercase text-amber-400/70 mb-3 font-sans">
            — Catering de Lujo —
          </p>
        </div>

        <div
          className="animate-fadeInUp"
          style={{ animationDelay: "0.4s", animationFillMode: "both" }}
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-light leading-none mb-4 gold-shimmer">
            Bocado
            <br />
            <span className="italic">Fino</span>
          </h1>
        </div>

        <div
          className="animate-fadeInUp"
          style={{ animationDelay: "0.6s", animationFillMode: "both" }}
        >
          <div className="gold-line my-6 mx-auto max-w-xs" />
          <p className="text-base sm:text-lg md:text-xl text-amber-100/70 font-serif italic max-w-xl mx-auto leading-relaxed mb-8">
            Menú de Selección Artesanal · Elaborado con los mejores ingredientes
            para momentos extraordinarios
          </p>
        </div>

        <div
          className="animate-fadeInUp flex flex-col sm:flex-row gap-4 justify-center"
          style={{ animationDelay: "0.8s", animationFillMode: "both" }}
        >
          <a href="#menu" className="btn-gold inline-block">
            Ver Menú
          </a>
          <a href="#contacto" className="btn-outline-gold inline-block">
            Hacer Reservación
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-amber-400/40 flex flex-col items-center gap-2">
        <span className="text-xs tracking-widest uppercase">Descubrir</span>
        <div className="w-px h-8 bg-gradient-to-b from-amber-400/40 to-transparent" />
      </div>
    </section>
  );
}

function About() {
  useReveal();
  return (
    <section id="nosotros" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="max-w-6xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal-left">
            <div className="img-zoom rounded-sm overflow-hidden border border-amber-900/20 h-80">
              <img
                src="/iconobocado.png"
                alt="Bocado Fino Banner"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="img-zoom rounded-sm overflow-hidden border border-amber-900/20 h-32">
                <img
                  src="/bocadobanner.png"
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-amber-950/30 border border-amber-900/20 rounded-sm h-32 flex items-center justify-center p-4">
                <div className="text-center">
                  <p className="gold-text text-3xl font-light">5+</p>
                  <p className="text-xs tracking-widest text-amber-100/50 uppercase mt-1">
                    Años de experiencia
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal-right">
            <p className="text-xs tracking-[0.4em] uppercase text-amber-400/60 mb-4">
              — Nuestra Historia —
            </p>
            <h2 className="text-4xl sm:text-5xl font-serif font-light leading-tight mb-6 text-amber-100">
              El Arte de la{" "}
              <span className="gold-text italic">Gastronomía</span> Artesanal
            </h2>
            <div className="gold-line-expand mb-8" />
            <p className="text-amber-100/60 leading-relaxed mb-6 font-serif text-lg">
              En <span className="gold-text-simple italic">Bocado Fino</span>,
              cada bocado es una experiencia cuidadosamente elaborada. Nuestros
              productos artesanales combinan técnicas tradicionales con
              ingredientes de primera calidad para crear momentos memorables en
              cada evento.
            </p>
            <p className="text-amber-100/60 leading-relaxed mb-8 font-serif text-lg">
              Desde íntimas reuniones hasta grandes celebraciones, nuestro
              equipo de expertos garantiza una presentación impecable y sabores
              que deleitan el paladar más exigente. Servimos con orgullo a
              Chimalhuacán y toda la zona oriente.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { number: "48h", label: "Anticipación mínima" },
                { number: "100%", label: "Ingredientes frescos" },
                { number: "∞", label: "Personalización" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center border border-amber-900/20 p-4"
                >
                  <p className="gold-text text-2xl font-light mb-1">
                    {stat.number}
                  </p>
                  <p className="text-amber-100/40 text-xs tracking-wider uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <a href="#contacto" className="btn-outline-gold inline-block">
              Conocer Más
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

type CarouselItem = {
  name: string;
  description: string;
  price: string;
  badge: string;
  image: string;
  isCustom?: boolean;
};

function MenuCarousel() {
  const items: CarouselItem[] = [
    {
      name: "Le Croissant Royal",
      description:
        "Nuestra joya de la corona. Un croissant de hojaldre aireado y mantequilloso, relleno con láminas seleccionadas de jamón y queso fundente. El equilibrio perfecto entre tradición y elegancia.",
      price: "$12.50 c/u",
      badge: "Estrella",
      image: "/cuerno.png",
    },
    {
      name: "Petit D'Or",
      description:
        "Pequeñas esferas de pan artesanal con una corteza dorada y un corazón tierno. Horneados lentamente para resaltar el sabor natural de la harina seleccionada. Ideales para cualquier charla íntima.",
      price: "$12.50 c/u",
      badge: "Gourmet",
      image: "/cuerno.png",
    },
    {
      name: "Triángulos de Seda",
      description:
        "Sándwiches de miga ultra finos, preparados con pan blanco premium. Una opción ligera y clásica, con rellenos frescos que se deshacen en el paladar. La delicadeza convertida en bocado.",
      price: "$12.50 c/u",
      badge: "Clásico",
      image: "/menu-preview.png",
    },
    {
      name: "Rolls Semillados de Autor",
      description:
        "Rollitos de masa suave enriquecidos con un toque de semillas tostadas. Un sabor rústico y sofisticado que aporta una textura única y un aroma irresistible a tu mesa.",
      price: "$12.50 c/u",
      badge: "Especial",
      image: "/menuactualizado.jpg",
    },
    {
      name: "Hojaldres Gourmet",
      description:
        "Hojaldres crujientes rellenos con preparaciones premium. Cada bocado ofrece capas perfectas de masa hojaldrada con rellenos cuidadosamente seleccionados.",
      price: "$12.50 c/u",
      badge: "Premium",
      image: "/hojaldre.png",
    },
    {
      name: "Personalización",
      description:
        "¿Tienes un evento especial? Creamos bocados a tu medida, con los ingredientes y presentación que imagines. Consulta nuestras opciones personalizadas.",
      price: "A consultar",
      badge: "Exclusivo",
      isCustom: true,
      image: "/Letter1.png",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"right" | "left">("right");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (idx: number, dir: "right" | "left") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 350);
  };

  const prev = () => goTo((current - 1 + items.length) % items.length, "left");
  const next = () => goTo((current + 1) % items.length, "right");

  useEffect(() => {
    timeoutRef.current = setTimeout(next, 4500);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, animating]);

  const item = items[current];

  return (
    <section
      id="menu"
      className="min-h-screen flex items-center justify-center py-20 px-6 relative"
      style={{
        background:
          "linear-gradient(180deg, #0a0a0a 0%, #15120c 50%, #0a0a0a 100%)",
      }}
    >
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="max-w-5xl mx-auto w-full relative">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-400/60 mb-4">
            — Selección Artesanal —
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-amber-100 mb-4">
            Nuestros <span className="gold-shimmer italic">Bocados</span>
          </h2>
          <div className="gold-line my-6 mx-auto max-w-xs" />
          <p className="text-amber-100/50 font-serif text-lg max-w-2xl mx-auto italic">
            Cada pieza es elaborada con pasión y precisión, utilizando
            únicamente los mejores ingredientes artesanales
          </p>
        </div>

        <div className="relative flex items-center gap-2 sm:gap-6">
          <button
            onClick={prev}
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-amber-900/40 flex items-center justify-center text-amber-400/60 hover:text-amber-400 hover:border-amber-400/60 hover:bg-amber-900/20 transition-all duration-300 z-10"
            aria-label="Anterior"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex-1 overflow-hidden py-4">
            <div
              key={current}
              className="bg-[#12100a] border border-amber-900/30 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.4)] flex flex-col md:flex-row relative overflow-hidden"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating
                  ? `translateX(${direction === "right" ? "40px" : "-40px"})`
                  : "translateX(0)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}
            >
              <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[300px] relative bg-black flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#12100a] via-transparent to-transparent" />
              </div>

              <div className="w-full md:w-1/2 p-8 sm:p-12 text-center flex flex-col justify-center items-center relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-500/5 blur-[80px] pointer-events-none" />
                <span className="text-xs tracking-widest uppercase px-4 py-1.5 border border-amber-900/40 text-amber-400/70 mb-6 inline-block rounded-full bg-amber-900/10">
                  {item.badge}
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif text-amber-50 mb-4">
                  {item.name}
                </h3>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent my-6 mx-auto" />
                <p className="text-base sm:text-lg text-amber-100/60 leading-relaxed mb-10 font-serif italic max-w-xl mx-auto">
                  {item.description}
                </p>
                {item.isCustom ? (
                  <a
                    href="#contacto"
                    className="inline-block px-8 py-3 border border-amber-500/50 text-amber-400 hover:bg-amber-500 hover:text-black transition-all duration-300 tracking-widest uppercase text-sm rounded-full"
                  >
                    Consultar
                  </a>
                ) : (
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 text-3xl sm:text-4xl font-light font-serif">
                    {item.price}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={next}
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-amber-900/40 flex items-center justify-center text-amber-400/60 hover:text-amber-400 hover:border-amber-400/60 hover:bg-amber-900/20 transition-all duration-300 z-10"
            aria-label="Siguiente"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="flex justify-center gap-3 mt-10">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? "right" : "left")}
              className="transition-all duration-300 py-2 focus:outline-none"
              aria-label={`Ir al bocado ${i + 1}`}
            >
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "28px" : "8px",
                  height: "8px",
                  background:
                    i === current ? "#c9a84c" : "rgba(201,168,76,0.2)",
                  boxShadow:
                    i === current ? "0 0 10px rgba(201,168,76,0.5)" : "none",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Packages() {
  useReveal();
  const packages = [
    {
      name: "Box Individual",
      pieces: "12 piezas variadas",
      items: [
        "4 Croissants Reales",
        "4 Rolls Semillados",
        "4 Triángulos de Seda",
      ],
      price: "$150.00",
      highlight: false,
    },
    {
      name: "Charola Social",
      pieces: "24 piezas variadas",
      items: [
        "8 Croissants Reales",
        "8 Rolls Semillados",
        "8 Hojaldres Premium",
      ],
      price: "$300.00",
      highlight: true,
    },
    {
      name: "Box Reunión",
      pieces: "24 piezas variadas",
      items: ["8 Croissants", "8 Rolls", "8 Petit D'Or"],
      price: "$300.00",
      highlight: false,
    },
    {
      name: "Gran Charola Gourmet",
      pieces: "50 piezas variadas",
      items: [
        "15 Croissants Reales",
        "15 Rolls Semillados",
        "10 Hojaldres + 10 Triángulos",
      ],
      price: "$625.00",
      highlight: false,
    },
  ];

  return (
    <section
      id="paquetes"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16 reveal">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-400/60 mb-4">
            — Opciones para tu Evento —
          </p>
          <h2 className="text-4xl sm:text-5xl font-serif font-light text-amber-100 mb-4">
            Nuestros <span className="gold-shimmer italic">Paquetes</span>
          </h2>
          <div className="gold-line my-6 mx-auto max-w-xs" />
          <p className="text-amber-100/50 font-serif text-lg max-w-2xl mx-auto">
            Selecciona el paquete perfecto para tu celebración. Todos incluyen
            entrega garantizada con frescura.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, i) => (
            <div
              key={pkg.name}
              className={`reveal relative border rounded-sm p-6 flex flex-col transition-all duration-300 hover:scale-[1.02] ${
                pkg.highlight
                  ? "border-amber-400/60 bg-gradient-to-b from-amber-950/40 to-transparent"
                  : "border-amber-900/20 bg-amber-950/10"
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {pkg.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-amber-400 text-black text-xs font-bold tracking-widest uppercase px-4 py-1">
                    Popular
                  </span>
                </div>
              )}
              <div className="mb-4">
                <h3
                  className={`font-serif text-xl mb-1 ${pkg.highlight ? "gold-text" : "text-amber-100"}`}
                >
                  {pkg.name}
                </h3>
                <p className="text-amber-400/60 text-sm">{pkg.pieces}</p>
              </div>
              <div className="gold-line mb-4" />
              <ul className="space-y-2 flex-1 mb-6">
                {pkg.items.map((item) => (
                  <li
                    key={item}
                    className="text-amber-100/60 text-sm flex items-start gap-2"
                  >
                    <span className="text-amber-400/60 mt-0.5">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <p
                  className={`text-3xl font-serif font-light mb-4 ${pkg.highlight ? "gold-text" : "text-amber-100"}`}
                >
                  {pkg.price}
                </p>
                <a
                  href="#contacto"
                  className={
                    pkg.highlight
                      ? "btn-gold text-xs"
                      : "btn-outline-gold text-xs"
                  }
                >
                  Ordenar
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border border-amber-900/30 rounded-sm p-6 bg-amber-950/10 reveal">
          <h3 className="gold-text font-serif text-lg mb-4 text-center">
            Información Importante
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            {[
              {
                icon: "⏰",
                text: "Pedidos con mínimo 48 a 72 hrs. de anticipación",
              },
              { icon: "🎨", text: "Consulte opciones de personalización" },
              {
                icon: "📦",
                text: "Entregas garantizadas para conservar frescura",
              },
            ].map((info) => (
              <div key={info.text} className="flex flex-col items-center gap-2">
                <span className="text-2xl">{info.icon}</span>
                <p className="text-amber-100/60 text-sm">{info.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      text: "Los bocados de Bocado Fino fueron el alma de nuestra boda. Nuestros invitados no paraban de elogiarlos. ¡Una experiencia verdaderamente gourmet!",
      author: "María G.",
      event: "Boda de 200 personas",
    },
    {
      text: "Contratamos el servicio para un evento corporativo y superó todas las expectativas. La presentación es impecable y el sabor, incomparable.",
      author: "Carlos R.",
      event: "Evento Corporativo",
    },
    {
      text: "La Gran Charola Bocado Gourmet fue el centro de atención en nuestra reunión. Calidad excepcional y entrega puntual. ¡100% recomendado!",
      author: "Sofía M.",
      event: "Reunión Familiar",
    },
    {
      text: "Pedimos para el XV años de mi hija y todos quedaron encantados. Los croissants estaban perfectos y la presentación fue impresionante.",
      author: "Laura P.",
      event: "XV Años",
    },
    {
      text: "Excelente servicio, muy puntuales y los bocados riquísimos. Ya los recomendé con toda mi familia para los próximos eventos.",
      author: "Roberto M.",
      event: "Reunión de Negocios",
    },
    {
      text: "Pedí la Gran Charola para una graduación y no sobró ni una pieza. Todos preguntaban de dónde eran los bocados. ¡Definitivamente los contratamos de nuevo!",
      author: "Ana L.",
      event: "Graduación",
    },
  ];

  const doubled = [...testimonials, ...testimonials];

  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0a0a0a 0%, #080600 50%, #0a0a0a 100%)",
      }}
    >
      <div className="text-center mb-16 reveal px-6">
        <p className="text-xs tracking-[0.4em] uppercase text-amber-400/60 mb-4">
          — Experiencias —
        </p>
        <h2 className="text-4xl sm:text-5xl font-serif font-light text-amber-100">
          Lo que dicen{" "}
          <span className="gold-text italic">nuestros clientes</span>
        </h2>
        <div className="ornament mt-6">
          <span className="text-amber-400/40 text-lg">✦</span>
        </div>
      </div>

      <div className="relative">
        <div
          className="flex gap-6 testimonials-track"
          style={{ width: "max-content" }}
        >
          {doubled.map((t, i) => (
            <div
              key={i}
              className="luxury-card p-8 flex-shrink-0"
              style={{ width: "340px" }}
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className="text-amber-400 text-sm">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-amber-100/60 font-serif italic leading-relaxed mb-6 text-sm">
                "{t.text}"
              </p>
              <div className="border-t border-amber-900/20 pt-4">
                <p className="gold-text-simple font-serif font-semibold">
                  {t.author}
                </p>
                <p className="text-xs tracking-wider text-amber-100/30 uppercase mt-0.5">
                  {t.event}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="absolute inset-y-0 left-0 w-24 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #080600, transparent)" }}
        />
        <div
          className="absolute inset-y-0 right-0 w-24 pointer-events-none"
          style={{
            background: "linear-gradient(270deg, #080600, transparent)",
          }}
        />
      </div>
    </section>
  );
}

function Contact() {
  useReveal();
  return (
    <section
      id="contacto"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-16 reveal">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-400/60 mb-4">
            — Contáctanos —
          </p>
          <h2 className="text-4xl sm:text-5xl font-serif font-light text-amber-100 mb-4">
            Haz tu <span className="gold-shimmer italic">Reservación</span>
          </h2>
          <div className="gold-line my-6 mx-auto max-w-xs" />
          <p className="text-amber-100/50 font-serif text-lg max-w-xl mx-auto">
            Contáctanos con al menos 48 horas de anticipación para garantizar la
            frescura y calidad de tus bocados
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="reveal-left space-y-6">
            <div className="border border-amber-900/20 p-6 rounded-sm bg-amber-950/10">
              <h3 className="gold-text font-serif text-xl mb-4">
                Información de Contacto
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-amber-900/30 flex items-center justify-center text-amber-400">
                    📱
                  </div>
                  <div>
                    <p className="text-amber-100/40 text-xs uppercase tracking-wider">
                      WhatsApp / Teléfono
                    </p>
                    <a
                      href="https://wa.me/522204613750"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-100 hover:text-amber-400 transition-colors font-serif text-lg"
                    >
                      220 461 3750
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-amber-900/30 flex items-center justify-center text-amber-400">
                    📍
                  </div>
                  <div>
                    <p className="text-amber-100/40 text-xs uppercase tracking-wider">
                      Zona de Servicio
                    </p>
                    <p className="text-amber-100 font-serif">
                      Chimalhuacán y zona oriente
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-amber-900/30 flex items-center justify-center text-amber-400">
                    📸
                  </div>
                  <div>
                    <p className="text-amber-100/40 text-xs uppercase tracking-wider">
                      Instagram
                    </p>
                    <a
                      href="https://instagram.com/bocadofino_catering"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-100 hover:text-amber-400 transition-colors font-serif"
                    >
                      @bocadofino_catering
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-amber-900/20 p-6 rounded-sm bg-amber-950/10">
              <h3 className="gold-text font-serif text-lg mb-3">
                Horario de Atención
              </h3>
              <div className="space-y-2 text-amber-100/60 font-serif">
                <div className="flex justify-between">
                  <span>Lunes – Viernes</span>
                  <span className="text-amber-400">9:00 – 19:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado</span>
                  <span className="text-amber-400">9:00 – 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo</span>
                  <span className="text-amber-100/30">
                    Solo pedidos previos
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal-right">
            <div className="border border-amber-900/20 p-8 rounded-sm bg-amber-950/10">
              <h3 className="gold-text font-serif text-xl mb-6">
                Enviar Mensaje
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-amber-100/50 text-xs uppercase tracking-wider mb-2 block">
                    Nombre
                  </label>
                  <input
                    type="text"
                    placeholder="Tu nombre completo"
                    className="w-full bg-transparent border border-amber-900/30 rounded-sm px-4 py-3 text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-400/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-amber-100/50 text-xs uppercase tracking-wider mb-2 block">
                    Evento
                  </label>
                  <input
                    type="text"
                    placeholder="Tipo de evento (boda, XV años, corporativo...)"
                    className="w-full bg-transparent border border-amber-900/30 rounded-sm px-4 py-3 text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-400/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-amber-100/50 text-xs uppercase tracking-wider mb-2 block">
                    Fecha del Evento
                  </label>
                  <input
                    type="date"
                    className="w-full bg-transparent border border-amber-900/30 rounded-sm px-4 py-3 text-amber-100/60 focus:outline-none focus:border-amber-400/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-amber-100/50 text-xs uppercase tracking-wider mb-2 block">
                    Mensaje
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Cuéntanos sobre tu evento y el paquete que te interesa..."
                    className="w-full bg-transparent border border-amber-900/30 rounded-sm px-4 py-3 text-amber-100 placeholder-amber-100/30 focus:outline-none focus:border-amber-400/60 transition-colors resize-none"
                  />
                </div>
                <a
                  href="https://wa.me/522204613750?text=Hola,%20me%20gustaría%20hacer%20una%20reservación%20con%20Bocado%20Fino%20Catering"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full text-center block"
                >
                  Enviar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="py-12 px-6 border-t border-amber-900/20"
      style={{ background: "#060606" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/iconobocado.png"
              alt="Bocado Fino"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="gold-text font-serif text-lg font-bold tracking-widest uppercase leading-none">
                Bocado Fino
              </p>
              <p className="text-xs tracking-[0.3em] text-amber-400/40 uppercase">
                Catering
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { href: "#inicio", label: "Inicio" },
              { href: "#nosotros", label: "Nosotros" },
              { href: "#menu", label: "Menú" },
              { href: "#paquetes", label: "Paquetes" },
              { href: "#comentarios", label: "Reseñas" },
              { href: "#contacto", label: "Contacto" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-widest text-amber-100/40 hover:text-amber-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="text-center md:text-right">
            <p className="text-amber-100/30 text-sm">
              © 2025 Bocado Fino Catering
            </p>
            <p className="text-amber-100/20 text-xs mt-1">
              Chimalhuacán, Estado de México
            </p>
          </div>
        </div>

        <div className="gold-line mt-8 mb-6" />

        <p className="text-center text-amber-100/20 text-xs tracking-widest uppercase">
          Elaborado con pasión · Entregado con elegancia
        </p>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/522204613750?text=Hola,%20me%20interesa%20hacer%20un%20pedido%20con%20Bocado%20Fino%20Catering"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Contactar por WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

export default function App() {
  useReveal();

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a" }}>
      <Navbar />
      <Hero />
      <About />
      <MenuCarousel />
      <Packages />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
