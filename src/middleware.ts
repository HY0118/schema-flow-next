// root 디렉터리의 middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 사용자가 루트 (/) 경로에 접근했을 때 /home으로 리디렉션
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url)); // '.' 대신 '/' 사용
  }

  return NextResponse.next();
}

// matcher로 루트 경로만 미들웨어 적용
export const config = {
  matcher: '/',
};
