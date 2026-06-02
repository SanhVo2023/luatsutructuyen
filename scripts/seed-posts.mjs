#!/usr/bin/env node
/**
 * Seed 3 launch "Góc Luật Sư" blog posts via the Payload REST API — embodying
 * the "Authority Gap" angle (measured, evidence-based tone). Idempotent: skips
 * posts whose slug already exists. Run AFTER seed-admin + a dev boot (push
 * creates the `posts` table). Bylined to the Apolo Editorial Team.
 */
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SITE_ROOT = path.resolve(__dirname, '..')
dotenv.config({ path: path.join(SITE_ROOT, '.env.local') })
dotenv.config({ path: path.join(SITE_ROOT, '.env') })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const EMAIL = process.env.SEED_ADMIN_EMAIL
const PASSWORD = process.env.SEED_ADMIN_PASSWORD

if (!EMAIL || !PASSWORD) {
  console.error('SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set in .env')
  process.exit(1)
}

const TODAY = new Date().toISOString().slice(0, 10)

const POSTS = [
  {
    title: "AI có thể “bịa” ra điều luật — vì sao bạn không nên tin tuyệt đối",
    slug: 'ai-co-the-bia-ra-dieu-luat',
    topic: 'ai-vs-luat-su',
    readingTime: 6,
    featured: true,
    excerpt:
      'Các công cụ AI trả lời rất trơn tru, nhưng đã có nhiều trường hợp chúng dẫn ra điều luật, bản án không có thật. Trong pháp lý, một trích dẫn sai có thể khiến bạn mất cả vụ việc.',
    content: `Khi bạn hỏi một công cụ AI về pháp luật, câu trả lời thường rất mượt mà, tự tin và nghe “đúng chuyên môn”. Vấn đề là: sự trôi chảy đó không đồng nghĩa với chính xác.

## AI được thiết kế để nghe thuyết phục, không để chịu trách nhiệm

Các mô hình ngôn ngữ dự đoán từ tiếp theo dựa trên xác suất. Chúng giỏi tạo ra văn bản “trông giống” câu trả lời pháp lý — kể cả khi phải “điền vào chỗ trống” bằng một số điều, một bản án không có thật. Hiện tượng này được gọi là “ảo giác” (hallucination), và nó phổ biến hơn nhiều người tưởng.

## Vì sao điều này nguy hiểm trong pháp lý

Trong nhiều lĩnh vực, một câu trả lời gần đúng vẫn có ích. Nhưng pháp luật thì khác: một điều luật sai, một mốc thời hiệu tính nhầm, hay một quy định đã hết hiệu lực có thể đảo ngược toàn bộ kết quả. Nếu bạn mang một điều luật không tồn tại ra làm việc với cơ quan chức năng hoặc trước tòa, bạn không chỉ mất uy tín — bạn có thể mất luôn cơ hội bảo vệ quyền lợi của mình.

## Luật Việt Nam thay đổi nhanh

Sau cải cách hành chính 2025 và hàng loạt sửa đổi bộ luật, nhiều quy định đã khác trước. Dữ liệu mà AI học được thường cũ và trộn lẫn nhiều nguồn, nên nó rất dễ dẫn lại những điều luật đã bị thay thế. Một luật sư đang hành nghề làm việc với luật đang có hiệu lực hôm nay.

## Dùng AI sao cho an toàn

AI và công cụ tìm kiếm vẫn có chỗ đứng: để bạn hiểu bối cảnh chung và đặt câu hỏi tốt hơn. Nhưng hãy coi đó là điểm khởi đầu, không phải kết luận. Với bất kỳ quyết định quan trọng nào — ký hợp đồng, nộp đơn, chọn hướng giải quyết — hãy xác nhận lại với một luật sư có chứng chỉ.

Một luật sư thật sẽ kiểm tra đúng điều luật, đối chiếu với tình tiết cụ thể của bạn, và chịu trách nhiệm nghề nghiệp về lời tư vấn đó.

**Gọi luật sư Apolo: 0903.419.479** để được tư vấn cho đúng trường hợp của bạn. Buổi đầu miễn phí, bảo mật tuyệt đối.`,
  },
  {
    title: "Câu trả lời trên mạng đúng “nói chung” nhưng có thể sai với trường hợp của bạn",
    slug: 'dung-noi-chung-nhung-sai-voi-ban',
    topic: 'canh-bao',
    readingTime: 5,
    featured: false,
    excerpt:
      'Pháp luật phụ thuộc vào tình tiết: một ngày tháng, một tờ giấy, một mối quan hệ có thể đảo ngược kết quả. Đó là những chi tiết mà một câu trả lời chung bỏ qua.',
    content: `Bạn gõ câu hỏi vào Google hoặc một nhóm Facebook, nhận được một câu trả lời nghe rất hợp lý, và bạn yên tâm làm theo. Đó chính là lúc rủi ro bắt đầu.

## Luật là chuyện của tình tiết

Một câu hỏi tưởng chừng giống nhau có thể có câu trả lời trái ngược, tùy vào: thời điểm sự việc xảy ra, giấy tờ bạn đang giữ, mối quan hệ giữa các bên, hay một thời hiệu sắp hết. Câu trả lời trên mạng được viết cho “trường hợp trung bình” — nhưng vụ việc của bạn không trung bình.

## Ví dụ: cùng một câu hỏi, hai kết quả

Hãy lấy một tình huống tranh chấp đất. “Tôi có đòi lại được không?” — câu trả lời phụ thuộc vào việc bạn có giấy tờ gì, đã hòa giải ở cấp xã chưa, và sự việc diễn ra bao lâu rồi. Thiếu một trong những chi tiết đó, câu trả lời chung có thể dẫn bạn đi sai hướng — ví dụ tưởng mình đã hết quyền trong khi thực ra vẫn còn.

## Luật sư hỏi đúng câu

Khác biệt lớn nhất không phải ở việc luật sư “biết nhiều luật hơn”, mà ở việc họ biết **hỏi đúng câu** để lộ ra những chi tiết quyết định. Đó là việc một ô tìm kiếm không thể làm, vì nó không biết — và không hỏi — về hoàn cảnh riêng của bạn.

## Trước khi hành động, hãy kiểm tra lại

Nếu vấn đề có giá trị hoặc rủi ro đáng kể, đừng để một câu trả lời miễn phí quyết định thay bạn. Một cuộc gọi ngắn cho luật sư có thể giúp bạn tránh một sai lầm tốn kém hơn nhiều.

**Gọi luật sư Apolo: 0903.419.479** để được nghe đúng trường hợp của bạn. Buổi đầu miễn phí.`,
  },
  {
    title: "Khi một câu trả lời miễn phí sai, ai chịu trách nhiệm?",
    slug: 'cau-tra-loi-mien-phi-sai-ai-chiu-trach-nhiem',
    topic: 'canh-bao',
    readingTime: 5,
    featured: false,
    excerpt:
      'Khi một câu trả lời trên mạng hay từ AI sai, không ai đứng ra chịu trách nhiệm — bạn gánh toàn bộ. Đó là khác biệt căn bản giữa thông tin và tư vấn có trách nhiệm.',
    content: `Hãy đặt một câu hỏi đơn giản: nếu câu trả lời bạn làm theo hóa ra sai, ai đứng ra chịu trách nhiệm?

## Với thông tin miễn phí: không ai cả

Một bài viết trên mạng, một bình luận trong nhóm, hay một câu trả lời từ AI — tất cả đều đi kèm, dù nói rõ hay không, một sự miễn trừ trách nhiệm. Nếu sai, hậu quả thuộc về bạn: tiền, thời gian, và đôi khi là cả quyền lợi không lấy lại được.

## Với luật sư: có người chịu trách nhiệm

Luật sư có chứng chỉ hành nghề chịu trách nhiệm nghề nghiệp trước Đoàn Luật sư và trước khách hàng. Họ bị ràng buộc bởi quy tắc đạo đức nghề nghiệp, nghĩa vụ bảo mật, và có cơ chế để bạn khiếu nại nếu cần. Đó là khác biệt căn bản giữa **thông tin** và **tư vấn có trách nhiệm**.

## Bảo mật cũng là một khác biệt

Gõ vấn đề của bạn vào một AI công khai hay một nhóm mạng xã hội không được pháp luật bảo vệ — thông tin có thể bị lưu lại, chụp màn hình, thậm chí dùng ngược lại chống bạn. Trao đổi với luật sư được giữ bí mật theo nghĩa vụ nghề nghiệp.

## Kết luận

Thông tin miễn phí hữu ích để bắt đầu. Nhưng khi cần một quyết định có thể ảnh hưởng đến tiền bạc và quyền lợi, hãy chọn người sẵn sàng chịu trách nhiệm cùng bạn.

**Gọi luật sư Apolo: 0903.419.479** — tư vấn có trách nhiệm, buổi đầu miễn phí, bảo mật tuyệt đối.`,
  },
]

async function login() {
  const res = await fetch(`${SITE_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  if (!res.ok) throw new Error(`Login failed: ${res.status} ${await res.text()}`)
  return (await res.json()).token
}

async function findBySlug(token, collection, slug) {
  const res = await fetch(
    `${SITE_URL}/api/${collection}?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`,
    { headers: { Authorization: `JWT ${token}` } },
  )
  if (!res.ok) return null
  return (await res.json()).docs?.[0] ?? null
}

async function main() {
  console.log('[seed-posts] logging in…')
  const token = await login()

  const author = await findBySlug(token, 'authors', 'editorial-team')
  const authorId = author?.id
  if (!authorId) console.warn('[seed-posts] editorial-team author not found — run seed:foundation first. Continuing without author.')

  for (const post of POSTS) {
    const existing = await findBySlug(token, 'posts', post.slug)
    if (existing) {
      console.log(`  · posts/${post.slug} exists — skip`)
      continue
    }
    const body = { ...post, status: 'published', publishedDate: TODAY }
    if (authorId) body.author = authorId
    const res = await fetch(`${SITE_URL}/api/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`posts/${post.slug}: ${res.status} ${await res.text()}`)
    console.log(`  + posts/${post.slug}`)
  }

  console.log('[seed-posts] done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
