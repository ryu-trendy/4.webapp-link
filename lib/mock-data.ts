import { type LinkItem } from '@/components/LinkCard'

export const folders = [
  { id: '1', name: '개발' },
  { id: '2', name: '디자인' },
  { id: '3', name: '뉴스' },
  { id: '4', name: '유튜브' },
]

export const links: LinkItem[] = [
  {
    id: '1',
    title: 'Next.js 공식 문서',
    url: 'https://nextjs.org',
    description: "The React Framework for the Web. Used by some of the world's largest companies, Next.js enables you to create full-stack web applications.",
    folderId: '1',
  },
  {
    id: '2',
    title: 'Tailwind CSS',
    url: 'https://tailwindcss.com',
    description: 'A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.',
    folderId: '2',
  },
  {
    id: '3',
    title: 'TypeScript 공식 핸드북',
    url: 'https://typescriptlang.org',
    description: 'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.',
    folderId: '1',
  },
  {
    id: '4',
    title: 'Figma',
    url: 'https://figma.com',
    description: '팀을 위한 협업 디자인 도구. 하나의 플랫폼에서 디자인, 프로토타입, 피드백을 모두 처리하세요.',
    folderId: '2',
  },
  {
    id: '5',
    title: 'Vercel 배포 플랫폼',
    url: 'https://vercel.com',
    description: 'Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.',
    folderId: '1',
  },
  {
    id: '6',
    title: 'React 공식 문서',
    url: 'https://react.dev',
    description: 'The library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript.',
    folderId: '1',
  },
  {
    id: '7',
    title: 'GitHub',
    url: 'https://github.com',
    description: 'GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community.',
    folderId: '1',
  },
  {
    id: '8',
    title: 'Dribbble',
    url: 'https://dribbble.com',
    description: '디자이너들이 작업물을 공유하고 발견하는 커뮤니티. 전 세계 크리에이티브 디자이너들의 작품을 만나보세요.',
    folderId: '2',
  },
]
