'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateTransaction(formData) {
    
    // retrieve form data
    const id = formData.get('id');
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
        console.error('User is not authenticated within updateTransaction server action');
    }

    // call function to update the transaction where the transaction id and user id match the transaction in the table
    const {data, error} = await supabase
        .from('transactions')
        .update(
            {
                title,
                description,
                amount: amount,
            }
        ).match({id, user_id: user.id})
    
    // return error in case something went wrong
    if (error) {
        console.error('Error updating data', error)
        return;
    }

    // refresh page to view changes
    revalidatePath('/transaction-list');

    // return
    return {message: 'Success'}
}