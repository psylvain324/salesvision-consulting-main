/*
 * DESIGN: Meridian — Refined Dark Luxury
 * TRAVELVISION PAGE: Warm coral-gold color temperature. AI-powered travel agency.
 * Accent: Sunset coral-to-gold gradient (#f97316 → #eab308)
 */
import { useState, useCallback, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  ArrowRight,
  Plane,
  Ship,
  MapPin,
  Hotel,
  Palmtree,
  Compass,
  Sparkles,
  Globe,
  CalendarDays,
  CreditCard,
  Headphones,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const TV_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663397693691/kUiTSqrNT343A8hDu8MEPH/travelvision-hero-JyREbWXK7bPZ5D6FYr8mUH.webp";

const travelServices = [
  {
    icon: Ship,
    title: "Cruise Packages",
    desc: "From Caribbean getaways to Mediterranean voyages, we connect travelers with the best cruise lines and itineraries through AI-matched recommendations.",
  },
  {
    icon: Palmtree,
    title: "Tour Packages",
    desc: "Curated tour experiences worldwide — guided adventures, cultural immersions, and exclusive excursions tailored to every traveler's preferences.",
  },
  {
    icon: Plane,
    title: "Flights",
    desc: "AI-optimized flight search and booking that finds the best routes, prices, and connections for domestic and international travel.",
  },
  {
    icon: Hotel,
    title: "Hotels & Resorts",
    desc: "Premium accommodation booking from boutique hotels to luxury resorts, with personalized recommendations based on traveler profiles.",
  },
  {
    icon: MapPin,
    title: "Custom Itineraries",
    desc: "AI-generated travel itineraries that balance must-see attractions, hidden gems, dining, and relaxation for the perfect trip.",
  },
  {
    icon: Compass,
    title: "P2P Travel Services",
    desc: "Peer-to-peer travel booking platform connecting travelers directly with local experiences, guides, and unique accommodations.",
  },
];

const popularDestinations = [
  { dest: "Caribbean Cruises", type: "Cruise", price: "From $899" },
  { dest: "Mediterranean Tours", type: "Tour Package", price: "From $1,499" },
  { dest: "Hawaiian Getaway", type: "Flight + Hotel", price: "From $1,199" },
  { dest: "European Explorer", type: "Multi-City", price: "From $2,299" },
  { dest: "Alaskan Adventure", type: "Cruise + Tour", price: "From $1,799" },
];

function PopularDestinationsCarousel({
  destinations,
}: {
  destinations: Array<{ dest: string; type: string; price: string }>;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setSelectedIndex(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
  }, [api]);

  return (
    <div className="w-full px-6 sm:px-8">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          containScroll: "trimSnaps",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="ml-0 gap-6 sm:gap-8 lg:gap-10">
          {destinations.map((item, i) => (
            <CarouselItem
              key={item.dest}
              className="pl-0 shrink-0 basis-full sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1.125rem)]"
            >
              <motion.div
                className="flex flex-col h-full p-7 sm:p-8 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors border border-white/5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <MapPin className="w-5 h-5 text-tv-orange/70 mb-3" />
                <div className="text-sm font-medium text-white">{item.dest}</div>
                <div className="text-xs text-white/70 mt-1">{item.type}</div>
                <span className="text-sm font-semibold text-tv-orange mt-4">
                  {item.price}
                </span>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-white/5">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous destination"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {destinations.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to destination ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === selectedIndex
                    ? "bg-tv-orange w-6"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next destination"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </Carousel>
    </div>
  );
}

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Recommendations",
    desc: "Our intelligent algorithms learn traveler preferences to suggest perfect destinations, accommodations, and activities.",
  },
  {
    icon: CalendarDays,
    title: "Automated Booking Workflows",
    desc: "Seamless booking automation from inquiry to confirmation, with real-time availability and instant pricing.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment Processing",
    desc: "Multiple payment options with enterprise-grade security for worry-free transactions.",
  },
  {
    icon: Headphones,
    title: "24/7 AI Support",
    desc: "Round-the-clock automated support for booking changes, travel updates, and customer inquiries.",
  },
];

export default function TravelVision() {
  return (
    <div className="min-h-screen bg-brand-darker dark">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={TV_HERO} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-darker/70 via-brand-darker/50 to-brand-darker" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-darker/90 via-brand-darker/40 to-transparent" />
        </div>

        <motion.div
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-tv-orange/5 blur-3xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative container pt-32 pb-20">
          <div className="max-w-3xl">
            <motion.span
              className="section-label text-tv-orange mb-6 inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              TravelVision Division
            </motion.span>
            <motion.h1
              className="font-[Sora] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              AI-Powered
              <br />
              <span className="gradient-text-orange">Travel Agency</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-white/90 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Leveraging artificial intelligence to revolutionize travel booking.
              From cruises and tours to flights and hotels, we automate lead generation,
              sales workflows, and direct booking for unforgettable travel experiences.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Link href="/contact">
                <span className="sv-neo-btn sv-neo-btn--orange inline-flex items-center gap-2 px-7 py-3.5 text-sm rounded-xl">
                  Plan Your Trip <ArrowRight size={16} />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TRAVEL SERVICES ===== */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tv-orange/[0.02] to-transparent" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="section-label text-tv-orange/60 mb-4 inline-block">Travel Services</span>
              <h2 className="font-[Sora] text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight gradient-text-logo">
                Your Journey Starts Here
              </h2>
              <motion.p
                className="mt-6 text-2xl sm:text-3xl lg:text-4xl font-medium text-white/80 max-w-3xl mx-auto"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                Discover amazing places with exclusive deals and benefits
              </motion.p>
              <p className="mt-4 text-white/85 max-w-2xl mx-auto text-lg">
                Comprehensive travel services powered by AI, from discovery to booking to post-trip support.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {travelServices.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 0.08}>
                <div className="group rounded-2xl glass-card glass-card-hover p-7 transition-all duration-300 h-full">
                  <div className="w-11 h-11 rounded-xl bg-tv-orange/10 flex items-center justify-center mb-5 group-hover:bg-tv-orange/15 transition-colors">
                    <service.icon className="w-5 h-5 text-tv-orange" />
                  </div>
                  <h3 className="font-[Sora] text-lg font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/85 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY TRAVELVISION ===== */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <span className="section-label text-tv-orange/60 mb-4 inline-block">Why TravelVision</span>
                <h2 className="font-[Sora] text-3xl sm:text-4xl font-bold uppercase tracking-tight gradient-text-logo">
                  Technology Meets Wanderlust
                </h2>
                <p className="mt-5 text-white/85 leading-relaxed text-lg">
                  TravelVision combines the warmth of personalized travel planning with
                  the precision of artificial intelligence. Our platform automates the
                  complex logistics of travel booking while maintaining the human touch
                  that makes every journey special.
                </p>
                <div className="mt-8 space-y-4">
                  {features.map((feature, i) => (
                    <motion.div
                      key={feature.title}
                      className="flex gap-4 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-tv-orange/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-5 h-5 text-tv-orange" />
                      </div>
                      <div>
                        <h4 className="font-[Sora] text-sm font-semibold text-white mb-1">{feature.title}</h4>
                        <p className="text-sm text-white/85">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="rounded-2xl glass-card p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <Globe className="w-6 h-6 text-tv-orange" />
                    <h3 className="font-[Sora] text-lg font-semibold text-white">Popular Destinations</h3>
                  </div>
                  <PopularDestinationsCarousel destinations={popularDestinations} />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tv-orange/8 via-transparent to-tv-gold/5" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-[Sora] text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight gradient-text-logo">
                Find Your Next Amazing Adventure
              </h2>
              <p className="mt-5 text-white/85 text-lg">
                Whether it's a luxury cruise, an exotic tour, or a weekend getaway,
                TravelVision's AI-powered platform makes booking effortless.
              </p>
              <div className="mt-10">
                <Link href="/contact">
                  <span className="sv-neo-btn sv-neo-btn--orange inline-flex items-center gap-2 px-8 py-4 text-sm rounded-xl">
                    Get a Quote <ArrowRight size={16} />
                  </span>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
