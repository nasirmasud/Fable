const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getWritersEbooks = async (writerEmail, status = 'draft') => {
  const res = await fetch(`${baseURL}/api/ebooks?writerEmail=${writerEmail}&status=${status}`);
  return res.json()
}