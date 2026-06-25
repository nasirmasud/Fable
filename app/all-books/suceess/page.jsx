import SuccessPage from "@/components/pageContent/SussessPage"
import { soldEbook } from "@/lib/actions/soldBooks"
import { getUserSession } from "@/lib/core/session"
import { stripe } from "@/lib/stripe"
import { redirect } from 'next/navigation'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail, name: customerName },
    metadata,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') return redirect('/')

  if (status === 'complete') {
    const user = await getUserSession()
    const dashboardHref = `/dashboard/${user?.role || "reader"}`

    await soldEbook({
      bookId: metadata.bookId,
      bookTitle: metadata.bookTitle,
      author: metadata.author,
      price: metadata.price ? Number(metadata.price) : undefined,
      buyerId: metadata.buyerId,
      sellerId: metadata.sellerId,
      coverImage: metadata.coverImage,
      name: metadata.name || customerName,
      email: customerEmail,
      phone: metadata.phone || "",
    })

    return (
      <SuccessPage
        customerEmail={customerEmail}
        bookTitle={metadata.bookTitle}
        dashboardHref={dashboardHref}
      />
    )
  }
}