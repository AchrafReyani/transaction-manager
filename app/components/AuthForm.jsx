'use client';
import {Auth} from '@supabase/auth-ui-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AuthForm() {
    const supabase = createClientComponentClient();
    return (
        <Auth
        supabaseClient={supabase}
        view="magic_link"
        showLinks={false}
        providers={[]}
        redirectTo='http://localhost:3000/auth/callback'
        appearance={{
            theme: 'dark',
            button: {
                className: 'bg-green-500 text-white hover:bg-green-600 rounded-md',
              },
              input: {
                className: 'bg-gray-800 border-gray-600 text-white rounded-md',
              },
        }}
        />
    );
}