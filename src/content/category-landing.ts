/**
 * Per-category landing content for the /[categorySlug] hubs. Drives the
 * auto-tailored landing template (hero hook, value props, "worry" list, FAQ).
 * Keyed by category slug; `DEFAULT_LANDING` covers any unlisted category.
 * Static content (no DB). Hotline-first, measured tone, real citations where used.
 */

export type LandingIcon =
  | 'Scale'
  | 'Clock'
  | 'ShieldCheck'
  | 'Users'
  | 'Lock'
  | 'FileText'
  | 'Gavel'
  | 'Home'
  | 'Briefcase'
  | 'Banknote'
  | 'HeartHandshake'
  | 'ClipboardCheck'
  | 'AlertTriangle'
  | 'Search'

export type ValueProp = { icon: LandingIcon; title: string; body: string }
export type LandingFaq = { q: string; a: string }

export type CategoryLanding = {
  heroHook: string
  heroSub: string
  valueProps: ValueProp[]
  worriesTitle: string
  worries: string[]
  faqTitle: string
  faqs: LandingFaq[]
}

export const DEFAULT_LANDING: CategoryLanding = {
  heroHook: 'Tình huống pháp lý có thật — hướng giải quyết rõ ràng',
  heroSub:
    'Đọc câu chuyện gần với hoàn cảnh của bạn, hiểu pháp luật quy định ra sao, rồi gọi luật sư để được tư vấn đúng trường hợp của mình.',
  valueProps: [
    { icon: 'Scale', title: 'Đúng điều luật', body: 'Mỗi hướng giải quyết đều dẫn chiếu quy định pháp luật đang có hiệu lực.' },
    { icon: 'Clock', title: 'Đúng thời hiệu', body: 'Tránh mất quyền lợi vì để quá các mốc thời hạn luật định.' },
    { icon: 'ShieldCheck', title: 'Đúng trường hợp', body: 'Luật sư nghe chi tiết vụ việc của bạn — không phải lời khuyên chung chung.' },
  ],
  worriesTitle: 'Bạn đang gặp phải điều nào dưới đây?',
  worries: ['Không biết bắt đầu từ đâu', 'Sợ làm sai mất quyền lợi', 'Không rõ cần giấy tờ gì', 'Phân vân thương lượng hay khởi kiện'],
  faqTitle: 'Câu hỏi thường gặp',
  faqs: [
    { q: 'Đọc tình huống có thay thế gặp luật sư không?', a: 'Không. Bài viết giúp bạn hiểu bối cảnh chung; mỗi vụ việc có chi tiết riêng cần luật sư tư vấn cụ thể.' },
    { q: 'Hỏi luật sư có mất phí không?', a: 'Buổi trao đổi ban đầu để xác định vấn đề là miễn phí. Chi phí (nếu có) luôn được báo rõ trước khi bạn quyết định.' },
    { q: 'Thông tin có được bảo mật không?', a: 'Có. Mọi thông tin bạn chia sẻ được giữ kín theo nguyên tắc bảo mật nghề nghiệp của luật sư.' },
  ],
}

