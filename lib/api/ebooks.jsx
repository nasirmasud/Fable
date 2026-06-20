const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getWritersEbooks = async (ebookId, status = 'draft') => {
  const res = await fetch(`${baseURL}/api/ebooks?ebookId=${ebookId}&status=${status}`)
  return res.json()
}