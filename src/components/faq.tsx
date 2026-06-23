"use client";

import { motion } from "framer-motion";
import { FAQChatAccordion } from "@/components/ruixen/faq-chat-accordion";
import type { FAQItem } from "@/components/ruixen/faq-chat-accordion";

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const faqItems: FAQItem[] = [
  {
    question: "What is Grog?",
    answer: "Grog is an offline-first notes app with a primitive, caveman aesthetic. It lets you jot down thoughts, sketch ideas, and create mind maps—all stored locally on your device.",
  },
  {
    question: "Does Grog work offline?",
    answer: "Yes, completely. Grog is built from the ground up to work without internet. Create, edit, and organize your notes anytime, anywhere.",
  },
  {
    question: "Where is my data stored?",
    answer: "Your data lives on your device in local storage. Nothing syncs to the cloud unless you explicitly choose to export or backup.",
  },
  {
    question: "Can I use Grog on multiple devices?",
    answer: "Currently, Grog syncs across devices using optional cloud backup. Your offline vault stays yours—sync is opt-in.",
  },
  {
    question: "What formats can I use?",
    answer: "Write plain text, sketch freely, build mind maps, or mix all three. Grog supports whatever works for your thinking.",
  },
  {
    question: "Is Grog free?",
    answer: "Yes. Grog is free to download and use. We may offer premium features later, but the core app will always be free.",
  },
  {
    question: "How do I export my notes?",
    answer: "Export individual notes or your entire vault as JSON or PDF. You own your data and can move it anytime.",
  },
  {
    question: "What platforms is Grog available on?",
    answer: "Grog is available on iOS and Android. Web access is planned for future releases.",
  },
];

export default function GrogFAQ() {
  return (
    <div className="border-t border-foreground/[0.06]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-28">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[15px] font-mono tracking-[0.25em] uppercase text-muted-foreground/90 mb-10 sm:mb-14"
        >
          Questions about Grog
        </motion.p>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          <FAQChatAccordion items={faqItems} />
        </motion.div>
      </div>
    </div>
  );
}