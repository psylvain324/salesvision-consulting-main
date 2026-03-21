/*
 * LEARN ARTICLE: Individual article page with sticky TOC and section navigation.
 * PDF-backed articles embed the full PDF for interactive inline viewing.
 */
import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { learnArticles } from "@/content/learnArticles";
import { Download } from "lucide-react";

function LearnArticlePage() {
  const [, params] = useRoute("/learn/:slug");
  const slug = params?.slug ?? "";
  const article = learnArticles.find((a) => a.slug === slug);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!article) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveId(e.target.id);
        }
      },
      { rootMargin: "-100px 0px -60% 0px" }
    );
    article.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    if (article.pdfPath) {
      const pdfEl = document.getElementById("pdf-viewer");
      if (pdfEl) observer.observe(pdfEl);
    }
    return () => observer.disconnect();
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container">
          <p className="text-gray-600">Article not found.</p>
          <Link href="/learn">
            <span className="mt-4 inline-block text-sv-blue hover:underline">Back to Learn</span>
          </Link>
        </div>
      </div>
    );
  }

  const hasPdf = Boolean(article.pdfPath);
  const showToc = article.sections.length >= 2 || (article.sections.length >= 1 && hasPdf);

  return (
    <div className="min-h-screen">
      <div className="pt-24 pb-16 lg:pb-24">
        <div className="container">
          <div
            className={`mx-auto flex flex-col gap-12 ${
              showToc ? "max-w-6xl lg:flex-row lg:gap-16" : "max-w-4xl"
            }`}
          >
            {showToc && (
              <aside className="hidden lg:block shrink-0 w-52 order-first">
                <div className="sticky top-28">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                    On this page
                  </p>
                  <nav className="space-y-1 border-l-2 border-gray-200 pl-4">
                    {article.sections.map((s) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        className={`block text-sm py-1.5 -ml-4 pl-4 border-l-2 -mt-px transition-colors ${
                          activeId === s.id
                            ? "border-sv-blue text-sv-blue font-medium"
                            : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
                        }`}
                      >
                        {s.title}
                      </a>
                    ))}
                    {hasPdf && (
                      <a
                        href="#pdf-viewer"
                        className={`block text-sm py-1.5 -ml-4 pl-4 border-l-2 -mt-px transition-colors ${
                          activeId === "pdf-viewer"
                            ? "border-sv-blue text-sv-blue font-medium"
                            : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
                        }`}
                      >
                        View PDF
                      </a>
                    )}
                  </nav>
                </div>
              </aside>
            )}
            <main className="min-w-0 flex-1">
              <h1 className="font-[Sora] text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                {article.title}
              </h1>
              <p className="mt-4 text-lg text-gray-600">{article.description}</p>

              {hasPdf && (
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={encodeURI(article.pdfPath!)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sv-neo-btn sv-neo-btn--blue inline-flex items-center gap-2 px-4 py-2.5 text-sm rounded-xl"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </a>
                </div>
              )}

              <div className="mt-12 space-y-12">
                {article.sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28"
                  >
                    <h2 className="font-[Sora] text-xl font-semibold text-gray-900 mb-4">
                      {section.title}
                    </h2>
                    <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                      {section.content}
                    </div>
                    {hasPdf && section.id === article.sections[0]?.id && (
                      <div id="pdf-viewer" className="mt-8 rounded-xl border border-gray-200 bg-gray-50/50 overflow-hidden scroll-mt-28">
                        <iframe
                          src={`${encodeURI(article.pdfPath!)}#view=FitH`}
                          title={article.title}
                          className="w-full min-h-[600px] lg:min-h-[80vh] border-0"
                        />
                      </div>
                    )}
                  </section>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnArticlePage;
