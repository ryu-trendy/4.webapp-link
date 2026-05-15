'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' } | null>(null)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(timer)
  }, [toast])

  const handleSend = async () => {
    if (!email.trim() || isLoading) return

    setIsLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/update-password`,
      })
      if (error) {
        setToast({ message: '이메일 발송에 실패했습니다. 다시 시도해주세요', type: 'error' })
        return
      }
      setToast({ message: '비밀번호 재설정 링크를 이메일로 발송했습니다', type: 'success' })
      setEmail('')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
      {toast && (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-3 text-white text-sm rounded-lg shadow-lg ${
          toast.type === 'success' ? 'bg-[var(--success)]' : 'bg-[var(--error)]'
        }`}>
          {toast.message}
        </div>
      )}
      <div className="w-full max-w-sm flex flex-col items-center gap-8">
        <h1 className="text-2xl font-bold text-[var(--text)]">한입 링크</h1>
        <div className="w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-semibold text-[var(--text)]">비밀번호 찾기</h2>
            <p className="text-sm text-[var(--text-sub)]">가입한 이메일로 재설정 링크를 보내드립니다</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-[var(--text)]">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="이메일을 입력하세요"
              disabled={isLoading}
              className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md outline-none focus:border-[var(--accent)] transition-colors text-[var(--text)] placeholder:text-[var(--placeholder)] bg-[var(--card-bg)] disabled:opacity-50"
            />
          </div>
          <button
            type="button"
            onClick={handleSend}
            disabled={!email.trim() || isLoading}
            className="mt-2 w-full py-2 bg-[var(--accent)] text-white text-sm font-medium rounded-md hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? '발송 중...' : '재설정 링크 발송'}
          </button>
          <p className="text-center text-sm text-[var(--text-sub)]">
            <Link href="/login" className="text-[var(--accent)] hover:underline">
              로그인으로 돌아가기
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
