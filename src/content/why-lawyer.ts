/**
 * "The Authority Gap" — why free online/AI legal answers can't replace a
 * qualified, accountable luật sư. Measured, evidence-based tone (not alarmist).
 * Drives the homepage section, the /vi-sao-luat-su manifesto, and CTA copy.
 */

export type Reason = {
  id: string
  title: string
  body: string
  icon: 'ShieldAlert' | 'Scale' | 'Target' | 'Lock' | 'FileWarning' | 'Gavel'
}

export const AUTHORITY_REASONS: Reason[] = [
  {
    id: 'trach-nhiem',
    title: 'Không ai chịu trách nhiệm',
    body: 'Khi một câu trả lời trên mạng hay từ AI sai, không ai đứng ra chịu trách nhiệm — bạn gánh toàn bộ hậu quả. Luật sư có chứng chỉ hành nghề chịu trách nhiệm nghề nghiệp trước Đoàn Luật sư và trước bạn.',
    icon: 'ShieldAlert',
  },
  {
    id: 'tham-quyen',
    title: 'Thông tin có thể đã lỗi thời',
    body: 'Pháp luật Việt Nam thay đổi liên tục — cải cách hành chính 2025, nhiều bộ luật được sửa đổi. Công cụ tìm kiếm và AI thường dẫn lại quy định đã hết hiệu lực. Luật sư làm việc với luật đang có hiệu lực hôm nay.',
    icon: 'Scale',
  },
  {
    id: 'boi-canh',
    title: 'Đúng "nói chung", sai với bạn',
    body: 'Pháp luật phụ thuộc vào tình tiết cụ thể: một ngày tháng, một tờ giấy, một mối quan hệ có thể đảo ngược kết quả. Câu trả lời chung trên mạng bỏ qua chính những chi tiết đó. Luật sư hỏi đúng câu để hiểu trường hợp của bạn.',
    icon: 'Target',
  },
  {
    id: 'bao-mat',
    title: 'Không được bảo mật',
    body: 'Gõ vấn đề của bạn vào một AI công khai hay nhóm Facebook không được pháp luật bảo vệ — thông tin có thể bị lưu lại, chụp màn hình, dùng ngược lại chống bạn. Trao đổi với luật sư được giữ bí mật theo nghĩa vụ nghề nghiệp.',
    icon: 'Lock',
  },
  {
    id: 'bia-dat',
    title: 'AI có thể bịa ra điều luật',
    body: 'Đã có nhiều trường hợp AI "bịa" ra điều luật, bản án không có thật một cách rất thuyết phục. Trong pháp lý, trích dẫn một quy định không tồn tại có thể khiến bạn mất uy tín — và mất cả vụ việc.',
    icon: 'FileWarning',
  },
  {
    id: 'dai-dien',
    title: 'Không thể đại diện cho bạn',
    body: 'AI không thể thương lượng, soạn một văn bản có giá trị ràng buộc, làm việc với UBND hay đại diện bạn tại tòa, và không chịu trách nhiệm về kết quả. Đó là một ô tìm kiếm, không phải người bảo vệ quyền lợi của bạn.',
    icon: 'Gavel',
  },
]

export const WHY_LAWYER_HERO = {
  kicker: 'Vì sao cần luật sư thật',
  title: 'Một câu trả lời miễn phí không bằng một lời tư vấn có trách nhiệm',
  lead: 'Internet và AI cho bạn những câu chữ nghe giống luật. Nhưng câu chữ không phải lời tư vấn. Khoảng cách giữa "nghe có vẻ đúng" và "đáng tin để hành động" chính là nơi nhiều người mất tiền, lỡ thời hiệu và đánh mất quyền lợi.',
}

export const ONLINE_VS_LAWYER = {
  kicker: 'Câu trả lời trên mạng vs luật sư thật',
  online: {
    label: 'Câu trả lời trên mạng / AI',
    points: [
      'Trả lời chung chung cho "trường hợp trung bình"',
      'Không biết tình tiết, thời hiệu, giấy tờ của riêng bạn',
      'Có thể dẫn quy định đã hết hiệu lực hoặc bịa đặt',
      'Không chịu trách nhiệm nếu sai',
    ],
  },
  lawyer: {
    label: 'Luật sư Apolo',
    points: [
      'Hỏi đúng câu để hiểu chính xác trường hợp của bạn',
      'Đối chiếu luật đang có hiệu lực, trích dẫn điều luật cụ thể',
      'Tư vấn các bước hành động và thời hiệu cần lưu ý',
      'Chịu trách nhiệm nghề nghiệp, bảo mật thông tin',
    ],
  },
}
