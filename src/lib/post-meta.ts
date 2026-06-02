/** Display labels for blog post topics (Góc Luật Sư). */
export const POST_TOPICS: Record<string, string> = {
  'canh-bao': 'Cảnh báo pháp lý',
  'ai-vs-luat-su': 'AI vs Luật sư',
  'kien-thuc': 'Kiến thức pháp lý',
  'cap-nhat-luat': 'Cập nhật luật',
}

export function postTopicLabel(topic?: string | null): string | null {
  if (!topic) return null
  return POST_TOPICS[topic] ?? null
}
