import { useParams } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Cardiology1 from "../../assets/home/cardiology1.jpg";
import Orthopedic1 from "../../assets/home/orthopedic1.jpg";
import Internal1 from "../../assets/home/internal1.jpg";
import Dental1 from "../../assets/home/dental1.jpg";
import Eyes1 from "../../assets/home/eyes1.jpg";
import Lab1 from "../../assets/home/lab1.jpg";
import Ents1 from "../../assets/home/ents1.jpg";
import Neuron1 from "../../assets/home/neuron1.jpg";
import Footer from "../ForPages/Footer";

const SpecialtyDetail = () => {
  const { specialtyId } = useParams();

  const specialties = [
    {
      id: "tim-mach",
      name: "Tim mạch",
      info: "Khoa Tim mạch, không chỉ là một ngọn hải đăng sáng chói trong lĩnh vực Y học lâm sàng, mà còn là một tấm bức bình phong vững chắc bảo vệ sức khỏe và nâng tầm cuộc sống cho hàng triệu con người trên toàn cầu. Sở hữu kiến thức chuyên môn sâu rộng về cấu trúc và hoạt động của hệ thống tuần hoàn, các bác sĩ chuyên khoa Tim mạch không chỉ là những chiến lược gia tài ba trong việc xây dựng các phác đồ điều trị cho các bệnh lý tim mạch phức tạp, mà còn là những người bạn đồng hành không thể thiếu trong việc tư vấn và giáo dục cộng đồng về việc bảo vệ và duy trì sức khỏe tim mạch.\n Khi đối mặt với các vấn đề liên quan đến tim mạch như bệnh tim đau, suy tim, nhồi máu cơ tim và các biến chứng của bệnh tiểu đường, sự can thiệp của các chuyên gia Tim mạch trở nên cực kỳ quan trọng. Thông qua việc áp dụng các phương pháp tiên tiến như phẫu thuật tim mạch, điều trị bằng thuốc và các phương pháp can thiệp như cấy ghép, họ không chỉ giúp bệnh nhân duy trì hoạt động chức năng của tim mạch mà còn đem lại sự cải thiện đáng kể về chất lượng cuộc sống.",
      img: Cardiology1,
      sign: {
        header: "Dấu hiệu nhận biết",
        sub: {
          sub1: "Bệnh tim mạch là một trong những vấn đề sức khỏe nghiêm trọng phổ biến trên toàn thế giới. Dấu hiệu của bệnh tim mạch thường bao gồm:",
          sub2: "Nguyên nhân gây ra bệnh tim mạch thường liên quan đến:",
        },
      },
      why: {
        header: "Lợi ích khi đến khám",
        sub: "Điều trị bệnh tim mạch đòi hỏi sự chăm sóc và giám sát của các chuyên gia y tế. Dưới đây là các lợi ích đi kèm khi khám:",
      },
      technique: {
        header: "Công nghệ và phương pháp điều trị",
        sub: "Công nghệ y tế ngày càng tiên tiến, cung cấp các phương pháp chẩn đoán chính xác và không xâm lấn. Các kỹ thuật và công nghệ thông thường được sử dụng bao gồm:",
      },
      item: {
        item1: [
          "Đau hoặc cảm giác nặng nhức ở ngực, có thể lan ra cánh tay, lưng, cổ hoặc dưới cẳng chân.",
          "Khó thở, đặc biệt khi hoạt động.",
          "Mệt mỏi không lý do, cảm giác mệt mỏi ngay cả khi không làm việc nặng.",
          "Nhịp tim không đều, nhịp tim nhanh hoặc chậm.",
          "Chóng mặt hoặc hoa mắt.",
        ],
        item2: [
          "Xơ cứng động mạch: Gây ra bởi sự tích tụ các mảng bám dày đặc trên thành động mạch, hạn chế lưu thông máu.",
          "Tắc nghẽn động mạch: Do các cục máu, chất béo và các chất khác tạo thành gốc dẫn đến sự cản trở lưu thông máu.",
        ],
        item3: [
          "Để được chẩn đoán và xác định tình trạng sức khỏe của bạn.",
          "Nhận được hướng dẫn về các biện pháp tự chăm sóc và điều trị.",
          "Được tư vấn về lối sống và thói quen ăn uống lành mạnh để hạn chế các yếu tố nguy cơ.",
          "Bắt đầu điều trị kịp thời để ngăn ngừa các biến chứng nguy hiểm.",
        ],
        item4: [
          "Điện tâm đồ (ECG): Đo và ghi lại hoạt động điện của tim.",
          "Xét nghiệm máu: Đo lường các chỉ số liên quan đến tim mạch như cholesterol, triglyceride, và enzyme tim mạch.",
          "X-quang tim phổi: Tạo hình ảnh của tim và phổi để phát hiện các vấn đề như tắc nghẽn động mạch hoặc khối u.",
          "Echocardiogram: Sử dụng sóng siêu âm để tạo hình ảnh chính xác về cấu trúc và hoạt động của tim.",
        ],
      },
      summary:
        "Tóm lại, việc nhận biết và chẩn đoán bệnh tim mạch là cực kỳ quan trọng để bắt đầu điều trị kịp thời và ngăn ngừa các biến chứng nguy hiểm. Sử dụng các kỹ thuật và công nghệ tiên tiến trong y tế giúp cung cấp các thông tin chính xác và hình ảnh rõ ràng về tình trạng tim mạch, từ đó giúp bác sĩ và bệnh nhân có thể hợp tác để quản lý và điều trị bệnh hiệu quả.",
    },
    {
      id: "co-xuong-khop",
      name: "Cơ - Xương - Khớp",
      info: "Chuyên khoa Cơ-Xương-Khớp chỉnh hình không chỉ là một ngành quan trọng mà còn là trụ cột của lĩnh vực Y học lâm sàng, nắm giữ vai trò không thể phủ nhận trong việc chăm sóc sức khỏe và chất lượng cuộc sống của hàng triệu người trên khắp thế giới. Với sự chuyên môn về cấu trúc và chức năng của cơ bắp, xương và khớp, các bác sĩ chuyên khoa trong lĩnh vực này không chỉ đảm nhận vai trò quan trọng trong việc khám, chẩn đoán và điều trị các vấn đề về cơ-xương-khớp mà còn đóng góp tích cực vào việc tư vấn và giáo dục cộng đồng về việc duy trì sức khỏe và phòng tránh bệnh tật.\n Khi các vấn đề liên quan đến cơ-xương-khớp phát sinh, những bệnh lý như viêm khớp, thoái hóa xương khớp, chấn thương do thể thao hoặc tai nạn giao thông, hay các tình trạng di truyền, sự can thiệp của các chuyên gia trở nên cực kỳ quan trọng. Bằng việc áp dụng các phương pháp tiên tiến như phẫu thuật chỉnh hình, điều trị bằng thuốc, vật lý trị liệu và tư vấn dinh dưỡng, họ giúp bệnh nhân khôi phục chức năng và cải thiện chất lượng cuộc sống.",
      img: Orthopedic1,
      sign: {
        header: "Dấu hiệu nhận biết",
        sub: {
          sub1: "Các vấn đề cơ - xương - khớp có thể được nhận biết qua các dấu hiệu như:",
          sub2: "Nguyên nhân gây ra các vấn đề cơ - xương - khớp thường bao gồm:",
        },
      },
      why: {
        header: "Lợi ích khi đến khám",
        sub: "Việc thăm bác sĩ chuyên khoa Cơ - Xương - Khớp là quan trọng để chẩn đoán đúng và bắt đầu điều trị kịp thời. Dưới đây là một số lý do bạn nên đi khám:",
      },
      technique: {
        header: "Công nghệ và phương pháp điều trị",
        sub: "Chuyên khoa Cơ - Xương - Khớp sử dụng các công nghệ và kỹ thuật tiên tiến để chẩn đoán và điều trị hiệu quả. Một số kỹ thuật thông thường bao gồm:",
      },
      item: {
        item1: [
          "Đau hoặc cảm giác khó chịu ở xương, khớp hoặc cơ bắp.",
          "Sưng, đỏ, nóng lên hoặc cảm giác căng thẳng ở vùng bị tổn thương.",
          "Giảm khả năng di chuyển hoặc linh hoạt.",
          "Gập người, không thể đứng thẳng hoặc di chuyển một cách tự nhiên.",
          "Gây ra bởi chấn thương, viêm nhiễm, hoặc các vấn đề cơ học khác.",
        ],
        item2: [
          "Chấn thương vùng cơ - xương - khớp: Có thể do tai nạn, thể thao, hoặc hoạt động hàng ngày.",
          "Viêm khớp: Bao gồm các bệnh như viêm khớp dạng thấp, viêm khớp dạng thấp, và viêm khớp dạng giảm mô.",
          "Xơ cứng cột sống: Gây ra sự cứng đơ và giảm linh hoạt trong các khớp cột sống.",
        ],
        item3: [
          "Chẩn đoán chính xác vấn đề cơ - xương - khớp của bạn.",
          "Nhận được phác đồ điều trị cá nhân hóa và hướng dẫn về phục hồi.",
          "Học cách phòng tránh chấn thương và bảo vệ sức khỏe cơ - xương - khớp của bạn.",
          "Bắt đầu điều trị kịp thời để ngăn ngừa các biến chứng và cải thiện chất lượng cuộc sống.",
        ],
        item4: [
          "X-ray: Tạo hình ảnh của xương và khớp để chẩn đoán gãy, nứt, hoặc các vấn đề khác.",
          "MRI (Magnetic Resonance Imaging): Tạo hình ảnh chi tiết của cơ - xương - khớp, bao gồm cả mô mềm và mô cứng.",
          "CT scan: Tạo hình ảnh lớp sụn và xương để chẩn đoán chính xác các vấn đề liên quan đến cột sống.",
          "Chẩn đoán cụ thể khác: Bao gồm xét nghiệm máu, kiểm tra chức năng cơ - xương - khớp, và tiêm chẩn đoán.",
        ],
      },
      summary:
        "Tóm lại, việc chăm sóc và điều trị các vấn đề cơ - xương - khớp đóng vai trò quan trọng trong việc cải thiện chất lượng cuộc sống và sự linh hoạt của bệnh nhân. Đến các chuyên gia chăm sóc cơ - xương - khớp để nhận được chẩn đoán chính xác và phác đồ điều trị cá nhân hóa là bước quan trọng đầu tiên trong quá trình phục hồi và phòng ngừa biến chứng.",
    },
    {
      id: "noi-tong-hop",
      name: "Nội tổng hợp",
      info: "Nội khoa là một chuyên ngành y tế rộng lớn, tập trung vào việc ngăn ngừa, chẩn đoán và điều trị các bệnh lý ảnh hưởng đến các cơ quan nội tạng và hệ thống chức năng trong cơ thể con người, đặc biệt ở người trưởng thành. Các bác sĩ Nội khoa được đào tạo chuyên sâu để trở thành những chuyên gia sở hữu kiến thức uyên thâm về các bệnh lý phức tạp và khả năng điều trị toàn diện cho bệnh nhân.\n Chuyên khoa Nội Tổng hợp đóng vai trò quan trọng trong hệ thống Y học, tập trung vào việc chẩn đoán, điều trị và quản lý các bệnh lý tổng quát của cơ thể. Các chuyên gia Nội Tổng hợp chủ yếu tập trung vào việc khám và điều trị các bệnh không phẫu thuật, từ các vấn đề đơn giản như cảm lạnh đến các bệnh lý phức tạp như tiểu đường và bệnh tim mạch.",
      img: Internal1,
      sign: {
        header: "Dấu hiệu nhận biết",
        sub: {
          sub1: "Các triệu chứng chung thường gặp khi cần đến chuyên khoa Nội Tổng hợp bao gồm:",
          sub2: "Một số nguyên nhân phổ biến gây ra các bệnh lý mà chuyên khoa này thường phải đối mặt là:",
        },
      },
      why: {
        header: "Lợi ích khi đến khám",
        sub: "Điều trị tại chuyên khoa Nội Tổng hợp mang lại nhiều lợi ích như:",
      },
      technique: {
        header: "Công nghệ và phương pháp điều trị",
        sub: "Công nghệ y tế ngày nay đã phát triển mạnh mẽ, cung cấp các phương pháp chẩn đoán và điều trị hiện đại như:",
      },
      item: {
        item1: [
          "Sốt, đau nhức cơ thể, ho, và viêm họng.",
          "Tiểu đường, tăng huyết áp, và vấn đề về cholesterol.",
          "Tiêu chảy, táo bón, và các vấn đề về tiêu hóa.",
          "Triệu chứng của bệnh lý tim mạch như đau ngực, khó thở.",
          "Các triệu chứng tổng quát như mệt mỏi, suy nhược.",
        ],
        item2: [
          "Lối sống không lành mạnh như ăn uống không cân đối và thiếu vận động.",
          "Yếu tố di truyền.",
          "Tuổi tác và các yếu tố môi trường như ô nhiễm.",
        ],
        item3: [
          "Chẩn đoán và điều trị các bệnh lý tổng quát.",
          "Hướng dẫn về lối sống lành mạnh và phòng tránh bệnh.",
          "Quản lý và điều trị các bệnh lý mãn tính như tiểu đường và tăng huyết áp.",
          "Xác định và theo dõi các yếu tố nguy cơ để phòng ngừa bệnh tật.",
        ],
        item4: [
          "Xét nghiệm máu để đánh giá chức năng nội tiết và chẩn đoán các bệnh lý.",
          "Siêu âm và chụp cắt lớp để đánh giá cấu trúc và chức năng của các cơ quan nội tạng.",
          "Xét nghiệm chẩn đoán phức tạp như chụp MRI và CT scan.",
          "Điều trị dựa trên bằng chứng như thuốc, liệu pháp vật lý, và tư vấn dinh dưỡng.",
        ],
      },
      summary:
        "Chuyên khoa Nội Tổng hợp đóng vai trò quan trọng trong việc chăm sóc sức khỏe tổng thể của cơ thể. Việc đến khám và điều trị kịp thời không chỉ giúp phòng ngừa các biến chứng mà còn cải thiện chất lượng cuộc sống. Sự kết hợp giữa kiến thức y học hiện đại và sự tận tâm của đội ngũ y bác sĩ sẽ mang lại những kết quả tích cực cho bệnh nhân.",
    },
    {
      id: "rang-ham-mat",
      name: "Răng - Hàm - Mặt",
      info: "Chuyên khoa Răng - Hàm - Mặt giữ vị trí then chốt trong việc bảo vệ sức khỏe răng miệng tổng thể. Bác sĩ chuyên khoa sẽ thực hiện các biện pháp thăm khám, chẩn đoán tỉ mỉ để xác định chính xác tình trạng của bạn. Quá trình này có thể bao gồm kiểm tra trực tiếp răng miệng, chụp X-quang để kiểm tra cấu trúc bên trong, và đôi khi cần thêm các xét nghiệm hình ảnh chi tiết như CT hoặc MRI. Dựa trên kết quả chẩn đoán, bác sĩ sẽ đưa ra phác đồ điều trị phù hợp. Các phương pháp điều trị trong chuyên khoa Răng - Hàm - Mặt vô cùng đa dạng, tùy thuộc vào từng vấn đề cụ thể. Bác sĩ có thể thực hiện trám răng, bọc mão, phục hình răng bằng implant để điều trị răng hư hỏng, mất răng hoặc cải thiện thẩm mỹ nụ cười.\n Ngoài ra, chuyên khoa này còn điều trị các bệnh về nha chu như viêm nướu, viêm nha chu bằng cách loại bỏ vi khuẩn và mảng bám tích tụ. Sau khi hoàn tất điều trị, bác sĩ sẽ hướng dẫn cụ thể về cách vệ sinh răng miệng đúng cách để duy trì hiệu quả lâu dài và ngăn ngừa bệnh tái phát.",
      img: Dental1,
      sign: {
        header: "Dấu hiệu nhận biết",
        sub: {
          sub1: "Một số dấu hiệu cần tới chuyên khoa Răng - Hàm - Mặt bao gồm:",
          sub2: "Các nguyên nhân thường gây ra vấn đề răng - hàm - mặt là:",
        },
      },
      why: {
        header: "Lợi ích của việc đến khám",
        sub: "Việc chăm sóc sức khỏe miệng và hàm mặt không chỉ giúp duy trì nụ cười đẹp mà còn có ảnh hưởng tích cực đến sức khỏe tổng thể.",
      },
      technique: {
        header: "Công nghệ và phương pháp điều trị",
        sub: "Chuyên khoa Răng - Hàm - Mặt sử dụng các công nghệ và kỹ thuật tiên tiến như:",
      },
      item: {
        item1: [
          "Đau răng và nướu, viêm nhiễm miệng.",
          "Răng sâu, răng hỏng, và mảng bám.",
          "Các vấn đề về cắn và hàm.",
        ],
        item2: [
          "Thói quen nhai không tốt, như nhai kẹo cao su quá nhiều.",
          "Sử dụng nước ngọt có gas và thức ăn nhanh.",
          "Yếu tố di truyền và các vấn đề môi trường.",
        ],
        item3: [
          "Chẩn đoán và điều trị các vấn đề nha khoa như sâu răng, nứt răng.",
          "Phẫu thuật hàm mặt để cải thiện cấu trúc và vẻ ngoài của khuôn mặt.",
          "Niềng răng và các phương pháp điều chỉnh cắn.",
        ],
        item4: [
          "Chụp X-quang và máy quét 3D để chẩn đoán và lập kế hoạch điều trị.",
          "Sử dụng máy laser và công nghệ tiên tiến trong phẫu thuật và điều trị nha khoa.",
          "Điều trị bằng cách sử dụng vật liệu nha khoa tiên tiến và kỹ thuật mới nhất.",
        ],
      },
      summary:
        "Chăm sóc răng - hàm - mặt không chỉ giúp duy trì nụ cười đẹp mà còn là phần quan trọng của việc duy trì sức khỏe tổng thể. Việc đến khám và điều trị kịp thời sẽ giúp ngăn ngừa các vấn đề phức tạp và mang lại sự tự tin trong giao tiếp và giao tiếp.",
    },
    {
      id: "mat",
      name: "Mắt",
      info: `Chuyên khoa Mắt đóng vai trò thiết yếu trong việc chăm sóc và bảo vệ "cửa sổ tâm hồn" của chúng ta. Các bác sĩ chuyên khoa sẽ thực hiện các biện pháp chẩn đoán, điều trị và phòng ngừa toàn diện nhằm mang lại cho bạn đôi mắt khỏe mạnh và tầm nhìn rõ ràng. Phạm vi hoạt động của chuyên khoa Mắt rất rộng, đáp ứng nhu cầu chăm sóc mắt của mọi lứa tuổi. Bác sĩ có thể tiến hành khám mắt tổng quát để kiểm tra sức khỏe mắt định kỳ, phát hiện sớm các tật khúc xạ, bệnh lý về mắt và các vấn đề về thị lực.\n Dựa trên kết quả thăm khám, bác sĩ sẽ tư vấn và kê đơn kính phù hợp, hoặc đưa ra phác đồ điều trị bằng thuốc, laser hay phẫu thuật tùy thuộc vào từng bệnh lý cụ thể. Các bệnh lý về mắt thường gặp như đục thủy tinh thể, glocom, thoái hóa điểm vàng,... đều có thể được điều trị hiệu quả tại chuyên khoa này. Bên cạnh đó, phẫu thuật mắt tiên tiến cũng là một thế mạnh, giúp cải thiện thị lực, phục hồi chức năng mắt và mang lại vẻ đẹp thẩm mỹ cho đôi mắt.`,
      img: Eyes1,
      sign: {
        header: "Dấu hiệu nhận biết",
        sub: {
          sub1: "Một số dấu hiệu cần phải tới chuyên khoa Mắt bao gồm:",
          sub2: "Các nguyên nhân phổ biến gây ra các vấn đề mắt là:",
        },
      },
      why: {
        header: "Lợi ích của việc khám",
        sub: "Chăm sóc mắt định kỳ không chỉ giúp duy trì thị lực mà còn có thể phát hiện sớm và điều trị các vấn đề mắt tiềm ẩn.",
      },
      technique: {
        header: "Công nghệ và phương pháp điều trị",
        sub: "Chuyên khoa Mắt sử dụng các công nghệ và kỹ thuật tiên tiến như:",
      },
      item: {
        item1: [
          "Thị lực mờ, giảm cảm giác nhìn rõ.",
          "Đau mắt, đỏ mắt, và phát ban.",
          "Chảy nước mắt hoặc khó chịu trong mắt.",
        ],
        item2: [
          "Tuổi tác và các vấn đề liên quan đến lão hóa.",
          "Tiếp xúc với ánh sáng mạnh hoặc các yếu tố môi trường gây hại khác.",
          "Yếu tố di truyền và các bệnh lý nền khác.",
        ],
        item3: [
          "Khám và chẩn đoán các vấn đề thị lực như cận thị, viễn thị.",
          "Phẫu thuật mắt như phục hồi thị lực, cấy ghép kính thể nội, hoặc phẫu thuật LASIK.",
          "Điều trị các bệnh lý như viêm kết mạc, đục thủy tinh thể, và bệnh glaucoma.",
        ],
        item4: [
          "Sử dụng máy quét mạng lưới dạng OCT và máy quét siêu âm để chẩn đoán các vấn đề mắt.",
          "Áp dụng công nghệ laser trong phẫu thuật mắt như LASIK.",
          "Cung cấp các phương pháp điều trị đặc biệt như điều trị ánh sáng cho viêm kết mạc.",
        ],
      },
      summary:
        "Chăm sóc mắt định kỳ là một phần quan trọng của việc duy trì sức khỏe tổng thể. Việc thăm chuyên khoa Mắt định kỳ không chỉ giúp duy trì và cải thiện thị lực mà còn có thể phát hiện sớm và điều trị các vấn đề mắt tiềm ẩn, từ đó giữ cho mắt luôn khỏe mạnh và sáng sủa.",
    },
    {
      id: "xet-nghiem",
      name: "Xét nghiệm",
      info: "Xét nghiệm đóng vai trò nền tảng trong việc chẩn đoán chính xác tình trạng sức khỏe của bạn. Nó giống như một công cụ điều tra, giúp bác sĩ thu thập thông tin chi tiết bên trong cơ thể bạn mà mắt thường không thể nhìn thấy. Xét nghiệm có thể được thực hiện trên nhiều loại mẫu khác nhau, tùy thuộc vào từng bệnh lý nghi ngờ. Mẫu xét nghiệm phổ biến nhất là máu, cung cấp thông tin về các tế bào máu, đường huyết, mỡ máu, chức năng gan thận và nhiều yếu tố khác. Bên cạnh đó, nước tiểu, dịch tiết đường hô hấp, mô tế bào, tóc, móng tay cũng có thể được lấy làm mẫu xét nghiệm để kiểm tra các bệnh lý cụ thể.\n Quy trình xét nghiệm thường diễn ra nhanh chóng và tương đối đơn giản. Tùy thuộc vào loại xét nghiệm, bác sĩ có thể lấy máu bằng kim tiêm hoặc yêu cầu bạn thu thập mẫu nước tiểu tại nhà. Sau đó, mẫu xét nghiệm sẽ được đưa đến phòng thí nghiệm để phân tích bằng các thiết bị chuyên dụng. Kết quả xét nghiệm thường có trong vài giờ đến vài ngày, giúp bác sĩ đưa ra chẩn đoán chính xác và lên phác đồ điều trị phù hợp nhất cho bạn.",
      img: Lab1,
      sign: {
        header: "Chức năng của phòng xét nghiệm",
        sub: {
          sub1: "Một số lý do phổ biến mà người ta cần phải đến phòng xét nghiệm bao gồm:",
          sub2: "Các yếu tố dẫn đến nhu cầu xét nghiệm thường bao gồm:",
        },
      },
      why: {
        header: "Nhiệm vụ của phòng xét nghiệm",
        sub: "Xét nghiệm chính xác và kịp thời có thể cung cấp thông tin quan trọng về sức khỏe của bạn, giúp phát hiện và điều trị các vấn đề sức khỏe từ sớm.",
      },
      technique: {
        header: "Công nghệ và phương pháp",
        sub: "Phòng xét nghiệm sử dụng một loạt các kỹ thuật và công nghệ tiên tiến như:",
      },
      item: {
        item1: [
          "Kiểm tra sức khỏe tổng quát với xét nghiệm máu và nước tiểu.",
          "Xác định yếu tố nguy cơ và chuẩn đoán các bệnh lý.",
          "Theo dõi tiến triển của bệnh và hiệu quả của điều trị.",
        ],
        item2: [
          "Triệu chứng bất thường như mệt mỏi, đau nhức, hoặc giảm cân đột ngột.",
          "Kiểm tra định kỳ để theo dõi sức khỏe tổng quát hoặc theo dõi bệnh mãn tính.",
          "Chuẩn đoán bệnh lý hoặc xác định nguyên nhân của các triệu chứng.",
        ],
        item3: [
          "Xác định các chỉ số sinh hóa như đường huyết, cholesterol, và chức năng thận.",
          "Phân tích dịch cơ thể như dịch não tủy hoặc dịch tiểu.",
          "Kiểm tra nhanh cho các bệnh truyền nhiễm như vi khuẩn hoặc virus.",
        ],
        item4: [
          "Sử dụng máy tự động hoá và thiết bị tiên tiến cho sự chính xác và hiệu quả.",
          "Phát triển các phương pháp xét nghiệm phân tử và di truyền tiên tiến.",
          "Cung cấp dịch vụ xét nghiệm tại chỗ và kết quả nhanh chóng.",
        ],
      },
      summary:
        "Phòng xét nghiệm đóng vai trò quan trọng trong quá trình chẩn đoán và theo dõi các vấn đề sức khỏe. Việc thăm phòng xét nghiệm định kỳ giúp đảm bảo bạn có thông tin chính xác về sức khỏe của mình và có thể nhận được sự điều trị phù hợp từ bác sĩ.",
    },
    {
      id: "tai-mui-hong",
      name: "Tai - Mũi - Họng",
      info: "Chuyên khoa Tai - Mũi - Họng đóng vai trò then chốt trong việc bảo vệ sức khỏe vùng đầu cổ của chúng ta. Đây là lĩnh vực y tế tập trung vào chẩn đoán, điều trị và phòng ngừa các vấn đề liên quan đến tai, mũi và họng, đảm bảo chức năng hoạt động hiệu quả của các cơ quan này.\n Quá trình thăm khám chuyên khoa Tai - Mũi - Họng thường bắt đầu với việc kiểm tra lâm sàng trực tiếp bằng mắt thường và các dụng cụ chuyên dụng. Bác sĩ có thể soi tai để kiểm tra tình trạng ống tai, màng nh耳 (ěr) (nhĩ), đánh giá khả năng nghe. Kiểm tra mũi bằng đèn soi mũi để quan sát niêm mạc mũi, vách ngăn mũi, loại trừ các vấn đề viêm nhiễm, dị ứng hoặc các khối bất thường. Bác sĩ cũng thực hiện kiểm tra họng bằng thìa lưỡi để đánh giá amidan, thành sau họng, loại trừ các bệnh lý viêm họng, viêm amidan.",
      img: Ents1,
      sign: {
        header: "Dấu hiệu nhận biết",
        sub: {
          sub1: "Một số dấu hiệu cần phải đến chuyên khoa Tai - Mũi - Họng bao gồm:",
          sub2: "Các nguyên nhân phổ biến gây ra các vấn đề Tai - Mũi - Họng là:",
        },
      },
      why: {
        header: "Lợi ích của việc đến khám",
        sub: "Chăm sóc sức khỏe Tai - Mũi - Họng không chỉ giúp cải thiện chất lượng cuộc sống mà còn có thể ngăn ngừa các biến chứng nghiêm trọng và cải thiện sức khỏe tổng thể.",
      },
      technique: {
        header: "Công nghệ và phương pháp điều trị",
        sub: "Chuyên khoa Tai - Mũi - Họng sử dụng một loạt các công nghệ và kỹ thuật tiên tiến như:",
      },
      item: {
        item1: [
          "Đau hoặc khó chịu trong tai, mũi hoặc họng.",
          "Sự khó thở, ngạt, hoặc cảm giác bí bách.",
          "Tiếng ồn trong tai hoặc giảm khả năng nghe.",
        ],
        item2: [
          "Nhiễm trùng vi khuẩn hoặc virus như viêm họng, viêm mũi, viêm tai giữa.",
          "Dị tật cấu trúc như bướu cổ, hẹp mũi, hoặc dị vật trong tai.",
          "Tiếp xúc với chất kích ứng như hút thuốc, bụi bẩn, hoặc hóa chất.",
        ],
        item3: [
          "Khám và chẩn đoán các vấn đề Tai - Mũi - Họng như viêm amidan, polyp mũi, hoặc ung thư họng.",
          "Phẫu thuật để cải thiện lưu thông không khí như phẫu thuật mũi hoặc phẫu thuật họng.",
          "Điều trị các vấn đề liên quan đến sự nguy cơ mất nghe hoặc giảm thính lực.",
        ],
        item4: [
          "Sử dụng endoscopes và các thiết bị hình ảnh tiên tiến để chẩn đoán và phẫu thuật.",
          "Phát triển các phương pháp điều trị tiên tiến như laser surgery và radiofrequency ablation.",
          "Counseling và phòng ngừa về vấn đề liên quan đến hút thuốc và môi trường.",
        ],
      },
      summary:
        "Chuyên khoa Tai - Mũi - Họng đóng vai trò quan trọng trong việc chăm sóc sức khỏe của hệ thống hô hấp trên. Việc đến khám định kỳ không chỉ giúp phát hiện sớm và điều trị các vấn đề Tai - Mũi - Họng mà còn có thể cải thiện chất lượng cuộc sống và ngăn ngừa các biến chứng nghiêm trọng.",
    },
    {
      id: "than-kinh",
      name: "Thần kinh",
      info: "Hệ thần kinh đóng vai trò trung tâm điều khiển, giống như một bộ chỉ huy phức tạp, dẫn dắt mọi hoạt động của cơ thể chúng ta. Mạng lưới này bao gồm não bộ, tủy sống, các dây thần kinh lan tỏa khắp cơ thể và các thụ thể cảm giác tinh nhạy. Hệ thần kinh có nhiệm vụ thu thập thông tin từ môi trường xung quanh và bên trong, xử lý chúng, rồi đưa ra tín hiệu điều khiển hoạt động của các cơ quan, giúp cơ thể phản ứng chính xác với mọi tình huống.\n Bác sĩ chuyên khoa Thần kinh là những chuyên gia được đào tạo bài bản để chẩn đoán, điều trị và phục hồi chức năng cho các bệnh lý liên quan đến hệ thống thần kinh phức tạp này. Quá trình chẩn đoán thường bắt đầu bằng việc thăm khám tỉ mỉ, đánh giá các phản xạ thần kinh, khả năng vận động, phối hợp, cảm giác và nhận thức của bệnh nhân. Để có cái nhìn sâu sắc hơn, bác sĩ có thể chỉ định thêm các xét nghiệm cận lâm sàng. Những xét nghiệm này có thể bao gồm điện tâm đồ (kiểm tra hoạt động tim), điện não đồ (đánh giá hoạt động não), chụp cộng hưởng từ MRI hoặc chụp cắt lớp CT (quan sát cấu trúc não bộ và tủy sống).",
      img: Neuron1,
      sign: {
        header: "Dấu hiệu nhận biết",
        sub: {
          sub1: "Một số dấu hiệu cần phải đến chuyên khoa Thần kinh bao gồm:",
          sub2: "Các nguyên nhân phổ biến gây ra các vấn đề Thần kinh là:",
        },
      },
      why: {
        header: "Lợi ích của việc đến khám",
        sub: "Chăm sóc sức khỏe Thần kinh không chỉ giúp kiểm soát và điều trị các bệnh lý thần kinh mà còn có thể cải thiện chất lượng cuộc sống và hỗ trợ tái hòa nhập xã hội.",
      },
      technique: {
        header: "Công nghệ và phương pháp điều trị",
        sub: "Chuyên khoa Thần kinh sử dụng một loạt các kỹ thuật và công nghệ tiên tiến như:",
      },
      item: {
        item1: [
          "Đau và cảm giác giảm hoặc mất ở các phần của cơ thể.",
          "Tình trạng co giật và run chân tay.",
          "Sự suy giảm trí nhớ và chức năng tư duy.",
        ],
        item2: [
          "Bệnh lý tự miễn dịch như viêm dây thần kinh, bệnh Alzheimer.",
          "Bệnh đau dây thần kinh toàn thân như fibromyalgia.",
          "Bệnh lý dịch cơ như đau dây thần kinh cổ.",
        ],
        item3: [
          "Chẩn đoán và điều trị các bệnh lý thần kinh như đau dây thần kinh, Parkinson.",
          "Cung cấp liệu pháp vật lý và tư vấn dinh dưỡng cho bệnh nhân.",
          "Thực hiện các phương pháp can thiệp như phẫu thuật thần kinh hoặc điều trị dược phẩm.",
        ],
        item4: [
          "Sử dụng thiết bị hình ảnh tiên tiến như MRI và CT scan để chẩn đoán.",
          "Áp dụng kỹ thuật phẫu thuật tiên tiến như thần kinh học.",
          "Tiếp cận các phương pháp điều trị mới như điều trị bằng sóng âm.",
        ],
      },
      summary:
        "Chăm sóc sức khỏe Thần kinh đóng vai trò quan trọng trong việc kiểm soát và điều trị các bệnh lý thần kinh, từ đó cải thiện chất lượng cuộc sống và hỗ trợ sự tái hòa nhập xã hội của bệnh nhân. Việc đến khám định kỳ không chỉ giúp phát hiện sớm các vấn đề thần kinh mà còn có thể ngăn ngừa và điều trị các biến chứng nghiêm trọng.",
    },
  ];

  const specialty = specialties.find(
    (specialty) => specialty.id === specialtyId
  );

  let info = specialty.info;
  let infoSplit = info.split("\n").map((item, index) => (
    <>
      <p key={index}>{item}</p>
      <br />
    </>
  ));

  return (
    <>
      <div className="content-container">
        <Breadcrumbs
          className="breadcrumbs"
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link className="text-secondary" to="/home">
            Trang chủ
          </Link>
          ,
          <Link className="text-secondary" to="/specialty-page">
            Chuyên khoa
          </Link>
          ,<Typography className="text-dark">{specialty.name}</Typography>,
        </Breadcrumbs>
      </div>
      <div className="content-container">
        <h1 className="specialty-detail-header">{specialty.name}</h1>
        <div className="specialty-detail-wrapper">
          <div className="c-7 m-12">
            <p>{infoSplit}</p>
          </div>
          <div className="c-5 m-12">
            <img src={specialty.img} alt="Cardiology" />
          </div>
        </div>
        <div className="specilty-detail-info">
          {/* Sign */}
          <h3>{specialty.sign.header}</h3>
          <p>{specialty.sign.sub.sub1}</p>
          <ul>
            {specialty.item.item1.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p>{specialty.sign.sub.sub2}</p>
          <ul>
            {specialty.item.item2.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          {/* Why */}
          <h3>{specialty.why.header}</h3>
          <p>{specialty.why.sub}</p>
          <ul>
            {specialty.item.item3.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          {/* Technique */}
          <h3>{specialty.technique.header}</h3>
          <p>{specialty.technique.sub}</p>
          <ul>
            {specialty.item.item4.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <div className="specialty-detail-summary">
            <span>{specialty.summary}</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SpecialtyDetail;
