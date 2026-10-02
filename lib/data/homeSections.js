// Static content for the new home sections.
// TODO: replace with real API data wherever an endpoint exists.

export const ROYALTY_RATE = 0.9;

export const FEE_NOTE = "No monthly fee. You keep 90% of every sale.";

export const livePulse = [
  { id: "lp-1", text: "Maya Okonkwo published Celestial Bakery, Chapter 1", ago: "2m" },
  { id: "lp-2", text: "Arun Verma earned $42.80 from 6 sales", ago: "6m" },
  { id: "lp-3", text: "Ines Duarte finished reading The Glass Orchard", ago: "11m" },
  { id: "lp-4", text: "Tobias Lind joined as a verified writer", ago: "18m" },
  { id: "lp-5", text: "Priya Raman preordered Salt and Starlight", ago: "24m" },
];

export const howFableWorks = [
  {
    id: "hw-1",
    title: "Write in private",
    body: "Draft in the browser or upload a manuscript. Nothing is public until you say so.",
  },
  {
    id: "hw-2",
    title: "Publish with one click",
    body: "Set a price, pick a cover, and your ebook is live for readers across the platform.",
  },
  {
    id: "hw-3",
    title: "Keep 90% of every sale",
    body: "Revenue lands in your dashboard with a full breakdown per title, per month.",
  },
];

export const readerPreview = {
  id: "rp-1",
  title: "The Glass Orchard",
  author: "Ines Duarte",
  blurb:
    "A botanist inherits a greenhouse that only grows fruit nobody has seen before, and a debt that comes due at the first harvest.",
  stat: "4.8 average from 1,204 readers",
};

export const writerPillars = [
  { id: "wp-1", title: "Your readers, your list", body: "Own your audience and contact them directly." },
  { id: "wp-2", title: "Predictable payouts", body: "Monthly statements, no minimum threshold." },
  { id: "wp-3", title: "Formats you control", body: "EPUB, PDF and Kindle-compatible files." },
];

export const trustPillars = [
  { id: "tp-1", title: "Secure payments", body: "Payments are held until the reader confirms delivery." },
  { id: "tp-2", title: "Verified writers", body: "Every payout identity is checked before the first sale." },
  { id: "tp-3", title: "Reader-first refunds", body: "Clear refund windows, handled from your dashboard." },
];

export const faq = [
  {
    id: "faq-1",
    q: "How much does Fable cost to publish?",
    a: "Nothing to publish. There is no monthly subscription and no listing fee.",
  },
  {
    id: "faq-2",
    q: "When do I get paid?",
    a: "Payouts run monthly once sales clear the refund window. Full breakdown is in your dashboard.",
  },
  {
    id: "faq-3",
    q: "Can I update a book after publishing?",
    a: "Yes. Edit the description, cover or price at any time. The file itself can be replaced too.",
  },
  {
    id: "faq-4",
    q: "Which file formats do readers get?",
    a: "EPUB and PDF, and Kindle-compatible files for the most popular readers.",
  },
];

export const editorPickFallback = {
  id: "ep-fallback",
  title: "Editor's pick",
  note: "TODO: replace with the real editor's pick from the API once the endpoint exists.",
};