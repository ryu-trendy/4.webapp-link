import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-12 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-[var(--text)]">개인정보 처리방침</h1>
          <p className="text-sm text-[var(--text-sub)]">
            한입 링크(이하 "서비스")는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」 및 관련 법령을 준수합니다.
            본 방침은 서비스가 수집하는 개인정보의 항목, 이용 목적, 보유 기간, 이용자의 권리 등을 안내합니다.
          </p>
        </div>

        <section className="flex flex-col gap-4">
          <h2 className="text-base font-semibold text-[var(--text)]">1. 수집하는 개인정보 항목 및 수집 방법</h2>
          <div className="flex flex-col gap-2 text-sm text-[var(--text-sub)] leading-relaxed">
            <p><span className="font-medium text-[var(--text)]">수집 항목</span></p>
            <ul className="list-disc list-inside flex flex-col gap-1 pl-2">
              <li>필수 항목: 이메일 주소</li>
              <li>카카오 소셜 로그인 시: 카카오 계정 이메일 주소</li>
              <li>서비스 이용 과정에서 자동 생성: 서비스 이용 기록, 접속 로그</li>
            </ul>
            <p className="mt-1"><span className="font-medium text-[var(--text)]">수집 방법</span>: 회원가입 및 소셜 로그인 과정에서 이용자가 직접 입력하거나 소셜 로그인 제공자(카카오)로부터 제공받습니다.</p>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-base font-semibold text-[var(--text)]">2. 개인정보 수집 및 이용 목적</h2>
          <ul className="list-disc list-inside flex flex-col gap-1 text-sm text-[var(--text-sub)] leading-relaxed pl-2">
            <li>회원 식별 및 본인 확인</li>
            <li>서비스 제공 및 운영 (링크·폴더 저장, 조회, 관리)</li>
            <li>비밀번호 재설정 등 계정 관련 안내</li>
            <li>서비스 개선을 위한 통계 분석 (비식별 처리 후 활용)</li>
          </ul>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-base font-semibold text-[var(--text)]">3. 개인정보 보유 및 이용 기간</h2>
          <div className="flex flex-col gap-2 text-sm text-[var(--text-sub)] leading-relaxed">
            <p>원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.</p>
            <p>단, 아래의 경우 명시한 기간 동안 보존합니다.</p>
            <ul className="list-disc list-inside flex flex-col gap-1 pl-2">
              <li>회원 탈퇴 시: 즉시 파기</li>
              <li>전자상거래 등에서의 소비자보호에 관한 법률에 따른 계약·청약철회 기록: 5년</li>
              <li>전자금융거래법에 따른 전자금융 거래 기록: 5년</li>
              <li>통신비밀보호법에 따른 로그 기록: 3개월</li>
            </ul>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-base font-semibold text-[var(--text)]">4. 개인정보의 제3자 제공</h2>
          <p className="text-sm text-[var(--text-sub)] leading-relaxed">
            서비스는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
            다만, 이용자가 사전에 동의한 경우 또는 법령의 규정에 의거하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우에는 예외로 합니다.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-base font-semibold text-[var(--text)]">5. 개인정보 처리 위탁</h2>
          <div className="flex flex-col gap-2 text-sm text-[var(--text-sub)] leading-relaxed">
            <p>서비스는 원활한 운영을 위해 다음과 같이 개인정보 처리 업무를 위탁하고 있습니다.</p>
            <div className="border border-[var(--border)] rounded-md overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-[var(--hover-bg)]">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-[var(--text)]">수탁 업체</th>
                    <th className="px-4 py-2 text-left font-medium text-[var(--text)]">위탁 업무</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[var(--border)]">
                    <td className="px-4 py-2">Supabase, Inc.</td>
                    <td className="px-4 py-2">회원 인증 및 데이터베이스 저장·관리</td>
                  </tr>
                  <tr className="border-t border-[var(--border)]">
                    <td className="px-4 py-2">Kakao Corp.</td>
                    <td className="px-4 py-2">소셜 로그인 인증</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-base font-semibold text-[var(--text)]">6. 이용자 및 법정대리인의 권리와 행사 방법</h2>
          <div className="flex flex-col gap-2 text-sm text-[var(--text-sub)] leading-relaxed">
            <p>이용자는 언제든지 다음의 권리를 행사할 수 있습니다.</p>
            <ul className="list-disc list-inside flex flex-col gap-1 pl-2">
              <li>개인정보 열람 요청</li>
              <li>오류 등이 있을 경우 정정 요청</li>
              <li>삭제 요청</li>
              <li>처리 정지 요청</li>
            </ul>
            <p>위 권리 행사는 서비스 내 계정 설정 또는 개인정보 보호책임자에게 서면, 이메일로 연락하시면 지체 없이 조치하겠습니다.</p>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-base font-semibold text-[var(--text)]">7. 개인정보 보호책임자</h2>
          <div className="text-sm text-[var(--text-sub)] leading-relaxed">
            <p>서비스의 개인정보 처리에 관한 업무를 총괄하고 이용자의 개인정보 관련 문의를 처리합니다.</p>
            <ul className="list-none flex flex-col gap-1 mt-2 pl-2">
              <li>• 이메일: support@hanip-link.com</li>
            </ul>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-base font-semibold text-[var(--text)]">8. 개인정보의 안전성 확보 조치</h2>
          <ul className="list-disc list-inside flex flex-col gap-1 text-sm text-[var(--text-sub)] leading-relaxed pl-2">
            <li>비밀번호 암호화 저장</li>
            <li>HTTPS를 통한 데이터 전송 암호화</li>
            <li>개인정보 접근 권한 최소화</li>
            <li>SQL Injection 등 외부 공격 방지를 위한 보안 조치</li>
          </ul>
        </section>

        <div className="pt-4 border-t border-[var(--border)] flex flex-col gap-1">
          <p className="text-xs text-[var(--placeholder)]">시행일: 2025년 1월 1일</p>
          <p className="text-xs text-[var(--placeholder)]">최종 수정일: 2025년 5월 15일</p>
        </div>

        <Link href="/login" className="text-sm text-[var(--accent)] hover:underline self-start">
          ← 로그인으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
