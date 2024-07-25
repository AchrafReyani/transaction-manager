'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteTransaction(formData) {
    
    // retrieve id from form
    const transactionId = formData.get('id');

    // make session
    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore});
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user;

    // return error incase user is not authenticated
    if (!user) {
        console.error('User is not authenticated within deleteTransaction server action');
    }

    // call function to insert the transaction in the table of the authenticated user
    const {error} = await supabase
        .from('transactions')
        .delete()
        .match({id: transactionId, user_id: user.id})
    
    // return error in case something went wrong
    if (error) {
        console.error('Error deleting data', error)
        return;
    }

    // refresh page to view changes
    revalidatePath('/transaction-list');

    // return
    return {message: 'Success'}
}