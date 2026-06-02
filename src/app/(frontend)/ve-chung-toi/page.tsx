import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, Scale, BookOpen, Users } from 'lucide-react'
import { APOLO, parentBrandUrl } from '@/config/apolo'
import { breadcrumbJsonLd } from '@/components/ui/Breadcrumb'
import { JsonLd } from '@/components/ui/JsonLd'
import { CtaBlock } from '@/components/ui/CtaBlock'
import { PageHero } from '@/components/ui/PageHero'
import { PageContent } from '@/components/ui/PageContent'
import { AuthorityBlock } from '@/components/ui/AuthorityBlock'
import ScrollReveal from '@/components/animations/ScrollReveal'
import { getPageBySlug } from '@/lib/queries'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

// Render on demand (not at build) so static export doesn't exhaust the shared
// Supabase Session Pooler (15-conn cap). Data is memoized via unstable_cache.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Về chúng tôi — Đội ngũ biên tập Apolo Lawyers',
  description:
    'Luật Sư Trực Tuyến do Công ty Luật Apolo Lawyers vận hành. Nội dung biên soạn bởi đội ngũ luật sư có kinh nghiệm tại Đoàn Luật sư TP. Hồ Chí Minh.',
  alternates: { canonical: '/ve-chung-toi' },
}

export default async function AboutPage() {
  const vn = APOLO.vn
  const crumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Về chúng tôi', href: '/ve-chung-toi' },
  ]

  // CMS-first: if a published ve-chung-toi Page with markdown content exists,
  // render that. Otherwise fall back to the hardcoded editorial body below.
  const page = await getPageBySlug('ve-chung-toi')
  const cmsBody = page && page.status === 'published' ? page.content?.trim() : ''

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs, SITE_URL)} />

      <PageHero
        crumbs={crumbs}
        kicker="Về chúng tôi"
        title="Đứng sau mỗi tình huống là đội ngũ luật sư Apolo"
        lead="“Pháp luật là công cụ giải quyết vấn đề, không phải rào cản khiến vấn đề trở nên phức tạp hơn.”"
      />

      {cmsBody ? (
        <PageContent body={cmsBody} />
      ) : (
        <section className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <h2>Luật Sư Trực Tuyến là gì</h2>
          <p>
            <strong>luatsutructuyen.net</strong> là một dự án nội dung pháp lý do{' '}
            <a href={parentBrandUrl('vi')} target="_blank" rel="noopener noreferrer">
              {vn.shortName}
            </a>{' '}
            vận hành. Thay vì trình bày các bộ luật khô khan, chúng tôi kể lại những tình huống pháp
            lý thường gặp trong đời sống người Việt — kèm phân tích pháp lý ngắn gọn và các bước
            hành động cụ thể.
          </p>

          <h2>Nguyên tắc biên soạn</h2>
          <ul>
            <li>
              <strong>Mỗi tình huống đều có cơ sở pháp lý.</strong> Các bài viết trích dẫn cụ thể
              điều luật, nghị định, hoặc án lệ liên quan — không nói chung chung.
            </li>
            <li>
              <strong>Ngôn ngữ thường ngày.</strong> Chúng tôi viết để người không học luật cũng
              hiểu được, không dùng thuật ngữ học thuật khi không cần thiết.
            </li>
            <li>
              <strong>Trung thực về độ phức tạp.</strong> Khi tình huống thực sự cần luật sư trực
              tiếp, chúng tôi nói rõ. Không hứa hẹn giải pháp ngay tức thì cho vấn đề phức tạp.
            </li>
            <li>
              <strong>Cập nhật theo pháp luật hiện hành.</strong> Sau cải cách hành chính 2025 và
              các sửa đổi luật mới, chúng tôi rà soát lại nội dung định kỳ.
            </li>
          </ul>

          <h2>Đội ngũ biên tập</h2>
          <p>
            Tất cả nội dung được biên soạn bởi <strong>Đội ngũ Biên tập Apolo</strong> — gồm các
            luật sư thuộc {vn.glossary.barAssociation} TP. Hồ Chí Minh, trực thuộc{' '}
            {vn.glossary.barFederation}. Bài viết được rà soát kỹ về mặt pháp lý trước khi xuất bản.
          </p>

          <h2>Khi nào nên đọc luatsutructuyen.net</h2>
          <ul>
            <li>Bạn đang gặp một tình huống pháp lý cụ thể và muốn hiểu xem nó nghiêm trọng đến đâu</li>
            <li>Bạn muốn biết các bước hành động khả thi trước khi tìm luật sư</li>
            <li>Bạn cần một bản hướng dẫn ngắn về tài liệu, chứng cứ cần chuẩn bị</li>
          </ul>
          <p>
            Nếu bạn cần tư vấn cụ thể cho trường hợp của mình, hãy{' '}
            <Link href="/lien-he">gửi câu hỏi cho luật sư của chúng tôi</Link> — bước tư vấn ban đầu
            không tính phí.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Pillar Icon={Scale} title="20+ năm" body="kinh nghiệm hành nghề" />
          <Pillar Icon={Users} title="Đa lĩnh vực" body="dân sự, hình sự, doanh nghiệp" />
          <Pillar Icon={BookOpen} title="Cập nhật" body="theo luật hiện hành" />
          <Pillar Icon={ShieldCheck} title="Bảo mật" body="thông tin khách hàng" />
        </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6 lg:px-8">
        <ScrollReveal>
          <AuthorityBlock />
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6 md:pb-28 lg:px-8">
        <CtaBlock
          placement="page"
          headline="Có vấn đề pháp lý cần giải quyết?"
          subtext="Gửi câu hỏi miễn phí — luật sư phản hồi trong 30 phút giờ hành chính."
        />
      </section>
    </>
  )
}

function Pillar({
  Icon,
  title,
  body,
}: {
  Icon: React.FC<{ className?: string; strokeWidth?: number }>
  title: string
  body: string
}) {
  return (
    <div className="rounded-lg border border-[color:var(--color-hairline)] bg-[color:var(--color-surface-strong)] p-5 text-center">
      <Icon className="mx-auto h-7 w-7 text-[color:var(--color-primary)]" strokeWidth={1.5} />
      <p className="mt-3 font-display font-semibold text-[color:var(--color-ink)]">{title}</p>
      <p className="mt-1 text-xs text-[color:var(--color-text-secondary)]">{body}</p>
    </div>
  )
}
