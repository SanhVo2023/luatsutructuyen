#!/usr/bin/env node
/**
 * Seed two static pages via the Payload REST API:
 *   - chinh-sach-bao-mat (Privacy Policy, VN)
 *   - dieu-khoan-su-dung (Terms of Use, VN)
 *
 * Idempotent: skips if slug already exists.
 * Body is markdown — same Phase 2+ convention as Scenarios.
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

const PRIVACY_MD = `## 1. Phạm vi áp dụng

Chính sách này áp dụng cho website **luatsutructuyen.net** do Công ty Luật Apolo Lawyers vận hành. Khi bạn truy cập, gửi câu hỏi qua biểu mẫu, hoặc liên hệ với chúng tôi, các quy định dưới đây mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.

## 2. Thông tin chúng tôi thu thập

- **Khi bạn gửi câu hỏi qua biểu mẫu**: họ tên, email, số điện thoại (nếu cung cấp), nội dung mô tả tình huống, loại vấn đề pháp lý.
- **Khi bạn truy cập website**: thông tin kỹ thuật cơ bản (loại trình duyệt, thiết bị, địa chỉ IP rút gọn) thông qua các công cụ phân tích như Google Analytics, ở mức ẩn danh.

Chúng tôi **không** thu thập thông tin nhạy cảm như số căn cước, số tài khoản ngân hàng, hoặc dữ liệu sinh trắc học qua website. Nếu cần các thông tin này cho việc cung cấp dịch vụ pháp lý cụ thể, sẽ có thỏa thuận riêng giữa bạn và luật sư phụ trách.

## 3. Mục đích sử dụng

Thông tin của bạn được sử dụng để:

- Phản hồi câu hỏi pháp lý bạn gửi cho chúng tôi.
- Liên hệ qua email hoặc điện thoại nếu cần trao đổi thêm về tình huống của bạn.
- Cải thiện chất lượng nội dung và trải nghiệm trên website (qua thống kê ẩn danh).

Chúng tôi **không**:

- Bán hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba.
- Sử dụng thông tin bạn cung cấp cho mục đích quảng cáo của bên thứ ba.

## 4. Lưu trữ và bảo mật

Thông tin được lưu trữ trên hệ thống cơ sở dữ liệu được mã hóa, đặt tại trung tâm dữ liệu Singapore (Supabase). Chỉ luật sư và nhân viên được ủy quyền của Apolo Lawyers mới có quyền truy cập để xử lý câu hỏi của bạn.

Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức hợp lý để bảo vệ thông tin khỏi truy cập trái phép, mất mát, hoặc tiết lộ.

## 5. Quyền của bạn

Bạn có quyền:

- Yêu cầu xem thông tin của bạn mà chúng tôi đang lưu trữ.
- Yêu cầu chỉnh sửa hoặc xóa thông tin của bạn.
- Rút lại sự đồng ý cho việc xử lý dữ liệu (lưu ý: việc này có thể ảnh hưởng đến khả năng chúng tôi phản hồi câu hỏi của bạn).

Để thực hiện các quyền này, vui lòng [liên hệ với chúng tôi](/lien-he) hoặc gửi email đến **contact@apolo.com.vn**.

## 6. Cookie

Website sử dụng cookie kỹ thuật cần thiết cho hoạt động cơ bản và cookie phân tích ẩn danh. Bạn có thể tắt cookie phân tích trong cài đặt trình duyệt mà không ảnh hưởng đến trải nghiệm cơ bản.

## 7. Cập nhật chính sách

Chính sách này có thể được cập nhật khi quy định pháp luật thay đổi hoặc khi chúng tôi điều chỉnh cách thức xử lý dữ liệu. Bản cập nhật sẽ được công bố tại trang này kèm theo ngày cập nhật.

## 8. Liên hệ

Nếu bạn có câu hỏi về chính sách bảo mật này, vui lòng [liên hệ](/lien-he) hoặc gọi tổng đài tư vấn pháp luật **0903.419.479**.

*Cập nhật lần cuối: 2026-05-18*
`

const TERMS_MD = `## 1. Chấp nhận điều khoản

Bằng việc truy cập và sử dụng website **luatsutructuyen.net** (sau đây gọi là "Website"), bạn đồng ý tuân thủ các điều khoản và điều kiện dưới đây. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng Website.

## 2. Bản chất nội dung

Tất cả nội dung trên Website — bao gồm các bài viết về tình huống pháp lý, phân tích, hướng dẫn, và tài liệu tham khảo — được cung cấp **chỉ với mục đích thông tin chung**. Nội dung không cấu thành tư vấn pháp lý chính thức cho trường hợp cụ thể của bạn.

Việc đọc nội dung trên Website **không tạo ra quan hệ luật sư - khách hàng** giữa bạn và Công ty Luật Apolo Lawyers. Quan hệ luật sư - khách hàng chỉ phát sinh sau khi có thỏa thuận dịch vụ bằng văn bản.

## 3. Sử dụng thông tin

Bạn có thể:

- Đọc và sử dụng nội dung cho mục đích cá nhân, phi thương mại.
- Chia sẻ liên kết đến các bài viết.
- Trích dẫn ngắn (≤200 từ) kèm ghi nguồn rõ ràng.

Bạn **không được**:

- Sao chép toàn bộ bài viết để đăng tải trên website hoặc ấn phẩm khác mà không có sự đồng ý bằng văn bản từ Apolo Lawyers.
- Sử dụng nội dung cho mục đích thương mại (bao gồm khóa học trả phí, sách, tài liệu bán cho khách hàng).
- Chỉnh sửa, biến tấu nội dung và phát hành lại dưới danh nghĩa cá nhân hoặc tổ chức khác.

## 4. Trách nhiệm khi sử dụng

- Nội dung trên Website được biên soạn dựa trên pháp luật Việt Nam hiện hành tại thời điểm xuất bản. Pháp luật có thể thay đổi; bạn có trách nhiệm xác minh tính cập nhật trước khi áp dụng.
- Không quyết định pháp lý quan trọng (khởi kiện, ký hợp đồng lớn, mua bán bất động sản) chỉ dựa trên nội dung Website. Hãy tham vấn luật sư cho trường hợp cụ thể.
- Apolo Lawyers không chịu trách nhiệm cho bất kỳ thiệt hại nào phát sinh do bạn áp dụng thông tin trên Website mà không có sự tư vấn riêng cho hoàn cảnh của mình.

## 5. Liên kết bên ngoài

Website có thể chứa liên kết đến các nguồn pháp luật chính thức (ví dụ: trang của Quốc hội, Chính phủ, Bộ Tư pháp). Chúng tôi không kiểm soát và không chịu trách nhiệm cho nội dung tại các trang ngoài này.

## 6. Sở hữu trí tuệ

Toàn bộ nội dung, thiết kế, logo, hình ảnh trên Website thuộc sở hữu của Công ty Luật Apolo Lawyers hoặc các bên cấp quyền hợp pháp. Việc sao chép, sao chụp hoặc sử dụng các tài sản này mà không có sự cho phép là vi phạm quyền sở hữu trí tuệ.

## 7. Sửa đổi điều khoản

Apolo Lawyers có quyền sửa đổi các điều khoản này bất kỳ lúc nào. Phiên bản cập nhật có hiệu lực ngay khi được đăng tải tại trang này. Việc bạn tiếp tục sử dụng Website sau khi có thay đổi đồng nghĩa với việc chấp nhận điều khoản mới.

## 8. Luật áp dụng và giải quyết tranh chấp

Các điều khoản này được điều chỉnh theo pháp luật Cộng hòa Xã hội Chủ nghĩa Việt Nam. Mọi tranh chấp phát sinh sẽ được ưu tiên giải quyết bằng thương lượng, hoặc đưa ra Tòa án có thẩm quyền tại TP. Hồ Chí Minh.

## 9. Liên hệ

Nếu bạn có câu hỏi về các điều khoản này, vui lòng [liên hệ với chúng tôi](/lien-he) hoặc gọi **0903.419.479**.

*Cập nhật lần cuối: 2026-05-18*
`

const PAGES = [
  {
    title: 'Chính sách bảo mật',
    slug: 'chinh-sach-bao-mat',
    content: PRIVACY_MD,
    status: 'published',
  },
  {
    title: 'Điều khoản sử dụng',
    slug: 'dieu-khoan-su-dung',
    content: TERMS_MD,
    status: 'published',
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

async function findBySlug(token, slug) {
  const res = await fetch(
    `${SITE_URL}/api/pages?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`,
    { headers: { Authorization: `JWT ${token}` } },
  )
  if (!res.ok) return null
  return (await res.json()).docs?.[0] ?? null
}

async function ensure(token, record) {
  const existing = await findBySlug(token, record.slug)
  if (existing) {
    console.log(`  · pages/${record.slug} exists — skip`)
    return existing.id
  }
  const res = await fetch(`${SITE_URL}/api/pages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify(record),
  })
  if (!res.ok) throw new Error(`pages/${record.slug}: ${res.status} ${await res.text()}`)
  const data = await res.json()
  console.log(`  + pages/${record.slug}`)
  return data.doc?.id ?? data.id
}

async function main() {
  console.log('[seed-static-pages] logging in…')
  const token = await login()
  for (const p of PAGES) await ensure(token, p)
  console.log('[seed-static-pages] done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
