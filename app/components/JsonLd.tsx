// 구조화 데이터를 <script type="application/ld+json">으로 출력합니다.
// "<"를 이스케이프해 문자열 안의 </script>가 태그를 닫지 못하게 합니다.
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
