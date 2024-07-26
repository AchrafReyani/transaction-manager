'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function transactionOperation(action, formData) {
  // Create a session
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;

  // Return error in case user is not authenticated
  if (!user) {
    console.error(`User is not authenticated within ${action}Transaction server action`);
    return { message: 'User not authenticated' };
  }

  let error;
  let data;
  let title, description, amount, transactionId;

  // Perform the appropriate CRUD operation based on the action
  switch (action) {
    case 'add':
      title = formData.get('title');
      description = formData.get('description');
      amount = formData.get('amount');

      // Insert the transaction
      ({ data, error } = await supabase
        .from('transactions')
        .insert([
          {
            title,
            description,
            amount: amount,
            user_id: user.id
          }
        ])
      );
      break;

    case 'delete':
      transactionId = formData.get('id');

      // Delete the transaction
      ({ error } = await supabase
        .from('transactions')
        .delete()
        .match({ id: transactionId, user_id: user.id })
      );
      break;

    case 'update':
      const id = formData.get('id');
      title = formData.get('title');
      description = formData.get('description');
      amount = formData.get('amount');

      // Update the transaction
      ({ data, error } = await supabase
        .from('transactions')
        .update({
          title: title,
          description: description,
          amount: amount
        })
        .match({ id, user_id: user.id })
      );
      break;

    default:
      console.error('Invalid action');
      return { message: 'Invalid action' };
  }

  // Return error in case something went wrong
  if (error) {
    console.error(`Error during ${action} transaction`, error);
    return { message: `Error during ${action} transaction` };
  }

  // Refresh the page to view changes
  revalidatePath('/transaction-list');

  // Return success message
  return { message: 'Success' };
}
