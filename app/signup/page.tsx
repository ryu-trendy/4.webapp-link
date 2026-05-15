import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
      <div className="w-full max-w-sm flex flex-col items-center gap-8">
        <h1 className="text-2xl font-bold text-[var(--text)]">한입 링크</h1>
        <div className="w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-[var(--text)]">
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md outline-none focus:border-[var(--accent)] transition-colors text-[var(--text)] placeholder:text-[var(--placeholder)] bg-[var(--card-bg)]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-[var(--text)]">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md outline-none focus:border-[var(--accent)] transition-colors text-[var(--text)] placeholder:text-[var(--placeholder)] bg-[var(--card-bg)]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password-confirm" className="text-sm font-medium text-[var(--text)]">
              비밀번호 확인
            </label>
            <input
              id="password-confirm"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md outline-none focus:border-[var(--accent)] transition-colors text-[var(--text)] placeholder:text-[var(--placeholder)] bg-[var(--card-bg)]"
            />
          </div>
          <button
            type="button"
            className="mt-2 w-full py-2 bg-[var(--accent)] text-white text-sm font-medium rounded-md hover:bg-[var(--accent-hover)] transition-colors"
          >
            회원가입
          </button>
          <p className="text-center text-sm text-[var(--text-sub)]">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-[var(--accent)] hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
