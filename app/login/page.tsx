'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(timer)
  }, [toast])

  const canSubmit = email.trim() && password && !isLoading

  const handleKakaoLogin = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) {
      setToast('카카오 로그인을 사용할 수 없습니다')
      return
    }
    if (data.url) window.location.href = data.url
  }

  const handleLogin = async () => {
    if (!canSubmit) return

    setIsLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })
      if (error) {
        if (error.message.includes('Invalid login credentials') || error.message.includes('invalid_credentials')) {
          setToast('이메일 또는 비밀번호가 올바르지 않습니다')
        } else if (error.message.includes('Email not confirmed')) {
          setToast('이메일 인증이 필요합니다. 메일함을 확인해주세요')
        } else {
          setToast('로그인에 실패했습니다. 다시 시도해주세요')
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
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="비밀번호를 입력하세요"
              disabled={isLoading}
              className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md outline-none focus:border-[var(--accent)] transition-colors text-[var(--text)] placeholder:text-[var(--placeholder)] bg-[var(--card-bg)] disabled:opacity-50"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            disabled={!canSubmit}
            className="mt-2 w-full py-2 bg-[var(--accent)] text-white text-sm font-medium rounded-md hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? '처리 중...' : '로그인'}
          </button>
          <button
            type="button"
            onClick={handleKakaoLogin}
            className="w-full"
            style={{ cursor: 'pointer' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/kakao_login_large_wide.png"
              alt="카카오 로그인"
              className="w-full h-auto pointer-events-none"
            />
          </button>
          <p className="text-center text-sm text-[var(--text-sub)]">
            <Link href="/reset-password" className="text-[var(--accent)] hover:underline">
              비밀번호 찾기
            </Link>
          </p>
          <p className="text-center text-sm text-[var(--text-sub)]">
            계정이 없으신가요?{' '}
            <Link href="/signup" className="text-[var(--accent)] hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
