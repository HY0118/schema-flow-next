// components/ClientProvider.tsx (클라이언트 컴포넌트)
"use client";  // 클라이언트 사이드에서만 렌더링됨
import { RecoilRoot } from 'recoil';

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      {children}
    </RecoilRoot>
  );
}
