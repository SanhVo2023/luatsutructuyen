#!/usr/bin/env node
/**
 * Seed the CMS-editable content that used to be hardcoded:
 *   - globals: homepage, process, authority-manifesto
 *   - collections: faqs, glossary-terms
 *
 * Ported verbatim from src/content/{process,why-lawyer,faqs,glossary}.ts and
 * the hero copy in src/app/(frontend)/page.tsx. Idempotent: globals are upserted
 * (POST /api/globals/{slug}); faqs/glossary-terms are created only if missing.
 *
 * Run AFTER seed:admin + a dev boot (push creates the faqs/glossary-terms tables
 * and the new globals). Mirrors scripts/seed-posts.mjs.
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

// ───────────────────────── HOMEPAGE (hero copy ported from page.tsx) ─────────
const HOTLINE = '0903.419.479'
const HOTLINE_TEL = `tel:${HOTLINE.replace(/[^\d+]/g, '')}`

const HOMEPAGE = {
  heroKicker: 'Tư vấn pháp lý có trách nhiệm',
  heroHeadline: 'Một câu trả lời miễn phí trên mạng có thể khiến bạn mất cả vụ kiện.',
  heroHighlight: 'mất cả vụ kiện',
  heroSubhead:
    'Tình huống của bạn có chi tiết riêng mà một bài viết hay một câu trả lời chung không thể thấy hết. Gọi luật sư thật để được tư vấn đúng trường hợp của mình.',
  heroCtaLabel: `Gọi ngay ${HOTLINE}`,
  heroCtaTel: HOTLINE_TEL,
  trustBadges: [
    { text: 'Buổi đầu miễn phí' },
    { text: 'Trích dẫn điều luật' },
    { text: 'Bảo mật tuyệt đối' },
  ],
  ticker: [
    { text: 'Hàng xóm lấn ranh đất' },
    { text: 'Vợ/chồng giấu tài sản khi ly hôn' },
    { text: 'Đối tác nợ tiền hàng kéo dài' },
    { text: 'Cổ đông nhỏ bị gạt khỏi công ty' },
    { text: 'Mua nhà giấy tay không sổ đỏ' },
    { text: 'Giành quyền nuôi con' },
    { text: 'Chủ đầu tư chậm bàn giao căn hộ' },
  ],
  featuredKicker: 'Câu chuyện trong tuần',
  featuredHeading: 'Tình huống được tìm đọc nhiều nhất',
  categoriesKicker: 'Chủ đề pháp lý',
  categoriesHeading: 'Tình huống của bạn thuộc nhóm nào?',
  ctaHeading: 'Câu trả lời miễn phí có thể khiến bạn trả giá đắt',
  ctaSubhead:
    'Internet và AI cho bạn câu chữ nghe giống luật. Nhưng câu chữ không phải lời tư vấn — và không ai chịu trách nhiệm nếu sai.',
}

// ───────────────────────── PROCESS (ported from src/content/process.ts) ──────
const PROCESS = {
  kicker: 'Cách hoạt động',
  title: 'Từ một câu chuyện đến hướng giải quyết rõ ràng',
  lead: 'Luật Sư Trực Tuyến không thay thế luật sư — nó giúp bạn hiểu vấn đề của mình trước, để khi cần tư vấn, bạn đặt đúng câu hỏi và tiết kiệm thời gian.',
  steps: [
    {
      title: 'Đọc tình huống giống bạn',
      body: 'Tìm câu chuyện pháp lý gần với hoàn cảnh của bạn nhất. Mỗi tình huống kể bằng ngôn ngữ thường ngày, kèm phân tích pháp luật và trích dẫn điều luật cụ thể.',
      icon: 'BookOpen',
    },
    {
      title: 'Hiểu luật & chuẩn bị giấy tờ',
      body: 'Nắm rõ quyền và nghĩa vụ của mình, các mốc thời hiệu quan trọng, và danh sách giấy tờ cần chuẩn bị trước khi làm việc với luật sư hay cơ quan chức năng.',
      icon: 'ClipboardCheck',
    },
    {
      title: 'Hỏi luật sư — phản hồi 30 phút',
      body: 'Gửi câu hỏi cụ thể của bạn. Luật sư Apolo Lawyers phản hồi trong vòng 30 phút. Buổi tư vấn ban đầu không tính phí và hoàn toàn bảo mật.',
      icon: 'MessagesSquare',
    },
  ],
}

// ───────────────────── AUTHORITY MANIFESTO (src/content/why-lawyer.ts) ───────
const AUTHORITY_MANIFESTO = {
  heroKicker: 'Vì sao cần luật sư thật',
  heroTitle: 'Một câu trả lời miễn phí không bằng một lời tư vấn có trách nhiệm',
  heroLead:
    'Internet và AI cho bạn những câu chữ nghe giống luật. Nhưng câu chữ không phải lời tư vấn. Khoảng cách giữa "nghe có vẻ đúng" và "đáng tin để hành động" chính là nơi nhiều người mất tiền, lỡ thời hiệu và đánh mất quyền lợi.',
  reasons: [
    {
      title: 'Không ai chịu trách nhiệm',
      body: 'Khi một câu trả lời trên mạng hay từ AI sai, không ai đứng ra chịu trách nhiệm — bạn gánh toàn bộ hậu quả. Luật sư có chứng chỉ hành nghề chịu trách nhiệm nghề nghiệp trước Đoàn Luật sư và trước bạn.',
      icon: 'ShieldAlert',
    },
    {
      title: 'Thông tin có thể đã lỗi thời',
      body: 'Pháp luật Việt Nam thay đổi liên tục — cải cách hành chính 2025, nhiều bộ luật được sửa đổi. Công cụ tìm kiếm và AI thường dẫn lại quy định đã hết hiệu lực. Luật sư làm việc với luật đang có hiệu lực hôm nay.',
      icon: 'Scale',
    },
    {
      title: 'Đúng "nói chung", sai với bạn',
      body: 'Pháp luật phụ thuộc vào tình tiết cụ thể: một ngày tháng, một tờ giấy, một mối quan hệ có thể đảo ngược kết quả. Câu trả lời chung trên mạng bỏ qua chính những chi tiết đó. Luật sư hỏi đúng câu để hiểu trường hợp của bạn.',
      icon: 'Target',
    },
    {
      title: 'Không được bảo mật',
      body: 'Gõ vấn đề của bạn vào một AI công khai hay nhóm Facebook không được pháp luật bảo vệ — thông tin có thể bị lưu lại, chụp màn hình, dùng ngược lại chống bạn. Trao đổi với luật sư được giữ bí mật theo nghĩa vụ nghề nghiệp.',
      icon: 'Lock',
    },
    {
      title: 'AI có thể bịa ra điều luật',
      body: 'Đã có nhiều trường hợp AI "bịa" ra điều luật, bản án không có thật một cách rất thuyết phục. Trong pháp lý, trích dẫn một quy định không tồn tại có thể khiến bạn mất uy tín — và mất cả vụ việc.',
      icon: 'FileWarning',
    },
    {
      title: 'Không thể đại diện cho bạn',
      body: 'AI không thể thương lượng, soạn một văn bản có giá trị ràng buộc, làm việc với UBND hay đại diện bạn tại tòa, và không chịu trách nhiệm về kết quả. Đó là một ô tìm kiếm, không phải người bảo vệ quyền lợi của bạn.',
      icon: 'Gavel',
    },
  ],
  onlineLabel: 'Câu trả lời trên mạng / AI',
  onlinePoints: [
    { text: 'Trả lời chung chung cho "trường hợp trung bình"' },
    { text: 'Không biết tình tiết, thời hiệu, giấy tờ của riêng bạn' },
    { text: 'Có thể dẫn quy định đã hết hiệu lực hoặc bịa đặt' },
    { text: 'Không chịu trách nhiệm nếu sai' },
  ],
  lawyerLabel: 'Luật sư Apolo',
  lawyerPoints: [
    { text: 'Hỏi đúng câu để hiểu chính xác trường hợp của bạn' },
    { text: 'Đối chiếu luật đang có hiệu lực, trích dẫn điều luật cụ thể' },
    { text: 'Tư vấn các bước hành động và thời hiệu cần lưu ý' },
    { text: 'Chịu trách nhiệm nghề nghiệp, bảo mật thông tin' },
  ],
}

// ───────────────────────── FAQS (src/content/faqs.ts) ────────────────────────
const FAQ_GROUPS = [
  {
    id: 'dich-vu',
    items: [
      {
        q: 'Luật Sư Trực Tuyến là gì?',
        a: 'Là thư viện các tình huống pháp lý có thật, kể bằng ngôn ngữ thường ngày. Mỗi bài giúp bạn hiểu vấn đề của mình, biết pháp luật quy định ra sao và các bước nên làm tiếp theo. Nội dung do Đội ngũ biên tập Apolo Lawyers biên soạn, đối chiếu pháp luật Việt Nam hiện hành.',
      },
      {
        q: 'Đọc tình huống có thay thế việc gặp luật sư không?',
        a: 'Không. Bài viết giúp bạn hiểu bối cảnh chung và chuẩn bị tốt hơn, nhưng mỗi vụ việc có chi tiết riêng. Khi cần giải pháp cho đúng trường hợp của mình, bạn nên hỏi luật sư để được tư vấn cụ thể.',
      },
      {
        q: 'Thông tin trên website có chính xác và cập nhật không?',
        a: 'Mỗi tình huống được biên soạn dựa trên các bộ luật và văn bản pháp luật Việt Nam đang có hiệu lực, kèm trích dẫn điều luật cụ thể. Tuy nhiên pháp luật có thể thay đổi; với vấn đề quan trọng, hãy xác nhận lại cùng luật sư.',
      },
    ],
  },
  {
    id: 'chi-phi',
    items: [
      {
        q: 'Hỏi luật sư có mất phí không?',
        a: 'Buổi trao đổi ban đầu để xác định vấn đề là miễn phí. Nếu vụ việc cần luật sư tham gia sâu hơn (soạn thảo văn bản, đại diện, tranh tụng…), chi phí sẽ được thông báo rõ ràng trước khi bạn quyết định.',
      },
      {
        q: 'Đọc các tình huống trên website có tính phí không?',
        a: 'Hoàn toàn miễn phí. Bạn có thể đọc tất cả tình huống, danh mục và mục Hỏi & Đáp mà không cần đăng ký.',
      },
    ],
  },
  {
    id: 'quy-trinh',
    items: [
      {
        q: 'Tôi gửi câu hỏi xong thì bao lâu được phản hồi?',
        a: 'Luật sư thường phản hồi trong vòng 30 phút trong giờ làm việc. Ngoài giờ, bạn sẽ nhận phản hồi vào đầu buổi làm việc kế tiếp.',
      },
      {
        q: 'Tôi cần chuẩn bị gì trước khi hỏi luật sư?',
        a: 'Hãy tóm tắt ngắn gọn sự việc theo trình tự thời gian và chuẩn bị các giấy tờ liên quan (hợp đồng, biên nhận, tin nhắn, sổ đỏ…). Nhiều tình huống trên website có mục “Cần chuẩn bị gì” liệt kê đúng những giấy tờ bạn nên có.',
      },
      {
        q: 'Tôi nên thương lượng hay khởi kiện?',
        a: 'Tùy giá trị tranh chấp, chứng cứ, thời hiệu và chi phí theo đuổi vụ việc. Mục “Có nên kiện không?” phân tích các yếu tố này; luật sư sẽ giúp bạn cân nhắc cho đúng trường hợp cụ thể.',
      },
    ],
  },
  {
    id: 'bao-mat',
    items: [
      {
        q: 'Thông tin tôi cung cấp có được giữ kín không?',
        a: 'Có. Mọi thông tin bạn chia sẻ được bảo mật theo nguyên tắc bảo mật nghề nghiệp của luật sư và chính sách bảo mật của chúng tôi.',
      },
      {
        q: 'Tôi có thể hỏi ẩn danh không?',
        a: 'Bạn có thể mô tả tình huống mà chưa cần nêu danh tính đầy đủ. Tuy nhiên, để tư vấn chính xác và hỗ trợ thủ tục, luật sư có thể cần thêm một số thông tin định danh ở bước sau.',
      },
    ],
  },
]

// ───────────────────────── GLOSSARY (src/content/glossary.ts) ────────────────
const GLOSSARY = [
  {
    term: 'Thời hiệu khởi kiện',
    slug: 'thoi-hieu-khoi-kien',
    definition:
      'Khoảng thời gian mà pháp luật cho phép bạn được quyền yêu cầu Tòa án giải quyết tranh chấp. Hết thời hiệu, bạn có thể mất quyền khởi kiện. Mỗi loại tranh chấp có thời hiệu khác nhau, vì vậy cần xác định sớm.',
    seeAlso: ['khoi-kien', 'tranh-chap-dan-su'],
  },
  {
    term: 'Khởi kiện',
    slug: 'khoi-kien',
    definition:
      'Việc một bên nộp đơn yêu cầu Tòa án bảo vệ quyền và lợi ích hợp pháp của mình khi cho rằng bị xâm phạm. Đơn khởi kiện kèm tài liệu, chứng cứ được nộp tại Tòa án có thẩm quyền.',
    seeAlso: ['don-khoi-kien', 'tham-quyen'],
  },
  {
    term: 'Đơn khởi kiện',
    slug: 'don-khoi-kien',
    definition:
      'Văn bản người khởi kiện gửi Tòa án, trình bày yêu cầu và lý do. Đơn phải có các nội dung bắt buộc như thông tin các bên, nội dung tranh chấp và yêu cầu cụ thể.',
    seeAlso: ['khoi-kien'],
  },
  {
    term: 'Hòa giải',
    slug: 'hoa-giai',
    definition:
      'Quá trình các bên tự thương lượng hoặc nhờ bên thứ ba trung gian giúp đạt thỏa thuận, tránh phải xét xử. Hòa giải thành thường nhanh và ít tốn kém hơn so với kiện tụng.',
    seeAlso: ['thuong-luong', 'khoi-kien'],
  },
  {
    term: 'Thương lượng',
    slug: 'thuong-luong',
    definition:
      'Việc các bên trực tiếp trao đổi để tìm tiếng nói chung mà không cần bên thứ ba. Đây thường là bước đầu tiên nên thử trước khi nghĩ đến khởi kiện.',
    seeAlso: ['hoa-giai'],
  },
  {
    term: 'Tranh chấp dân sự',
    slug: 'tranh-chap-dan-su',
    definition:
      'Mâu thuẫn về quyền và nghĩa vụ giữa các cá nhân, tổ chức trong quan hệ dân sự — như hợp đồng, vay mượn, bồi thường thiệt hại, quyền tài sản.',
    seeAlso: ['hop-dong', 'boi-thuong-thiet-hai'],
  },
  {
    term: 'Hợp đồng',
    slug: 'hop-dong',
    definition:
      'Sự thỏa thuận giữa các bên về việc xác lập, thay đổi hoặc chấm dứt quyền và nghĩa vụ. Hợp đồng có thể bằng văn bản, lời nói hoặc hành vi cụ thể, tùy loại giao dịch.',
    seeAlso: ['hop-dong-vo-hieu', 'tranh-chap-dan-su'],
  },
  {
    term: 'Hợp đồng vô hiệu',
    slug: 'hop-dong-vo-hieu',
    definition:
      'Hợp đồng không có giá trị pháp lý do vi phạm điều kiện luật định (ví dụ vi phạm điều cấm, giả tạo, do nhầm lẫn hoặc bị lừa dối). Khi vô hiệu, các bên thường phải hoàn trả cho nhau những gì đã nhận.',
    seeAlso: ['hop-dong'],
  },
  {
    term: 'Bồi thường thiệt hại',
    slug: 'boi-thuong-thiet-hai',
    definition:
      'Trách nhiệm bù đắp tổn thất mà một bên gây ra cho bên khác, bao gồm thiệt hại vật chất và trong một số trường hợp cả tinh thần. Người yêu cầu cần chứng minh thiệt hại thực tế.',
    seeAlso: ['tranh-chap-dan-su'],
  },
  {
    term: 'Quyền nuôi con',
    slug: 'quyen-nuoi-con',
    definition:
      'Quyền trực tiếp chăm sóc, nuôi dưỡng con sau khi cha mẹ ly hôn. Tòa án quyết định dựa trên lợi ích tốt nhất của con; con từ đủ 7 tuổi thường được hỏi nguyện vọng.',
    seeAlso: ['ly-hon', 'cap-duong'],
  },
  {
    term: 'Cấp dưỡng',
    slug: 'cap-duong',
    definition:
      'Nghĩa vụ đóng góp tài chính để nuôi con (hoặc người thân theo luật định) của bên không trực tiếp nuôi dưỡng. Mức cấp dưỡng do các bên thỏa thuận hoặc Tòa án quyết định.',
    seeAlso: ['quyen-nuoi-con', 'ly-hon'],
  },
  {
    term: 'Ly hôn',
    slug: 'ly-hon',
    definition:
      'Việc chấm dứt quan hệ hôn nhân theo bản án hoặc quyết định của Tòa án. Có thể là thuận tình (hai bên đồng ý) hoặc đơn phương (một bên yêu cầu).',
    seeAlso: ['quyen-nuoi-con', 'tai-san-chung'],
  },
  {
    term: 'Tài sản chung',
    slug: 'tai-san-chung',
    definition:
      'Tài sản do vợ chồng tạo lập trong thời kỳ hôn nhân. Khi ly hôn, tài sản chung về nguyên tắc được chia đôi nhưng có tính đến công sức đóng góp và hoàn cảnh mỗi bên.',
    seeAlso: ['ly-hon'],
  },
  {
    term: 'Sổ đỏ / Sổ hồng',
    slug: 'so-do-so-hong',
    definition:
      'Cách gọi quen thuộc của Giấy chứng nhận quyền sử dụng đất, quyền sở hữu nhà ở và tài sản gắn liền với đất — chứng thư pháp lý xác nhận quyền của người sử dụng đất, chủ sở hữu nhà.',
    seeAlso: ['tranh-chap-dat-dai'],
  },
  {
    term: 'Tranh chấp đất đai',
    slug: 'tranh-chap-dat-dai',
    definition:
      'Mâu thuẫn về quyền và nghĩa vụ của người sử dụng đất — như ranh giới, lối đi chung, chuyển nhượng, thừa kế đất. Nhiều trường hợp phải hòa giải tại UBND cấp xã trước khi khởi kiện.',
    seeAlso: ['so-do-so-hong', 'hoa-giai'],
  },
  {
    term: 'Thẩm quyền',
    slug: 'tham-quyen',
    definition:
      'Phạm vi quyền giải quyết vụ việc của một cơ quan (thường là Tòa án). Xác định đúng Tòa án có thẩm quyền theo loại việc và theo lãnh thổ giúp tránh việc nộp đơn sai nơi.',
    seeAlso: ['khoi-kien'],
  },
  {
    term: 'Án phí',
    slug: 'an-phi',
    definition:
      'Khoản tiền đương sự phải nộp khi Tòa án giải quyết vụ việc. Mức án phí phụ thuộc loại vụ việc và giá trị tranh chấp; đây là yếu tố quan trọng khi cân nhắc có nên kiện.',
    seeAlso: ['khoi-kien'],
  },
  {
    term: 'Chứng cứ',
    slug: 'chung-cu',
    definition:
      'Những gì có thật được dùng để chứng minh yêu cầu của mình là có căn cứ — tài liệu, hợp đồng, tin nhắn, hình ảnh, lời khai người làm chứng. Chứng cứ càng đầy đủ, vị thế của bạn càng vững.',
    seeAlso: ['khoi-kien', 'don-khoi-kien'],
  },
  {
    term: 'Vi bằng',
    slug: 'vi-bang',
    definition:
      'Văn bản do Thừa phát lại lập, ghi nhận sự kiện, hành vi có thật làm chứng cứ. Lưu ý: vi bằng không thay thế hợp đồng công chứng và không chứng nhận giao dịch chuyển nhượng nhà đất.',
    seeAlso: ['chung-cu'],
  },
  {
    term: 'Công chứng',
    slug: 'cong-chung',
    definition:
      'Việc tổ chức công chứng xác nhận tính xác thực, hợp pháp của hợp đồng, giao dịch. Nhiều giao dịch về nhà đất bắt buộc phải công chứng mới có hiệu lực.',
    seeAlso: ['hop-dong', 'so-do-so-hong'],
  },
]

// ───────────────────────────── REST helpers ─────────────────────────────────
async function login() {
  const res = await fetch(`${SITE_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  if (!res.ok) throw new Error(`Login failed: ${res.status} ${await res.text()}`)
  return (await res.json()).token
}

async function upsertGlobal(token, slug, data) {
  const res = await fetch(`${SITE_URL}/api/globals/${slug}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`globals/${slug}: ${res.status} ${await res.text()}`)
  console.log(`  ✓ globals/${slug}`)
}

async function findOne(token, collection, field, value) {
  const res = await fetch(
    `${SITE_URL}/api/${collection}?where[${field}][equals]=${encodeURIComponent(value)}&limit=1`,
    { headers: { Authorization: `JWT ${token}` } },
  )
  if (!res.ok) return null
  return (await res.json()).docs?.[0] ?? null
}

async function createIfMissing(token, collection, field, value, data, label) {
  const existing = await findOne(token, collection, field, value)
  if (existing) {
    console.log(`  · ${collection}/${label} exists — skip`)
    return
  }
  const res = await fetch(`${SITE_URL}/api/${collection}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`${collection}/${label}: ${res.status} ${await res.text()}`)
  console.log(`  + ${collection}/${label}`)
}

async function main() {
  console.log('[seed-cms] logging in…')
  const token = await login()

  console.log('[seed-cms] globals…')
  await upsertGlobal(token, 'homepage', HOMEPAGE)
  await upsertGlobal(token, 'process', PROCESS)
  await upsertGlobal(token, 'authority-manifesto', AUTHORITY_MANIFESTO)

  console.log('[seed-cms] faqs…')
  let faqOrder = 0
  for (const group of FAQ_GROUPS) {
    for (const item of group.items) {
      await createIfMissing(
        token,
        'faqs',
        'question',
        item.q,
        { question: item.q, answer: item.a, category: group.id, order: faqOrder },
        item.q.slice(0, 40),
      )
      faqOrder += 1
    }
  }

  console.log('[seed-cms] glossary-terms…')
  for (let i = 0; i < GLOSSARY.length; i += 1) {
    const t = GLOSSARY[i]
    await createIfMissing(
      token,
      'glossary-terms',
      'slug',
      t.slug,
      {
        term: t.term,
        slug: t.slug,
        definition: t.definition,
        seeAlso: (t.seeAlso ?? []).join(','),
        order: i,
      },
      t.slug,
    )
  }

  console.log('[seed-cms] done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
