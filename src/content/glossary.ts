/**
 * Thuật ngữ pháp lý — Vietnamese legal-terms glossary for /thuat-ngu.
 * Static content (no DB). Drives the A–Z page + DefinedTermSet JSON-LD.
 * Plain-language definitions aimed at non-lawyers.
 */
export type GlossaryTerm = {
  term: string
  slug: string
  definition: string
  seeAlso?: string[] // slugs
}

export const GLOSSARY: GlossaryTerm[] = [
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
