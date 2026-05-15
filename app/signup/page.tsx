'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(timer)
  }, [toast])

  const canSubmit = email.trim() && password && passwordConfirm && !isLoading

  const handleSignup = async () => {
    if (!canSubmit) return

    if (password !== passwordConfirm) {
      setToast('비밀번호가 일치하지 않습니다')
      return
    }

    setIsLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({ email: email.trim(), password })
      if (error) {
        if (error.message.includes('already registered') || error.message.includes('already been registered')) {
          setToast('이미 사용 중인 이메일입니다')
        } else if (error.message.includes('password')) {
          setToast('비밀번호는 최소 6자 이상이어야 합니다')
        } else {
          setToast('회원가입에 실패했습니다. 다시 시도해주세요')
        }
        return
      }
      router.push('/')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-3 bg-[var(--error)] text-white text-sm rounded-lg shadow-lg">
          {toast}
        </div>
      )}
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
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              disabled={isLoading}
              className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md outline-none focus:border-[var(--accent)] transition-colors text-[var(--text)] placeholder:text-[var(--placeholder)] bg-[var(--card-bg)] disabled:opacity-50"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-[var(--text)]">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              disabled={isLoading}
              className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md outline-none focus:border-[var(--accent)] transition-colors text-[var(--text)] placeholder:text-[var(--placeholder)] bg-[var(--card-bg)] disabled:opacity-50"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password-confirm" className="text-sm font-medium text-[var(--text)]">
              비밀번호 확인
            </label>
            <input
              id="password-confirm"
              type="password"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSignup()}
              placeholder="비밀번호를 다시 입력하세요"
              disabled={isLoading}
              className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md outline-none focus:border-[var(--accent)] transition-colors text-[var(--text)] placeholder:text-[var(--placeholder)] bg-[var(--card-bg)] disabled:opacity-50"
            />
          </div>
          <button
            type="button"
            onClick={handleSignup}
            disabled={!canSubmit}
            className="mt-2 w-full py-2 bg-[var(--accent)] text-white text-sm font-medium rounded-md hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? '처리 중...' : '회원가입'}
          </button>
          <p className="text-center text-sm text-[var(--text-sub)]">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-[var(--accent)] hover:underline">
              로그인
            </Link>
          </p>
          <p className="text-center text-xs text-[var(--placeholder)]">
            회원가입 시{' '}
            <Link href="/privacy" className="hover:underline">
              개인정보 처리방침
            </Link>
            에 동의하는 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </div>
  )
}
