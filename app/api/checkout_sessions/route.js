import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";

export async function POST(request) {
  try {
    const {
      bookId,
      bookTitle,
      price,
      email,
      name,
      phone,
      author,
      buyerId,
      coverImage,
    } = await request.json();

    if (!bookTitle || price == null) {
      return NextResponse.json(
        { error: "Book title and price are required." },
        { status: 400 },
      );
    }

    const headersList = await headers();
    const origin = headersList.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL;

    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: bookTitle,
              metadata: bookId ? { bookId: String(bookId) } : undefined,
            },
            unit_amount: Math.round(Number(price) * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/all-books/suceess?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/all-books/${bookId}`,
      metadata: {
        bookId: bookId ? String(bookId) : "",
        bookTitle: String(bookTitle),
        price: String(price),
        author: author ? String(author) : "",
        buyerId: buyerId ? String(buyerId) : "",
        name: name ? String(name) : "",
        phone: phone ? String(phone) : "",
        coverImage: coverImage ? String(coverImage) : "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
