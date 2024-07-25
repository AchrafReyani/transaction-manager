'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addTransaction(formData) {
    
    // retrieve form data
    const title = formData.get('title');
    const description = formData.get('description');
    const amount = formData.get('amount');

    // make session
    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore});
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user;

    // return error incase user is not authenticated
    if (!user) {
        console.error('User is not authenticated within addTransaction server action');
    }

    // call function to insert the transaction in the table of the authenticated user
    const {data, error} = await supabase
        .from('transactions')
        .insert([
            {
                title,
                description,
                amount: amount,
                user_id: user.id
            }
        ])
    
    // return error in case something went wrong
    if (error) {
        console.error('Error insterting data', error)
        return;
    }

    // refresh page to view changes
    revalidatePath('/transaction-list');

    // return
    return {message: 'Success'}
}