export const CATEGORY_LANDING: Record<string, CategoryLanding> = {
  'tinh-huong-dan-su': {
    heroHook: 'Tranh chấp dân sự? Đòi lại quyền lợi đúng cách.',
    heroSub:
      'Hợp đồng, vay nợ, bồi thường, hàng xóm — mỗi tình huống một hướng đi. Xem cách giải quyết và gọi luật sư khi vụ việc của bạn cần.',
    valueProps: [
      { icon: 'Scale', title: 'Dẫn chiếu điều luật', body: 'Mỗi phân tích bám sát Bộ luật Dân sự 2015 và văn bản đang có hiệu lực.' },
      { icon: 'Clock', title: 'Giữ đúng thời hiệu', body: 'Thời hiệu khởi kiện hợp đồng thường là 3 năm (Điều 429 BLDS 2015) — đừng để quá hạn.' },
      { icon: 'ShieldCheck', title: 'Chứng cứ vững', body: 'Luật sư giúp bạn thu thập tin nhắn, chuyển khoản, người làm chứng để bảo vệ quyền lợi.' },
    ],
    worriesTitle: 'Bạn đang lo điều nào dưới đây?',
    worries: [
      'Cho vay không giấy tờ, sợ mất trắng',
      'Bị bồi thường thiếu sau tai nạn',
      'Hàng xóm lấn chiếm, gây thiệt hại',
      'Mua hàng/dịch vụ bị lừa, shop chặn liên lạc',
    ],
    faqTitle: 'Hỏi nhanh về tranh chấp dân sự',
    faqs: [
      { q: 'Cho vay không có giấy tờ thì đòi được không?', a: 'Vẫn có thể, nếu bạn có bằng chứng khác như tin nhắn, sao kê chuyển khoản, người làm chứng. Luật sư sẽ giúp bạn đánh giá và củng cố chứng cứ.' },
      { q: 'Thời hiệu khởi kiện tranh chấp hợp đồng là bao lâu?', a: 'Thông thường 3 năm kể từ ngày quyền lợi bị xâm phạm (Điều 429 Bộ luật Dân sự 2015), nhưng có ngoại lệ — nên hỏi luật sư sớm để không mất quyền.' },
      { q: 'Nên thương lượng hay khởi kiện?', a: 'Tùy giá trị tranh chấp, chứng cứ và chi phí theo đuổi. Luật sư sẽ phân tích thẳng thắn cơ hội của bạn cho từng phương án.' },
    ],
  },

  'tinh-huong-ly-hon': {
    heroHook: 'Ly hôn? Bảo vệ con và tài sản của bạn.',
    heroSub:
      'Quyền nuôi con, chia tài sản, tài sản bị giấu — những quyết định ảnh hưởng cả đời. Hiểu rõ quyền của mình trước khi hành động.',
    valueProps: [
      { icon: 'HeartHandshake', title: 'Vì lợi ích của con', body: 'Quyền nuôi con được Tòa quyết theo lợi ích tốt nhất của con; con từ đủ 7 tuổi được hỏi nguyện vọng.' },
      { icon: 'Scale', title: 'Chia tài sản công bằng', body: 'Tài sản chung về nguyên tắc chia đôi, có tính công sức đóng góp (Luật HN&GĐ 2014).' },
      { icon: 'Lock', title: 'Kín đáo, tế nhị', body: 'Mọi trao đổi được giữ bí mật — bạn không phải kể chuyện riêng cho người ngoài.' },
    ],
    worriesTitle: 'Điều bạn đang lo lắng nhất?',
    worries: [
      'Sợ mất quyền nuôi con',
      'Chồng/vợ đang tẩu tán tài sản',
      'Bị bạo hành, muốn ly hôn nhanh và an toàn',
      'Nhà đứng tên bố mẹ chồng, có được chia?',
    ],
    faqTitle: 'Hỏi nhanh về ly hôn',
    faqs: [
      { q: 'Tôi có giành được quyền nuôi con không?', a: 'Tòa quyết định theo lợi ích tốt nhất của con (Điều 81 Luật HN&GĐ 2014), xét điều kiện chăm sóc của mỗi bên. Luật sư giúp bạn chuẩn bị chứng cứ về khả năng nuôi dưỡng.' },
      { q: 'Chồng/vợ giấu tài sản khi ly hôn thì sao?', a: 'Bạn có quyền yêu cầu Tòa xác minh và đưa tài sản bị che giấu vào khối tài sản chung để chia. Cần thu thập manh mối sớm.' },
      { q: 'Ly hôn đơn phương khi đối phương không đồng ý?', a: 'Vẫn được, nếu có căn cứ hôn nhân lâm vào tình trạng trầm trọng. Luật sư hướng dẫn hồ sơ và trình tự nộp đơn.' },
    ],
  },

  'tinh-huong-dat-dai': {
    heroHook: 'Tranh chấp đất đai? Giữ vững quyền sử dụng đất.',
    heroSub:
      'Ranh giới, sổ đỏ chồng lấn, mua đất giấy tay, thừa kế đất — thủ tục phức tạp và nhiều rủi ro. Đừng đi một mình.',
    valueProps: [
      { icon: 'Home', title: 'Bảo vệ thửa đất', body: 'Từ hòa giải tại UBND cấp xã đến khởi kiện — đúng trình tự để không mất đất.' },
      { icon: 'FileText', title: 'Hồ sơ chuẩn', body: 'Sổ đỏ, bản đồ địa chính, biên bản — luật sư giúp bạn chuẩn bị đúng và đủ.' },
      { icon: 'Scale', title: 'Theo Luật Đất đai 2024', body: 'Cập nhật quy định mới nhất về tranh chấp, đính chính và cấp giấy chứng nhận.' },
    ],
    worriesTitle: 'Tình huống đất đai của bạn?',
    worries: [
      'Sổ đỏ hàng xóm cấp chồng lấn lên đất nhà',
      'Mua đất giấy tay, người bán đòi lại',
      'Lối đi chung bị rào, không cho đi',
      'Đất cha mẹ cho miệng, anh em tranh chấp',
    ],
    faqTitle: 'Hỏi nhanh về đất đai',
    faqs: [
      { q: 'Tranh chấp đất có bắt buộc hòa giải trước không?', a: 'Có. Tranh chấp ai là người có quyền sử dụng đất phải hòa giải tại UBND cấp xã trước khi khởi kiện (Điều 235 Luật Đất đai 2024).' },
      { q: 'Mua đất giấy tay nhiều năm có đòi lại được không?', a: 'Pháp luật có cơ chế công nhận giao dịch đã thực hiện trên thực tế và bảo vệ người mua ngay tình. Cần đánh giá hồ sơ cụ thể.' },
      { q: 'Sổ đỏ cấp chồng lấn lên đất tôi thì làm gì?', a: 'Bạn có thể đề nghị đính chính, thậm chí khởi kiện hủy một phần Giấy chứng nhận. Luật sư giúp xác định đúng hướng và chứng cứ.' },
    ],
  },

  'tinh-huong-doanh-nghiep': {
    heroHook: 'Vướng mắc kinh doanh? Bảo vệ tiền và quyền lợi doanh nghiệp.',
    heroSub:
      'Thu hồi công nợ, tranh chấp hợp đồng, đối tác bội tín, nhân viên kiện — xử lý đúng luật để không mất tiền oan.',
    valueProps: [
      { icon: 'Banknote', title: 'Thu hồi công nợ', body: 'Từ thư đòi nợ, khởi kiện đến yêu cầu thi hành án — chọn đúng đường để lấy lại tiền.' },
      { icon: 'Briefcase', title: 'Hợp đồng chặt chẽ', body: 'Rà soát điều khoản, bằng chứng giao dịch và trách nhiệm các bên.' },
      { icon: 'ShieldCheck', title: 'Quản trị rủi ro', body: 'Bảo vệ bí mật kinh doanh, trách nhiệm người đại diện (Điều 12 Luật DN 2020).' },
    ],
    worriesTitle: 'Vấn đề doanh nghiệp của bạn?',
    worries: [
      'Đối tác nợ tiền hàng kéo dài không trả',
      'Nhân viên nghỉ việc mang theo khách hàng',
      'Hợp tác chung vốn, đối tác ôm tiền bỏ trốn',
      'Bị nhân viên kiện đòi quyền lợi',
    ],
    faqTitle: 'Hỏi nhanh về doanh nghiệp',
    faqs: [
      { q: 'Đối tác nợ tiền hàng mãi không trả thì làm gì?', a: 'Thu thập hợp đồng, công nợ, đối chiếu rồi gửi thư đòi nợ; không hiệu quả thì khởi kiện và yêu cầu thi hành án. Luật sư giúp chọn bước đi nhanh nhất.' },
      { q: 'Nhân viên lấy khách hàng, bí mật kinh doanh — xử lý sao?', a: 'Pháp luật cho phép bảo vệ bí mật kinh doanh; quan trọng là thu thập đúng chứng cứ và chọn đúng cơ sở pháp lý để khởi kiện.' },
      { q: 'Thời hiệu khởi kiện tranh chấp thương mại?', a: 'Thường là 3 năm (Điều 429 BLDS 2015 / quy định chuyên ngành). Hỏi luật sư sớm để không mất quyền đòi nợ.' },
    ],
  },

  'co-nen-kien-khong': {
    heroHook: 'Có nên kiện không? Cân nhắc trước khi quyết định.',
    heroSub:
      'Kiện tụng tốn thời gian và chi phí. Đánh giá thẳng thắn cơ hội thắng, án phí, thời hiệu — rồi gọi luật sư để chắc chắn hướng đi.',
    valueProps: [
      { icon: 'Scale', title: 'Đánh giá cơ hội', body: 'Cân chứng cứ, cơ sở pháp lý và khả năng thắng trước khi bạn bỏ công sức.' },
      { icon: 'Banknote', title: 'Tính đúng chi phí', body: 'Án phí, thời gian theo đuổi và khả năng thu hồi — để quyết định không hối tiếc.' },
      { icon: 'HeartHandshake', title: 'Cân nhắc thương lượng', body: 'Nhiều vụ việc giải quyết nhanh, ít tốn kém hơn qua thương lượng hoặc hòa giải.' },
    ],
    worriesTitle: 'Bạn đang phân vân điều gì?',
    worries: [
      'Số tiền tranh chấp nhỏ hơn án phí?',
      'Liệu có đủ chứng cứ để thắng?',
      'Theo kiện mất bao lâu?',
      'Thắng rồi có đòi được tiền không?',
    ],
    faqTitle: 'Hỏi nhanh: nên kiện hay không',
    faqs: [
      { q: 'Số tiền nhỏ có nên kiện không?', a: 'Cần so sánh giá trị tranh chấp với án phí và thời gian. Đôi khi thương lượng hoặc hòa giải là lựa chọn hợp lý hơn — luật sư sẽ phân tích cụ thể.' },
      { q: 'Thắng kiện rồi có chắc đòi được tiền?', a: 'Không phải lúc nào cũng dễ — còn phụ thuộc khả năng thi hành án của bên kia. Luật sư sẽ đánh giá ngay từ đầu để bạn không tốn công vô ích.' },
      { q: 'Theo một vụ kiện dân sự mất bao lâu?', a: 'Tùy tính chất vụ việc và cấp xét xử. Luật sư giúp bạn ước lượng thời gian và chuẩn bị tâm lý, hồ sơ phù hợp.' },
    ],
  },

  'can-chuan-bi-gi': {
    heroHook: 'Cần chuẩn bị gì? Hồ sơ vững là thắng một nửa.',
    heroSub:
      'Giấy tờ, chứng cứ, trình tự — chuẩn bị đúng ngay từ đầu giúp luật sư bảo vệ bạn tốt nhất và tiết kiệm thời gian.',
    valueProps: [
      { icon: 'ClipboardCheck', title: 'Danh mục giấy tờ', body: 'Mỗi loại tình huống có bộ hồ sơ riêng — biết trước cần gì để không thiếu sót.' },
      { icon: 'Search', title: 'Chứng cứ đúng cách', body: 'Tin nhắn, hợp đồng, hình ảnh, vi bằng — thu thập sao cho có giá trị pháp lý.' },
      { icon: 'FileText', title: 'Trình tự rõ ràng', body: 'Đi đúng các bước, đúng nơi nộp hồ sơ để tránh mất thời gian và bị trả lại.' },
    ],
    worriesTitle: 'Bạn cần chuẩn bị cho việc gì?',
    worries: [
      'Sắp làm việc với cơ quan chức năng',
      'Chuẩn bị khởi kiện ra Tòa',
      'Không biết giữ chứng cứ thế nào cho hợp lệ',
      'Cần lập vi bằng nhưng chưa rõ giá trị',
    ],
    faqTitle: 'Hỏi nhanh về chuẩn bị hồ sơ',
    faqs: [
      { q: 'Tin nhắn, ghi âm có được dùng làm chứng cứ không?', a: 'Có thể, nếu thu thập hợp pháp và xác thực được. Luật sư sẽ hướng dẫn cách lưu giữ để chứng cứ có giá trị trước Tòa.' },
      { q: 'Vi bằng có thay được hợp đồng công chứng không?', a: 'Không. Vi bằng ghi nhận sự kiện, hành vi có thật làm chứng cứ, nhưng không thay thế công chứng giao dịch nhà đất.' },
      { q: 'Tôi nên chuẩn bị gì trước khi gặp luật sư?', a: 'Tóm tắt sự việc theo trình tự thời gian và mang theo giấy tờ liên quan (hợp đồng, biên nhận, tin nhắn, sổ đỏ…). Như vậy buổi tư vấn sẽ nhanh và đúng trọng tâm.' },
    ],
  },
}

export function getCategoryLanding(slug: string): CategoryLanding {
  return CATEGORY_LANDING[slug] ?? DEFAULT_LANDING
}
