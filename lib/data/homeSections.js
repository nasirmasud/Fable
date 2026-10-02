// Static content for the new home sections.
// TODO: replace with real API data wherever an endpoint exists.
// Any claim about payments, refunds, payouts or formats must be verified against
// server/index.js and lib/stripe.js before it ships. Unverified claims are marked TODO.

export const ROYALTY_RATE = 0.9;

export const AUTHOR_VERIFICATION_FEE_NOTE =
  "TODO: confirm the real author verification fee with the client before publishing this line.";

export const livePulse = [
  { id: "lp-1", text: "Maya Okonkwo published Celestial Bakery, Chapter 1", ago: "2m" },
  { id: "lp-2", text: "Arun Verma earned $42.80 from 6 sales", ago: "6m" },
  { id: "lp-3", text: "Ines Duarte finished reading The Glass Orchard", ago: "11m" },
  { id: "lp-4", text: "Tobias Lind signed up as a writer", ago: "18m" },
  { id: "lp-5", text: "Priya Raman preordered Salt and Starlight", ago: "24m" },
];

export const howFableWorks = [
  {
    id: "hw-1",
    step: "01",
    title: "Discover and preview",
    body: "Browse the catalogue and read a free sample of any ebook before you decide.",
    footer: "Free to browse",
  },
  {
    id: "hw-2",
    step: "02",
    title: "Checkout in one step",
    body: "Pay once and the full ebook is added to your library straight away.",
    footer: "Secure checkout",
  },
  {
    id: "hw-3",
    step: "03",
    title: "Read anywhere",
    body: "Pick up on any device and keep your place automatically.",
    footer: "Sync across devices",
  },
];

export const readerPreview = {
  id: "rp-1",
  title: "The Glass Orchard",
  author: "Ines Duarte",
  blurb:
    "A botanist inherits a greenhouse that only grows fruit nobody has seen before, and a debt that comes due at the first harvest.",
  progress: 38,
};

export const readerFeatures = [
  { id: "rf-1", title: "Adjustable type", body: "Size and line height controls built in." },
  { id: "rf-2", title: "Light and dark", body: "Three reading themes to suit the room." },
  { id: "rf-3", title: "Highlights", body: "Mark passages and find them again later." },
  { id: "rf-4", title: "Syncs progress", body: "Your place follows you between devices." },
];

export const writerPillars = [
  { id: "wp-1", title: "Your readers, your list", body: "Keep your audience and stay in contact with them." },
  { id: "wp-2", title: "Simple publishing", body: "Upload once and your ebook is live on the catalogue." },
  { id: "wp-3", title: "Clear reporting", body: "Per-title, per-month breakdowns of what sold." },
  { id: "wp-4", title: "No monthly fee", body: "There is no subscription to keep or cancel." },
];

export const trustPillars = [
  { id: "tp-1", title: "Secure checkout", body: "Card details are handled by the payment provider, not stored here." },
  { id: "tp-2", title: "Payouts you can trace", body: "Every sale is itemised in your dashboard." },
  { id: "tp-3", title: "Your work stays yours", body: "You keep ownership of everything you upload." },
  { id: "tp-4", title: "Real catalogue", body: "Books are listed with the format and price you set." },
];

export const faq = [
  {
    id: "faq-1",
    q: "Do I need an account to browse?",
    a: "No. Browsing the catalogue and reading free samples works without an account.",
  },
  {
    id: "faq-2",
    q: "How do I publish an ebook?",
    a: "Sign in as a writer, upload your file and cover, set a price and publish from your dashboard.",
  },
  {
    id: "faq-3",
    q: "Is there a fee to publish?",
    a: "There is no monthly subscription and no per-book listing fee.",
  },
  {
    id: "faq-4",
    q: "What share of a sale do I keep?",
    a: "Writers keep 90% of a sale. The exact figure shown to writers is read from the shared royalty rate so it cannot drift between the site and this page.",
  },
  {
    id: "faq-5",
    q: "When are payouts made?",
    a: "TODO: confirm the payout schedule with the client. This answer is currently a placeholder.",
  },
  {
    id: "faq-6",
    q: "What happens if a reader wants a refund?",
    a: "TODO: confirm the refund window with the client. This answer is currently a placeholder.",
  },
  {
    id: "faq-7",
    q: "Which file formats can I upload?",
    a: "TODO: confirm the accepted upload formats against the upload handler before publishing.",
  },
  {
    id: "faq-8",
    q: "Can I edit a book after publishing it?",
    a: "Edit the title, description, cover or price from your dashboard. The reader library already owns a copy, so treat republishing as a new title if the content changes substantially.",
  },
];

export const editorPickFallback = {
  id: "ep-fallback",
  title: "Editor's Spotlight",
  note: "TODO: replace with the real editor's pick once an endpoint exists.",
};