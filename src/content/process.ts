/**
 * "Cách hoạt động" — how a reader goes from a scenario to a lawyer.
 * Static editorial content (no DB). Used on the homepage and /quy-trinh.
 */
export type ProcessStep = {
  id: string
  title: string
  body: string
  icon: 'BookOpen' | 'ClipboardCheck' | 'MessagesSquare' | 'Scale'
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'doc',
    title: 'Đọc tình huống giống bạn',
    body: 'Tìm câu chuyện pháp lý gần với hoàn cảnh của bạn nhất. Mỗi tình huống kể bằng ngôn ngữ thường ngày, kèm phân tích pháp luật và trích dẫn điều luật cụ thể.',
    icon: 'BookOpen',
  },
  {
    id: 'chuanbi',
    title: 'Hiểu luật & chuẩn bị giấy tờ',
    body: 'Nắm rõ quyền và nghĩa vụ của mình, các mốc thời hiệu quan trọng, và danh sách giấy tờ cần chuẩn bị trước khi làm việc với luật sư hay cơ quan chức năng.',
    icon: 'ClipboardCheck',
  },
  {
    id: 'hoi',
    title: 'Hỏi luật sư — phản hồi 30 phút',
    body: 'Gửi câu hỏi cụ thể của bạn. Luật sư Apolo Lawyers phản hồi trong vòng 30 phút. Buổi tư vấn ban đầu không tính phí và hoàn toàn bảo mật.',
    icon: 'MessagesSquare',
  },
]

export const PROCESS_INTRO = {
  kicker: 'Cách hoạt động',
  title: 'Từ một câu chuyện đến hướng giải quyết rõ ràng',
  lead: 'Luật Sư Trực Tuyến không thay thế luật sư — nó giúp bạn hiểu vấn đề của mình trước, để khi cần tư vấn, bạn đặt đúng câu hỏi và tiết kiệm thời gian.',
}
