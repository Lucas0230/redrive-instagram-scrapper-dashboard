import { NextRequest, NextResponse } from "next/server";
import { getUrl } from "./lib/get-url";
import { decode } from "next-auth/jwt";

export async function middleware(request: NextRequest) {

    const token = request.cookies.get('next-auth.session-token');
    const pathname = request.nextUrl.pathname;

    const isValidAuth = await (async () => {

        const decoded = await decode({
            token: token?.value,
            secret: process.env.NEXTAUTH_SECRET as string,
        });

        if (!decoded) return false;

        const now = Math.floor(Date.now() / 1000);
        const { exp, iat } = decoded as { exp: number, iat: number };
        if (exp && exp < now) return false;
        if (iat && iat > now) return false;
        return true;
    })();

    console.log(`Auth Middleware =>`)
    console.log({ isValidAuth })

    if (pathname == '/' && isValidAuth) return NextResponse.redirect(new URL(getUrl('/listas')));
    if (pathname != '/' && !isValidAuth) return NextResponse.redirect(new URL(getUrl('/')));

}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}