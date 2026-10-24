import { Metadata } from "next";
import Link from "next/link";
import InfoPage from "../components/InfoPage";
import { categories, getToolsByCategory, toolPath } from "../tools";
import { contactEmail, githubUrl, launchYear, siteName } from "../site";

export const metadata: Metadata = {
  title: "사이트 소개",
  description: `${siteName}는 만 나이·음력 변환 같은 생활 계산기부터 JSON 포매터·정규식 테스터 같은 개발자 도구까지, 회원가입 없이 브라우저에서 바로 쓰는 무료 유틸리티 모음입니다.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <InfoPage title="사이트 소개">
      <section>
        <h2>{siteName}는 어떤 사이트인가요?</h2>
        <p>
          {siteName}는 일상과 업무에서 자주 필요한 계산·변환·생성 도구를 한곳에
          모아 둔 무료 웹사이트입니다. 만 나이, 음력/양력 변환, 띠, 평수, 근무기간처럼
          한국 생활에 맞춘 계산기와 JSON 포매터, Base64/URL 인코더, 정규식 테스터 같은
          개발자 도구, 텍스트·색상 도구, 랜덤 생성기를 제공합니다.
        </p>
      </section>

      <section>
        <h2>운영 원칙</h2>
        <ul>
          <li>
            <strong>회원가입 없이 무료:</strong> 모든 도구는 로그인 없이 바로
            사용할 수 있습니다.
          </li>
          <li>
            <strong>브라우저에서 처리:</strong> 입력한 날짜, 텍스트, 이미지 등은
            서버로 전송되지 않고 사용자의 브라우저 안에서만 계산됩니다. 자세한 내용은{" "}
            <Link href="/privacy">개인정보처리방침</Link>을 참고하세요.
          </li>
          <li>
            <strong>기준을 밝히는 계산:</strong> 만 나이 통일법(2023년 시행), WHO
            아시아-태평양 BMI 기준처럼 계산에 사용한 기준과 공식을 각 도구 페이지에
            함께 설명합니다.
          </li>
          <li>
            <strong>지속적인 개선:</strong> {launchYear}년부터 운영하며 도구를
            추가하고 설명을 보완하고 있습니다. 소스 코드는{" "}
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            에 공개되어 있습니다.
          </li>
        </ul>
      </section>

      <section>
        <h2>제공하는 도구</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div key={category.id}>
              <h3 className="font-semibold text-gray-800 mb-2">
                {category.emoji} {category.name}
              </h3>
              <ul>
                {getToolsByCategory(category.id).map((tool) => (
                  <li key={tool.slug}>
                    <Link href={toolPath(tool.slug)}>{tool.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>계산 결과 이용 시 유의사항</h2>
        <p>
          모든 도구는 정확한 결과를 내도록 만들고 검증하고 있지만, 대출·이자·근무기간
          계산 결과는 참고용입니다. 금융 상품이나 법적 판단이 필요한 경우에는 해당
          금융기관이나 전문가에게 반드시 확인하시기 바랍니다.
        </p>
      </section>

      <section>
        <h2>문의</h2>
        <p>
          오류 제보, 기능 제안, 기타 문의는{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>로 보내 주시거나{" "}
          <Link href="/contact">문의하기</Link> 페이지를 이용해 주세요.
        </p>
      </section>
    </InfoPage>
  );
}
