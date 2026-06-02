/**
 * Phản hồi tiêu biểu — anonymized, illustrative client-pattern quotes, reframed
 * around the "Authority Gap" angle: people who almost relied on a free online/AI
 * answer, then got real advice. No real individuals named (initials + district).
 */
export type Testimonial = {
  quote: string
  author: string
  context: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Tôi tra Google rồi tưởng mình hết thời hiệu khởi kiện. Gọi luật sư mới biết trường hợp của tôi tính mốc khác — vẫn còn quyền. Suýt nữa thì tôi bỏ cuộc oan.',
    author: 'Chị H.',
    context: 'Tranh chấp đất đai · TP. Thủ Đức',
  },
  {
    quote:
      'Tôi hỏi ChatGPT về chia tài sản khi ly hôn, nó trả lời rất trơn tru nhưng dẫn điều luật tôi tìm mãi không thấy. Luật sư Apolo giải thích đúng luật hiện hành và đúng hoàn cảnh của tôi.',
    author: 'Anh T.',
    context: 'Hôn nhân & gia đình · Q. Bình Thạnh',
  },
  {
    quote:
      'Một câu trả lời chung trên mạng bảo tôi cứ kiện. Luật sư phân tích án phí, chứng cứ và thời gian theo đúng vụ của tôi, rồi tôi chọn thương lượng — tiết kiệm hơn hẳn.',
    author: 'Chị M.',
    context: 'Tranh chấp kinh doanh · Q.1',
  },
]
