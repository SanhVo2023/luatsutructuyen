/**
 * FAQ content for /hoi-dap (and the homepage teaser).
 * Static editorial content (no DB). Drives both the Accordion UI and FAQPage
 * JSON-LD. Keep answers concise, accurate, and funnel-aware.
 */
export type FaqItem = { q: string; a: string }
export type FaqGroup = { id: string; title: string; items: FaqItem[] }

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: 'dich-vu',
    title: 'Về Luật Sư Trực Tuyến',
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
    title: 'Về chi phí',
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
    title: 'Về quy trình',
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
    title: 'Về bảo mật',
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

/** Flattened list for FAQPage JSON-LD and the homepage teaser. */
export const ALL_FAQS: FaqItem[] = FAQ_GROUPS.flatMap((g) => g.items)
