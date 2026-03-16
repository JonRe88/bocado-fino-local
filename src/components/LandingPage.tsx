import { useEffect, useRef, useState } from "react";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale, .gold-line-expand"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
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
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <span className="text-black font-serif font-bold text-sm">BF</span>
          </div>
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
              className={`block w-6 h-px bg-amber-400 transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-amber-400 transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-amber-400 transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
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
              animationDelay: `${(i % 3)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-fadeIn" style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}>
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center animate-goldPulse">
            <span className="text-black font-serif font-bold text-2xl">BF</span>
          </div>
        </div>

        <div className="animate-fadeInUp" style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}>
          <p className="text-xs tracking-[0.5em] uppercase text-amber-400/70 mb-3 font-sans">
            — Catering de Lujo —
          </p>
        </div>

        <div className="animate-fadeInUp" style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}>
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-light leading-none mb-4 gold-shimmer">
            Bocado
            <br />
            <span className="italic">Fino</span>
          </h1>
        </div>

        <div className="animate-fadeInUp" style={{ animationDelay: "0.8s", opacity: 0, animationFillMode: "forwards" }}>
          <div className="gold-line my-6 mx-auto max-w-xs" />
          <p className="text-base sm:text-lg md:text-xl text-amber-100/70 font-serif italic max-w-xl mx-auto leading-relaxed mb-8">
            Menú de Selección Artesanal · Elaborado con los mejores ingredientes para momentos extraordinarios
          </p>
        </div>

        <div
          className="animate-fadeInUp flex flex-col sm:flex-row gap-4 justify-center"
          style={{ animationDelay: "1s", opacity: 0, animationFillMode: "forwards" }}
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
  return (
    <section id="nosotros" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="max-w-6xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal-left">
            <div className="img-zoom rounded-sm overflow-hidden border border-amber-900/20 h-96 bg-gradient-to-br from-amber-950 to-amber-900 flex items-center justify-center">
              <span className="text-amber-400/40 text-6xl">🥐</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="img-zoom rounded-sm overflow-hidden border border-amber-900/20 h-32 bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <span className="text-black text-2xl font-serif font-bold">BF</span>
              </div>
              <div className="bg-amber-950/30 border border-amber-900/20 rounded-sm h-32 flex items-center justify-center p-4">
                <div className="text-center">
                  <p className="gold-text text-3xl font-light">5+</p>
                  <p className="text-xs tracking-widest text-amber-100/50 uppercase mt-1">Años de experiencia</p>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal-right">
            <p className="text-xs tracking-[0.4em] uppercase text-amber-400/60 mb-4">— Nuestra Historia —</p>
            <h2 className="text-4xl sm:text-5xl font-serif font-light leading-tight mb-6 text-amber-100">
              El Arte de la{" "}
              <span className="gold-text italic">Gastronomía</span>{" "}
              Artesanal
            </h2>
            <div className="gold-line-expand mb-8" />
            <p className="text-amber-100/60 leading-relaxed mb-6 font-serif text-lg">
              En <span className="gold-text-simple italic">Bocado Fino</span>, cada bocado es una experiencia cuidadosamente elaborada.
              Nuestros productos artesanales combinan técnicas tradicionales con ingredientes
              de primera calidad para crear momentos memorables en cada evento.
            </p>
            <p className="text-amber-100/60 leading-relaxed mb-8 font-serif text-lg">
              Desde íntimas reuniones hasta grandes celebraciones, nuestro equipo de expertos
              garantiza una presentación impecable y sabores que deleitan el paladar más exigente.
              Servimos con orgullo a Chimalhuacán y toda la zona oriente.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { number: "48h", label: "Anticipación mínima" },
                { number: "100%", label: "Ingredientes frescos" },
                { number: "∞", label: "Personalización" },
              ].map((stat) => (
                <div key={stat.label} className="text-center border border-amber-900/20 p-4">
                  <p className="gold-text text-2xl font-light mb-1">{stat.number}</p>
                  <p className="text-amber-100/40 text-xs tracking-wider uppercase">{stat.label}</p>
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

function MenuSection() {
  const items = [
    {
      name: "Le Croissant Royal",
      description: "Nuestra joya de la corona. Un croissant de hojaldre aireado y mantequilloso, relleno con láminas seleccionadas de jamón y queso fundente. El equilibrio perfecto entre tradición y elegancia.",
      price: "$12.50 c/u",
      badge: "Estrella",
      image: "Gemini_Generated_Image_wa7cl5wa7cl5wa7c.jpg"
    },
    {
      name: "Petit D'Or",
      description: "Pequeñas esferas de pan artesanal con una corteza dorada y un corazón tierno. Horneados lentamente para resaltar el sabor natural de la harina seleccionada. Ideales para cualquier charla íntima.",
      price: "$12.50 c/u",
      badge: "Gourmet",
      image: "Gemini_Generated_Image_yw9zqayw9zqayw9z.jpg"
    },
    {
      name: "Triángulos de Seda",
      description: "Sándwiches de miga ultra finos, preparados con pan blanco premium. Una opción ligera y clásica, con rellenos frescos que se deshacen en el paladar. La delicadeza convertida en bocado.",
      price: "$12.50 c/u",
      badge: "Clásico",
      image: "Gemini_Generated_Image_26obfy26obfy26ob.jpg"
    },
    {
      name: "Rolls Semillados de Autor",
      description: "Rollitos de masa suave enriquecidos con un toque de semillas tostadas. Un sabor rústico y sofisticado que aporta una textura única y un aroma irresistible a tu mesa.",
      price: "$12.50 c/u",
      badge: "Especial",
      image: "5 ・ Extra Large@1x.jpg"
    },
    {
      name: "Hojaldres Gourmet",
      description: "Hojaldres crujientes rellenos con preparaciones premium. Cada bocado ofrece capas perfectas de masa hojaldrada con rellenos cuidadosamente seleccionados.",
      price: "$12.50 c/u",
      badge: "Premium",
      image: "MENUACTUALIZADO.jpg"
    },
    {
      name: "Personalización",
      description: "¿Tienes un evento especial? Creamos bocados a tu medida, con los ingredientes y presentación que imagines. Consulta nuestras opciones personalizadas.",
      price: "A consultar",
      badge: "Exclusivo",
      isCustom: true,
      image: "Letter.png"
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
    timeoutRef.current = setTimeout(next, 4000);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [current, animating]);

  const item = items[current];

  return (
    <section 
      id="menu" 
      className="min-h-screen flex items-center justify-center py-20 px-6 relative font-sans" 
      style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #15120c 50%, #0a0a0a 100%)" }}
    >
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Encabezado */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-400/60 mb-4">— Selección Artesanal —</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-amber-100 mb-4">
            Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 italic">Bocados</span>
          </h2>
          <div className="mt-6">
            <span className="text-amber-400/40 text-lg">✦</span>
          </div>
          <p className="text-amber-100/50 font-serif text-lg mt-6 max-w-2xl mx-auto italic">
            Cada pieza es elaborada con pasión y precisión, utilizando únicamente los mejores ingredientes artesanales
          </p>
        </div>

        {/* Contenedor del Slider */}
        <div className="relative flex items-center gap-2 sm:gap-6">
          
          {/* Botón Anterior */}
          <button
            onClick={prev}
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-amber-900/40 flex items-center justify-center text-amber-400/60 hover:text-amber-400 hover:border-amber-400/60 hover:bg-amber-900/20 transition-all duration-300 z-10"
            aria-label="Anterior"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Tarjeta de Contenido */}
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
              {/* Sección de Imagen (NUEVO) */}
              <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[300px] relative bg-black flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                />
                {/* Degradado para fusionar la imagen con la zona de texto suavemente */}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#12100a] via-transparent to-transparent"></div>
              </div>

              {/* Sección de Texto */}
              <div className="w-full md:w-1/2 p-8 sm:p-12 text-center flex flex-col justify-center items-center relative">
                {/* Resplandor decorativo de fondo */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-500/5 blur-[80px] pointer-events-none"></div>

                <span className="text-xs tracking-widest uppercase px-4 py-1.5 border border-amber-900/40 text-amber-400/70 mb-6 inline-block rounded-full bg-amber-900/10">
                  {item.badge}
                </span>
                
                <h3 className="text-3xl sm:text-4xl font-serif text-amber-50 mb-4">{item.name}</h3>
                
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent my-6 mx-auto" />
                
                <p className="text-base sm:text-lg text-amber-100/60 leading-relaxed mb-10 font-serif italic max-w-xl mx-auto">
                  {item.description}
                </p>
                
                {"isCustom" in item && item.isCustom ? (
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

          {/* Botón Siguiente */}
          <button
            onClick={next}
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-amber-900/40 flex items-center justify-center text-amber-400/60 hover:text-amber-400 hover:border-amber-400/60 hover:bg-amber-900/20 transition-all duration-300 z-10"
            aria-label="Siguiente"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Indicadores (Puntos) */}
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
                  background: i === current ? "#c9a84c" : "rgba(201,168,76,0.2)",
                  boxShadow: i === current ? "0 0 10px rgba(201,168,76,0.5)" : "none"
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
  const packages = [
    {
      name: "Box Individual",
      subtitle: "Presentación Premium",
      pieces: "12 piezas",
      price: "$150.00",
      items: [
        "4 Croissants Reales",
        "4 Rolls Semillados",
        "4 Triángulos",
      ],
      featured: false,
    },
    {
      name: "Charola Social",
      subtitle: "Ideal para Grupos",
      pieces: "24 piezas",
      price: "$300.00",
      items: [
        "8 Croissants Reales",
        "8 Rolls Semillados",
        "8 Hojaldres Premium",
      ],
      featured: true,
    },
    {
      name: 'Gran Charola "Bocado Gourmet"',
      subtitle: "La Experiencia Completa",
      pieces: "50 piezas",
      price: "$625.00",
      items: [
        "15 Croissants Reales",
        "15 Rolls Semillados",
        "10 Hojaldres",
        "10 Triángulos",
      ],
      featured: false,
    },
  ];

  return (
    <section id="paquetes" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="absolute top-0 left-0 right-0 h-px gold-line" />
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16 reveal">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-400/60 mb-4">— Combos Sugeridos —</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-amber-100 mb-4">
            Charolas <span className="gold-text italic">&amp; Boxes</span>
          </h2>
          <div className="ornament mt-6">
            <span className="text-amber-400/40 text-lg">✦</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, i) => (
            <div
              key={pkg.name}
              className={`reveal relative ${i === 0 ? "" : i === 1 ? "delay-200" : "delay-400"} ${
                pkg.featured ? "md:-mt-4 md:mb-4" : ""
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 bg-amber-400 text-black text-xs tracking-widest uppercase px-4 py-1.5 whitespace-nowrap">
                  Más Popular
                </div>
              )}
              <div
                className={`luxury-card h-full p-8 flex flex-col ${
                  pkg.featured
                    ? "border-amber-400/40 shadow-[0_0_40px_rgba(201,168,76,0.15)]"
                    : ""
                }`}
              >
                <div className="mb-6">
                  <p className="text-xs tracking-widest uppercase text-amber-400/50 mb-2">
                    {pkg.subtitle}
                  </p>
                  <h3 className="text-xl font-serif text-amber-100 leading-tight mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-sm text-amber-100/40 font-serif italic">
                    {pkg.pieces} variadas
                  </p>
                </div>

                <div className="gold-line mb-6" />

                <ul className="space-y-3 flex-1 mb-8">
                  {pkg.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-amber-100/60 font-serif"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400/50 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-amber-900/20 pt-6">
                  <div className="text-center mb-6">
                    <p className="text-xs tracking-widest uppercase text-amber-400/50 mb-1">Precio Total</p>
                    <p className="price-tag gold-text">{pkg.price}</p>
                  </div>
                  <a
                    href="#contacto"
                    className={`block text-center ${pkg.featured ? "btn-gold" : "btn-outline-gold"} w-full`}
                  >
                    Reservar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 border border-amber-900/20 bg-amber-950/10 reveal">
          <div className="flex flex-wrap gap-6 justify-center text-center text-sm text-amber-100/50 font-serif">
            <div className="flex items-center gap-2">
              <span className="text-amber-400/50">✦</span>
              <span>Pedidos con mínimo <span className="text-amber-400/80">48–72 hrs</span> de anticipación</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400/50">✦</span>
              <span>Opciones de <span className="text-amber-400/80">personalización</span> disponibles</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400/50">✦</span>
              <span>Entregas garantizadas para <span className="text-amber-400/80">conservar frescura</span></span>
            </div>
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

const PHONE = "522204613750";
const PHONE_DISPLAY = "220 461 3750";
const INSTAGRAM = "@Bocadofino_catering";
const INSTAGRAM_URL = "https://instagram.com/Bocadofino_catering";

function Contact() {
  const [formState, setFormState] = useState({ name: "", phone: "", event: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hola Bocado Fino! Me interesa hacer una reservación.\n\nNombre: ${formState.name}\nTeléfono: ${formState.phone}\nEvento: ${formState.event}\nMensaje: ${formState.message}`
    );
    window.open(`https://wa.me/${PHONE}?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px gold-line" />
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16 reveal">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-400/60 mb-4">— Reserve Con Tiempo —</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-amber-100">
            Hagamos tu evento <span className="gold-text italic">memorable</span>
          </h2>
          <div className="ornament mt-6">
            <span className="text-amber-400/40 text-lg">✦</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <div className="reveal-left">
            <h3 className="text-2xl font-serif text-amber-100 mb-6">Contacto Directo</h3>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 border border-amber-900/30 flex items-center justify-center flex-shrink-0 text-lg">
                  📞
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-amber-400/50 mb-0.5">Teléfono / WhatsApp</p>
                  <a
                    href={`tel:+52${PHONE_DISPLAY.replace(/\s/g, "")}`}
                    className="text-amber-100/70 font-serif hover:text-amber-400 transition-colors"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 border border-amber-900/30 flex items-center justify-center flex-shrink-0 text-lg">
                  📷
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-amber-400/50 mb-0.5">Instagram</p>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-100/70 font-serif hover:text-amber-400 transition-colors"
                  >
                    {INSTAGRAM}
                  </a>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 border border-amber-900/30 flex items-center justify-center flex-shrink-0 text-lg">
                  📍
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-amber-400/50 mb-0.5">Zona de Servicio</p>
                  <p className="text-amber-100/70 font-serif">Chimalhuacán y Zona Oriente</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 border border-amber-900/30 flex items-center justify-center flex-shrink-0 text-lg">
                  ⏰
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-amber-400/50 mb-0.5">Anticipación Requerida</p>
                  <p className="text-amber-100/70 font-serif">48 a 72 horas mínimo</p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 border border-amber-900/20 bg-amber-950/10">
              <p className="gold-text text-sm font-sans tracking-wider uppercase mb-2">¿Listo para ordenar?</p>
              <p className="text-amber-100/50 font-serif text-sm mb-4">
                Escríbenos directamente por WhatsApp para una atención inmediata y personalizada
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-gold inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="reveal-right">
            {submitted ? (
              <div className="luxury-card p-10 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 border border-amber-400/40 rounded-full flex items-center justify-center mb-6 animate-goldPulse">
                  <span className="gold-text text-2xl">✓</span>
                </div>
                <h3 className="text-2xl font-serif gold-text mb-3">¡Gracias!</h3>
                <p className="text-amber-100/50 font-serif italic">
                  Te hemos redirigido a WhatsApp. ¡Nos pondremos en contacto contigo a la brevedad!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { name: "name" as const, label: "Nombre Completo", placeholder: "Tu nombre", type: "text" },
                  { name: "phone" as const, label: "Teléfono / WhatsApp", placeholder: "Tu número de teléfono", type: "tel" },
                  { name: "event" as const, label: "Tipo de Evento", placeholder: "Boda, corporativo, familiar...", type: "text" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-xs tracking-widest uppercase text-amber-400/50 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={formState[field.name]}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, [field.name]: e.target.value }))
                      }
                      className="w-full bg-transparent border border-amber-900/30 text-amber-100/80 placeholder-amber-100/20 px-4 py-3 text-sm font-serif focus:outline-none focus:border-amber-400/50 transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs tracking-widest uppercase text-amber-400/50 mb-2">
                    Mensaje / Paquete de Interés
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Cuéntanos sobre tu evento, número de personas, paquete de interés..."
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    className="w-full bg-transparent border border-amber-900/30 text-amber-100/80 placeholder-amber-100/20 px-4 py-3 text-sm font-serif focus:outline-none focus:border-amber-400/50 transition-colors resize-none"
                  />
                </div>
                <button type="submit" className="btn-gold w-full">
                  Solicitar por WhatsApp
                </button>
                <p className="text-xs text-amber-100/25 text-center font-serif italic">
                  Al enviar, te redirigiremos a WhatsApp para atenderte personalmente
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-amber-900/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center opacity-80">
              <span className="text-black font-serif font-bold text-sm">BF</span>
            </div>
            <div>
              <p className="gold-text font-serif text-lg font-bold tracking-widest uppercase leading-none">
                Bocado Fino
              </p>
              <p className="text-xs tracking-[0.3em] text-amber-400/40 uppercase">Catering</p>
            </div>
          </div>

          <div className="flex gap-8">
            {[
              { label: "Inicio", href: "#inicio" },
              { label: "Menú", href: "#menu" },
              { label: "Paquetes", href: "#paquetes" },
              { label: "Contacto", href: "#contacto" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs tracking-widest uppercase text-amber-100/30 hover:text-amber-400/70 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`https://wa.me/${PHONE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-100/30 hover:text-amber-400/70 transition-colors"
              aria-label="WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-100/30 hover:text-amber-400/70 transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="gold-line mt-8" />
        <p className="text-center text-xs text-amber-100/20 tracking-[0.5em] uppercase mt-6 font-serif">
          Reserve Con Tiempo · Elaboración Artesanal · Calidad Garantizada
        </p>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  useReveal();

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a", color: "#f5f0e8" }}>
      <Navbar />
      <Hero />
      <About />
      <MenuSection />
      <Packages />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
