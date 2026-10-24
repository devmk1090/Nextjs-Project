import { Metadata } from "next";
import InfoPage from "../components/InfoPage";
import { contactEmail, githubUrl, siteName } from "../site";

export const metadata: Metadata = {
  title: "문의하기",
  description: `${siteName}에 대한 오류 제보, 기능 제안, 제휴 및 기타 문의 방법을 안내합니다.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <InfoPage title="문의하기">
      <p>
        {siteName}를 이용해 주셔서 감사합니다. 계산 결과가 이상하거나, 필요한 도구가
        있거나, 그 밖에 궁금한 점이 있으면 편하게 연락해 주세요.
      </p>

      <section>
        <h2>이메일</h2>
        <p>
          <a href={`mailto:${contactEmail}`} className="text-lg">
            {contactEmail}
          </a>
        </p>
      </section>

      <section>
        <h2>이런 내용을 보내 주시면 도움이 됩니다</h2>
        <ul>
          <li>
            <strong>오류 제보:</strong> 사용한 도구 이름, 입력한 값, 기대한 결과와 실제
            결과, 사용 중인 브라우저
          </li>
          <li>
            <strong>기능 제안:</strong> 추가되었으면 하는 도구나 기존 도구에 필요한 기능
          </li>
          <li>
            <strong>설명 오류:</strong> 페이지 설명 중 사실과 다르거나 오래된 정보
          </li>
        </ul>
      </section>

      <section>
        <h2>GitHub</h2>
        <p>
          개발자라면{" "}
          <a href={`${githubUrl}/issues`} target="_blank" rel="noopener noreferrer">
            GitHub Issues
          </a>
          에 직접 이슈를 남기셔도 됩니다.
        </p>
      </section>
    </InfoPage>
  );
}
