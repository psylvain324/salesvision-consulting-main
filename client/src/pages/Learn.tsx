/*
 * LEARN PAGE: Blog section with carousel of recent posts + course-like learning areas.
 * Light theme, blue & orange accents. VanRein-inspired layout.
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
  BookOpen,
  Brain,
  BarChart3,
  Zap,
  FileText,
  ChevronLeft,
  ChevronRight,
  Clock,
  GraduationCap,
} from "lucide-react";
import { learnArticles } from "@/content/learnArticles";

const recentPosts = [
  {
    id: 1,
    title: "Getting Started with AI Automation for Small Business",
    excerpt: "Learn how to implement your first AI-driven workflow without enterprise-level resources.",
    category: "AI & Automation",
    date: "Mar 5, 2025",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "Digital Marketing Metrics That Actually Matter",
    excerpt: "Cut through the noise and focus on the KPIs that drive real business growth.",
    category: "Digital Marketing",
    date: "Mar 1, 2025",
    readTime: "6 min read",
  },
  {
    id: 3,
    title: "Building Your First Sales Automation Workflow",
    excerpt: "A step-by-step guide to automating lead follow-up and nurturing.",
    category: "Sales",
    date: "Feb 26, 2025",
    readTime: "10 min read",
  },
  {
    id: 4,
    title: "Web Design Trends for 2025: What to Watch",
    excerpt: "Explore emerging design patterns that improve conversion and user experience.",
    category: "Web Design",
    date: "Feb 20, 2025",
    readTime: "7 min read",
  },
];

const courseAreas = [
  {
    id: "ai-fundamentals",
    icon: Brain,
    title: "AI & Automation Fundamentals",
    desc: "Master the basics of AI-driven workflows, chatbots, and intelligent automation.",
    modules: 6,
    duration: "~4 hours",
    color: "sv-blue",
  },
  {
    id: "digital-marketing",
    icon: BarChart3,
    title: "Digital Marketing Essentials",
    desc: "Learn data-driven campaigns, SEO, and conversion optimization strategies.",
    modules: 5,
    duration: "~3 hours",
    color: "tv-orange",
  },
  {
    id: "sales-automation",
    icon: Zap,
    title: "Sales Automation Mastery",
    desc: "Automate lead generation, follow-ups, and CRM workflows for your team.",
    modules: 8,
    duration: "~5 hours",
    color: "sv-blue",
  },
  {
    id: "technology-consulting",
    icon: GraduationCap,
    title: "Technology Consulting",
    desc: "Strategic guidance on digital transformation and system architecture.",
    modules: 4,
    duration: "~2.5 hours",
    color: "tv-orange",
  },
];

function BlogCarousel({ posts }: { posts: typeof recentPosts }) {
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
    <div className="w-full">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", containScroll: "trimSnaps", loop: false }}
        className="w-full"
      >
        <CarouselContent className="ml-0 gap-6 sm:gap-8 lg:gap-10">
          {posts.map((post) => (
            <CarouselItem
              key={post.id}
              className="pl-0 shrink-0 basis-full sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1.125rem)]"
            >
              <motion.div
                className="group h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-sv-blue/20"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold text-sv-blue uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
                <h3 className="font-[Sora] text-lg font-semibold text-gray-900 mb-2 group-hover:text-sv-blue transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-sv-blue group-hover:gap-2 transition-all">
                    Read more <ArrowRight size={14} />
                  </span>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous post"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-sv-blue/30 hover:text-sv-blue disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {posts.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to post ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === selectedIndex
                    ? "bg-sv-blue w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next post"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-sv-blue/30 hover:text-sv-blue disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </Carousel>
    </div>
  );
}

export default function Learn() {
  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sv-blue/[0.03] via-transparent to-tv-orange/[0.03]" />
        <div className="container relative">
          <AnimatedSection>
            <div className="max-w-3xl">
              <span className="section-label text-sv-blue mb-4 inline-block">
                Learn
              </span>
              <h1 className="font-[Sora] text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                Insights &{" "}
                <span className="gradient-text-blue">Articles</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
                Stay ahead with our latest articles on AI automation, digital marketing,
                and technology. Explore our learning paths to grow your skills.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== RECENT POSTS CAROUSEL ===== */}
      <section className="py-16 lg:py-24 bg-gray-50/50">
        <div className="container">
          <AnimatedSection>
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <div className="section-accent mb-4" />
                <h2 className="font-[Sora] text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  Recent Posts
                </h2>
                <p className="mt-2 text-gray-600">
                  Latest articles on automation, marketing, and technology
                </p>
              </div>
              <a href="#all-articles">
                <span className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-sv-blue hover:text-sv-blue-light transition-colors">
                  View all posts <ArrowRight size={14} />
                </span>
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <BlogCarousel posts={recentPosts} />
          </AnimatedSection>
        </div>
      </section>

      {/* ===== ARTICLE TOPICS ===== */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="section-accent mx-auto mb-4" />
              <span className="section-label text-sv-blue/80 mb-4 inline-block">
                Article Topics
              </span>
              <h2 className="font-[Sora] text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                Explore articles
              </h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
                Articles and guides on AI automation, digital marketing,
                and technology consulting.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseAreas.map((course, i) => (
              <AnimatedSection key={course.id} delay={i * 0.08}>
                <div className="group h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-sv-blue/30">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                      course.color === "sv-blue"
                        ? "bg-sv-blue/10 text-sv-blue"
                        : "bg-tv-orange/10 text-tv-orange"
                    }`}
                  >
                    <course.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-[Sora] text-lg font-semibold text-gray-900 mb-2 group-hover:text-sv-blue transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    {course.desc}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <FileText size={12} />
                      {course.modules} modules
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {course.duration}
                    </span>
                  </div>
                  <Link href="/contact">
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-sv-blue hover:text-sv-blue-light transition-colors">
                      Explore articles <ArrowRight size={14} />
                    </span>
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ALL ARTICLES ===== */}
      <section id="all-articles" className="scroll-mt-24 py-24 lg:py-32 bg-gray-50/50">
        <div className="container">
          <AnimatedSection>
            <div className="mb-12">
              <div className="section-accent mb-4" />
              <h2 className="font-[Sora] text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                All Articles
              </h2>
              <p className="mt-2 text-gray-600">
                Browse our full library of guides and resources
              </p>
            </div>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {learnArticles.map((article, i) => (
              <AnimatedSection key={article.slug} delay={i * 0.05}>
                <Link href={`/learn/${article.slug}`}>
                  <div className="group h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-sv-blue/30 cursor-pointer">
                    <h3 className="font-[Sora] text-lg font-semibold text-gray-900 mb-2 group-hover:text-sv-blue transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                      {article.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-sv-blue group-hover:gap-3 transition-all">
                      Read article <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 lg:py-32 bg-gray-50/50">
        <div className="container">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto rounded-2xl border border-gray-200 bg-white p-10 lg:p-14 shadow-sm">
              <BookOpen className="w-12 h-12 text-sv-blue mx-auto mb-4 opacity-80" />
              <h2 className="font-[Sora] text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Ready to Level Up?
              </h2>
              <p className="mt-4 text-gray-600">
                Get notified when we publish new posts or articles.
                Subscribe to our newsletter for the latest updates.
              </p>
              <div className="mt-8">
                <Link href="/contact">
                  <span className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-xl transition-all duration-200 shadow-lg shadow-sv-blue/20">
                    Subscribe for Updates <ArrowRight size={16} />
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
