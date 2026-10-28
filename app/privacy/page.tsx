import { Metadata } from "next";
import InfoPage from "../components/InfoPage";
import { contactEmail, siteName } from "../site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: `${siteName}의 개인정보처리방침입니다. 수집하는 정보, 쿠키 및 Google 애드센스 광고, 이용자의 권리에 대해 안내합니다.`,
  alternates: { canonical: "/privacy" },
};

const effectiveDate = "2026년 10월 24일";

export default function PrivacyPage() {
  return (
    <InfoPage title="개인정보처리방침">
      <p>
        {siteName}(이하 &quot;사이트&quot;)는 이용자의 개인정보를 중요하게 생각하며,
        「개인정보 보호법」 등 관련 법령을 준수합니다. 이 방침은 사이트가 어떤 정보를
        어떻게 다루는지 설명합니다.
      </p>

      <section>
        <h2>1. 수집하는 개인정보</h2>
        <p>
          사이트는 회원가입 기능이 없으며, 이름·연락처 등 이용자를 식별할 수 있는
          개인정보를 직접 수집하지 않습니다.
        </p>
        <ul>
          <li>
            각 도구에 입력한 날짜, 텍스트, 숫자, 이미지 등은 이용자의 브라우저 안에서만
            처리되며 사이트 서버로 전송되거나 저장되지 않습니다.
          </li>
          <li>
            사이트 호스팅 업체(Vercel)는 서비스 제공과 보안을 위해 접속 IP 주소, 브라우저
            정보, 접속 시각 같은 접속 기록을 자동으로 남길 수 있습니다.
          </li>
          <li>
            사이트 개선을 위해 Vercel Web Analytics로 방문 페이지, 유입 경로, 국가, 기기 종류 같은
            방문 통계를 수집합니다. 이 통계는 쿠키를 사용하지 않으며 개별 이용자를 식별하지 않습니다.
          </li>
          <li>
            이메일로 문의하는 경우 회신을 위해 이메일 주소와 문의 내용을 받으며, 문의
            처리 목적 외에는 사용하지 않습니다.
          </li>
        </ul>
      </section>

      <section>
        <h2>2. 쿠키와 광고 (Google 애드센스)</h2>
        <p>
          사이트는 운영 비용 마련을 위해 Google 애드센스 광고를 게재할 수 있습니다.
        </p>
        <ul>
          <li>
            Google을 포함한 제3자 광고 업체는 쿠키를 사용하여 이용자의 이 사이트 또는 다른
            웹사이트 방문 기록을 바탕으로 광고를 게재합니다.
          </li>
          <li>
            Google은 광고 쿠키를 사용하여 이용자의 사이트 방문 기록에 기반한 광고를
            이용자에게 표시할 수 있습니다.
          </li>
          <li>
            이용자는{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google 광고 설정
            </a>
            에서 개인 맞춤 광고를 해제할 수 있습니다. 또한{" "}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.aboutads.info
            </a>
            에서 제3자 업체의 개인 맞춤 광고용 쿠키 사용을 거부할 수 있습니다.
          </li>
          <li>
            Google이 수집한 정보를 사용하는 방식은{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google 파트너 사이트 정보 사용 방식
            </a>
            에서 확인할 수 있습니다.
          </li>
          <li>
            브라우저 설정에서 쿠키 저장을 거부하거나 삭제할 수 있으며, 이 경우에도
            사이트의 도구는 모두 정상적으로 이용할 수 있습니다.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. 개인정보의 보유 및 파기</h2>
        <p>
          문의 메일은 처리가 끝난 뒤 지체 없이 삭제합니다. 접속 기록은 호스팅 업체의
          정책에 따라 보관 후 파기됩니다.
        </p>
      </section>

      <section>
        <h2>4. 이용자의 권리</h2>
        <p>
          이용자는 언제든지 자신의 개인정보에 대한 열람, 정정, 삭제, 처리 정지를 요청할
          수 있습니다. 아래 연락처로 요청하시면 지체 없이 조치하겠습니다.
        </p>
      </section>

      <section>
        <h2>5. 개인정보 보호책임자</h2>
        <ul>
          <li>책임자: {siteName} 운영자</li>
          <li>
            이메일: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </li>
        </ul>
      </section>

      <section>
        <h2>6. 방침의 변경</h2>
        <p>
          이 개인정보처리방침은 {effectiveDate}부터 적용됩니다. 내용이 변경되면 이
          페이지를 통해 공지합니다.
        </p>
      </section>
    </InfoPage>
  );
}
