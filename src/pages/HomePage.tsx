import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  Flame, 
  ChevronRight, 
  Star, 
  Compass, 
  Award, 
  Quote, 
  Layers, 
  Thermometer, 
  Timer 
} from 'lucide-react';
import { Hero3DCanvas } from '../components/3d/Hero3DCanvas';
import { MiniPizzaViewer } from '../components/3d/MiniPizzaViewer';
import { useStore } from '../store/useStore';
import { CUSTOMER_REVIEWS, HERITAGE_TIMELINE } from '../data/mockData';

gsap.registerPlugin(ScrollTrigger);

export const HomePage: React.FC = () => {
  const { menuItems, setActiveItemForModal } = useStore();
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const heritageSectionRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  // Filter 3 signature pies for the spotlight teaser
  const signaturePies = menuItems
    .filter((item) => item.category === 'pizzas')
    .slice(0, 3);

  useEffect(() => {
    // 1. Staggered GSAP Reveal for Hero Text
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
          '.hero-line',
          { opacity: 0, y: 40, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.4, stagger: 0.18 },
        )
        .fromTo(
          '.hero-description',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.2 },
          '-=0.9'
        )
        .fromTo(
          ctaGroupRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 1.2 },
          '-=0.9'
        )
        .fromTo(
          '.hero-stat',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.0, stagger: 0.15 },
          '-=0.8'
        );

      // 2. ScrollTrigger for 3D Camera and Storytelling Journey
      if (heritageSectionRef.current) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          endTrigger: heritageSectionRef.current,
          end: 'bottom center',
          scrub: 1.2,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        });
      }

      // 3. Reveal each content section as it approaches the viewport.
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.utils.toArray<HTMLElement>('.home-scroll-reveal').forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 56 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }

      // 4. Reveal animations for cards as they enter viewport
      gsap.utils.toArray<HTMLElement>('.reveal-card').forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0D0D0D] text-[#FBF9F5] overflow-hidden">
      {/* 1. HERO 3D SECTION */}
      <section
        ref={heroRef}
        className="relative min-h-[110vh] sm:min-h-[100vh] lg:min-h-[105vh] flex items-start sm:items-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-8 lg:px-16 xl:px-20 border-b border-white/5 w-full"
      >
        {/* Background 3D Scene */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <Hero3DCanvas scrollProgress={scrollProgress} />
        </div>

        {/* Subtle radial atmosphere gradients */}
        <div className="absolute top-1/4 left-0 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-[#C85A32]/12 blur-[100px] sm:blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute bottom-10 right-10 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-[#D9A35F]/10 blur-[90px] sm:blur-[130px] pointer-events-none rounded-full" />

        {/* Foreground Content (Full Viewport Width) */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center pointer-events-none">
          <div className="lg:col-span-7 xl:col-span-6 space-y-4 sm:space-y-6 pointer-events-auto">
            {/* Staggered Main Headline */}
            <h1
              ref={headlineRef}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[#FBF9F5] leading-[1.12]"
            >
              <span className="hero-line block">Artisanal Flame,</span>
              <span className="hero-line block bg-gradient-to-r from-[#FBF9F5] via-[#EFE9DC] to-[#D9A35F] bg-clip-text text-transparent">
                Timeless Craft.
              </span>
            </h1>

            {/* Editorial Subtitle */}
            <p className="hero-description text-xs sm:text-sm lg:text-base text-[#A39E93] leading-relaxed max-w-lg font-light">
              We slow-ferment our heirloom mother dough for 72 hours, crown it with
              hand-crushed San Marzano tomatoes and creamy Campania mozzarella, then blister it in 85 seconds over fragrant sweet oak embers.
            </p>

            {/* Primary CTAs */}
            <div ref={ctaGroupRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                to="/order"
                className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-[#C85A32] to-[#B84E28] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(200,90,50,0.4)] hover:shadow-[0_0_40px_rgba(200,90,50,0.6)] hover:scale-[1.02] transition-all"
              >
                <span>Order Online</span>
                <ArrowRight className="w-4 h-4 text-[#FBF9F5]" />
              </Link>

              <Link
                to="/menu"
                className="px-6 py-3.5 sm:px-7 sm:py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D9A35F]/40 text-[#FBF9F5] text-xs uppercase tracking-widest font-medium transition-all backdrop-blur-md text-center"
              >
                <span>Explore Menu</span>
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-4 sm:pt-6 border-t border-white/10 max-w-md">
              <div className="hero-stat">
                <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#D9A35F] block">
                  72<span className="text-[10px] sm:text-xs font-sans text-[#A39E93]">hrs</span>
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#A39E93]">
                  Cold Ferment
                </span>
              </div>
              <div className="hero-stat">
                <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#C85A32] block">
                  900<span className="text-[10px] sm:text-xs font-sans text-[#A39E93]">°F</span>
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#A39E93]">
                  Volcanic Oven
                </span>
              </div>
              <div className="hero-stat">
                <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#FBF9F5] block">
                  100<span className="text-[10px] sm:text-xs font-sans text-[#A39E93]">%</span>
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#A39E93]">
                  D.O.P. Italian
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE MENU TEASER (3D SPOTLIGHT CARDS) */}
      <section className="home-scroll-reveal py-24 px-6 sm:px-12 lg:px-16 xl:px-20 border-b border-white/5 relative w-full">
        <div className="w-full space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs uppercase tracking-[0.2em] text-[#D9A35F] font-semibold">
                From the Hearth
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FBF9F5]">
                Signature Wood-Fired Pies
              </h2>
              <p className="text-xs sm:text-sm text-[#A39E93] font-light leading-relaxed">
                Every pie is stretched strictly by hand, honoring traditional hydration ratios and blistered over 900°F volcanic stone.
              </p>
            </div>

            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D9A35F] hover:text-[#FBF9F5] transition-colors group"
            >
              <span>Explore Complete Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 3D Spotlight Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {signaturePies.map((pie) => (
              <div
                key={pie.id}
                className="reveal-card group relative rounded-3xl bg-[#141414] border border-white/10 hover:border-[#D9A35F]/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_35px_rgba(200,90,50,0.18)] hover:-translate-y-1"
              >
                {/* 3D Model Teaser Canvas */}
                <div className="relative h-52 sm:h-56 -mx-2 -mt-2 rounded-2xl bg-gradient-to-b from-black/40 to-transparent overflow-hidden flex items-center justify-center">
                  <MiniPizzaViewer
                    variant={pie.modelVariant}
                    className="w-full h-full"
                    autoRotate={false}
                    tiltAngle={-Math.PI / 9}
                    initialRotationY={Math.PI / 6}
                    cameraPosition={[0, 1.6, 2]}
                    modelScale={0.75}
                    centerModel
                  />
                  <div className="absolute top-3 right-3 text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#D9A35F] border border-white/10">
                    ${pie.price.toFixed(2)}
                  </div>
                </div>

                {/* Card Info */}
                <div className="space-y-3 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-widest uppercase text-[#A39E93]">
                      {pie.tags[0] || 'Signature'}
                    </span>
                    <span className="text-[10px] text-[#A39E93] flex items-center gap-1">
                      <Timer className="w-3 h-3 text-[#C85A32]" />
                      <span>{pie.prepTimeMinutes} mins</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#FBF9F5] group-hover:text-[#D9A35F] transition-colors">
                    {pie.name}
                  </h3>

                  <p className="text-xs text-[#A39E93] line-clamp-2 font-light leading-relaxed">
                    {pie.description}
                  </p>
                </div>

                {/* Customize / Quick Add Button */}
                <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => setActiveItemForModal(pie)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-[#C85A32] text-[#FBF9F5] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 group-hover:bg-[#C85A32]"
                  >
                    <span>Customize & Order</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Centered CTA */}
          <div className="text-center pt-6">
            <Link
              to="/menu"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D9A35F]/40 text-[#FBF9F5] text-xs uppercase tracking-widest font-semibold transition-all"
            >
              <span>View All Handcrafted Pies & Sides</span>
              <ArrowRight className="w-4 h-4 text-[#D9A35F]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. HERITAGE & CRAFT PREVIEW (SCROLL STORYTELLING) */}
      <section
        ref={heritageSectionRef}
        className="home-scroll-reveal py-28 px-6 sm:px-12 lg:px-16 xl:px-20 border-b border-white/5 relative overflow-hidden w-full"
      >
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Editorial Left Pillar */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#D9A35F] font-semibold flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>The Alchemy of Fermentation</span>
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FBF9F5] leading-tight">
                72 Hours in Silence.
                <span className="block text-[#D9A35F]">900 Degrees in 85 Seconds.</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#A39E93] leading-relaxed font-light">
                True Neapolitan pizza cannot be rushed. Our dough begins with a Casertana mother starter nurtured since 1984. Through a strict three-phase cold fermentation, complex organic sugars break down, yielding an airy cornicione packed with deep lactic fragrance and remarkable digestibility.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C85A32]/20 flex items-center justify-center text-[#D9A35F] shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#FBF9F5] uppercase tracking-wider">
                      Stone-Milled Italian Flour (Tipo 00)
                    </h4>
                    <p className="text-xs text-[#A39E93] mt-0.5 font-light">
                      Blended with whole ancient spelt for elastic gluten structure and honeyed aroma.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C85A32]/20 flex items-center justify-center text-[#D9A35F] shrink-0">
                    <Thermometer className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#FBF9F5] uppercase tracking-wider">
                      Acunto Napoli Brick Oven
                    </h4>
                    <p className="text-xs text-[#A39E93] mt-0.5 font-light">
                      Fired exclusively with dried California white oak and olive orchard cuttings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/our-story"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D9A35F] hover:text-[#FBF9F5] transition-colors"
                >
                  <span>Read Chef Antonio’s Full Manifesto</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Heritage Timeline Snapshot */}
            <div className="lg:col-span-6 space-y-4">
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <h3 className="font-serif text-lg font-bold text-[#FBF9F5]">
                    Lineage of the Craft
                  </h3>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#D9A35F]">
                    Est. 1984
                  </span>
                </div>

                <div className="space-y-6">
                  {HERITAGE_TIMELINE.map((item, index) => (
                    <div key={index} className="flex gap-4 relative">
                      {index < HERITAGE_TIMELINE.length - 1 && (
                        <div className="absolute top-6 left-3 w-[1px] h-full bg-white/10" />
                      )}
                      <div className="w-6 h-6 rounded-full bg-[#1A1A1A] border border-[#D9A35F]/60 flex items-center justify-center text-[10px] font-mono text-[#D9A35F] shrink-0 z-10">
                        {index + 1}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-xs font-bold text-[#C85A32]">
                            {item.year}
                          </span>
                          <h4 className="text-xs font-semibold text-[#FBF9F5]">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-[#A39E93] font-light leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LOCATION & HOURS QUICK-VIEW */}
      <section className="home-scroll-reveal py-20 px-6 sm:px-12 lg:px-16 xl:px-20 border-b border-white/5 w-full">
        <div className="w-full">
          <div className="reveal-card glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs uppercase tracking-[0.2em] text-[#D9A35F] font-semibold flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5" />
                  <span>The Physical Hearth</span>
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#FBF9F5]">
                  Step Inside Antonio’s Corner
                </h3>
                <p className="text-xs sm:text-sm text-[#A39E93] font-light leading-relaxed">
                  Located at the corner of 4th and Elm in the Historic Arts District. Walk-ins are always welcomed at the marble bar overlooking the open brick oven.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs text-[#EFE9DC]">
                  <div>
                    <strong className="text-[#D9A35F] block mb-1 uppercase tracking-wider text-[10px]">
                      Address & Neighborhood
                    </strong>
                    <p className="text-[#A39E93] font-light">
                      428 Via dell’Arte (Historic Corner)<br />San Francisco / Bay Area, CA 94107
                    </p>
                  </div>
                  <div>
                    <strong className="text-[#D9A35F] block mb-1 uppercase tracking-wider text-[10px]">
                      Dine-in & Curbside Pickup
                    </strong>
                    <p className="text-[#A39E93] font-light">
                      Tue–Sun: 4:30 PM to 10:30 PM<br />Complimentary 90-min validation
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <Link
                  to="/location"
                  className="px-6 py-4 rounded-xl bg-[#FBF9F5] text-[#0D0D0D] hover:bg-[#D9A35F] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors text-center"
                >
                  <span>View Map & Parking</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/order"
                  className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#FBF9F5] text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 transition-colors text-center"
                >
                  <span>Order Pickup Online</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. REVIEWS & SOCIAL PROOF CAROUSEL */}
      <section className="home-scroll-reveal py-24 px-6 sm:px-12 lg:px-16 xl:px-20 w-full">
        <div className="w-full space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-[#D9A35F] font-semibold">
              Acclaim & Critic Dispatches
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FBF9F5]">
              Celebrated by Purists
            </h2>
            <p className="text-xs sm:text-sm text-[#A39E93] font-light">
              Reflections from food journalists and neighbors gathered around our wood-fired hearth.
            </p>
          </div>

          {/* Carousel / Grid of Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CUSTOMER_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="reveal-card p-6 rounded-2xl bg-[#121212] border border-white/10 flex flex-col justify-between space-y-4 hover:border-white/20 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#D9A35F]">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D9A35F]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#C85A32]/40" />
                  <p className="text-xs text-[#EFE9DC] font-light leading-relaxed italic">
                    "{review.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <h4 className="text-xs font-semibold text-[#FBF9F5]">{review.author}</h4>
                  <p className="text-[10px] text-[#A39E93]">{review.role}</p>
                  <p className="text-[9px] text-[#D9A35F] font-mono mt-0.5">{review.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
