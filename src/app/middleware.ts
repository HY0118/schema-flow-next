// app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl; // 요청된 URL의 경로

  // 사용자가 루트 (/) 경로에 접근했을 때 /home으로 리디렉션
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // 다른 경로에 대해서는 미들웨어가 아무 작업도 하지 않음
  return NextResponse.next();
}

// matcher로 특정 경로에만 미들웨어 적용
export const config = {
  matcher: '/',
};
