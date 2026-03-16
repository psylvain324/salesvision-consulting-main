/**
 * Learn article content.
 * Each PDF in client/public/Pdfs has an interactive page here.
 * Use pdfPath to embed the full PDF; sections provide optional intro/key takeaways.
 */

export type ArticleSection = {
  id: string;
  title: string;
  content: string;
};

export type LearnArticle = {
  slug: string;
  title: string;
  description: string;
  /** Path to PDF in public folder (e.g. /Pdfs/filename.pdf). When set, embeds the full PDF. */
  pdfPath?: string;
  sections: ArticleSection[];
};

export const learnArticles: LearnArticle[] = [
  {
    slug: "ai-health-guide",
    title: "AI Health Insurance Marketing Guide",
    description: "Leverage AI to grow your health insurance book of business.",
    pdfPath: "/Pdfs/ai_health_insurance_marketing_guide.pdf",
    sections: [
      { id: "intro", title: "About This Guide", content: "This guide covers how to use AI and automation to grow your health insurance business. Read the full PDF below for strategies, tools, and step-by-step implementation." },
    ],
  },
  {
    slug: "stack-playbook-2026",
    title: "Stack Playbook 2026",
    description: "Your technology stack playbook for the year ahead.",
    pdfPath: "/Pdfs/Stack Playbook 2026.pdf",
    sections: [
      { id: "overview", title: "About This Playbook", content: "Your guide to selecting and optimizing your technology stack in 2026. The full playbook is embedded below for interactive reading." },
    ],
  },
  {
    slug: "your-first-llc",
    title: "Your First LLC: From Idea to Tax-Ready Business",
    description: "A step-by-step guide to forming and running your LLC.",
    pdfPath: "/Pdfs/Your-First-LLC-From-Idea-to-TaxReady-Business.pdf",
    sections: [
      { id: "overview", title: "About This Guide", content: "Everything you need to go from business idea to a fully formed, tax-ready LLC. View the complete guide in the PDF below." },
    ],
  },
  {
    slug: "finding-clients",
    title: "Finding Clients as a New Tech Consultant",
    description: "Practical strategies for landing your first clients as a technology consultant.",
    pdfPath: "/Pdfs/Finding-Clients-as-a-New-Tech-Consultant.pdf",
    sections: [
      { id: "overview", title: "About This Guide", content: "Learn how to find and land clients when you're new to tech consulting. The full guide is embedded below." },
    ],
  },
];
