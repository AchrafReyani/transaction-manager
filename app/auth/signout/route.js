import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({cookies: () => cookieStore});

    // get current session
    const {data: {session}} = await supabase.auth.getSession();

    // sign out of current session
    if (session) {
        await supabase.auth.signOut()
    }

    // redirect user to homepage
    return NextResponse.redirect(new URL('/', req.url), {status: 302})
}