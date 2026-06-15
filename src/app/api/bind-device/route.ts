import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('key');

  if (secret !== 'boss99') {
    return new NextResponse('Invalid Device Binding Key', { status: 401 });
  }

  // Set a permanent HTTP-only cookie to act as a device footprint
  cookies().set('device_footprint_secure', 'verified_admin_device_x99', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 365 * 10, // 10 years
    path: '/',
    sameSite: 'strict'
  });

  return NextResponse.redirect(new URL('/master-console-x9k2p-secure', request.url));
}
