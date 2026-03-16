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

  return (
    <div className="min-h-screen">
      <div className="pt-24 pb-16 lg:pb-24">
        <div className="container">
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12">
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
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-sv-blue hover:bg-sv-blue-light rounded-lg transition-colors"
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
            <aside className="hidden lg:block shrink-0 w-56">
              <div className="sticky top-24">
                <p className="text-sm font-semibold text-gray-900 mb-3">On this page</p>
                <nav className="space-y-1">
                  {article.sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className={`block text-sm py-1 transition-colors ${
                        activeId === s.id ? "text-sv-blue font-medium" : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      {s.title}
                    </a>
                  ))}
                  {hasPdf && (
                    <a
                      href="#pdf-viewer"
                      className={`block text-sm py-1 transition-colors ${
                        activeId === "pdf-viewer" ? "text-sv-blue font-medium" : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      View PDF
                    </a>
                  )}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnArticlePage;
