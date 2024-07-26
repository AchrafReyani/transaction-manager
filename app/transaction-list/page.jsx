import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import TransactionItem from "../components/TransactionItem";
import TransactionForm from "../components/TransactionForm";
import Footer from "../components/Footer";

export default async function TransactionList() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  const userEmail = user?.email;

  // Query transactions for the specific user
  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('An error occurred while fetching the transactions', error);
  }

  // Calculate the total amount of transactions
  const totalAmount = transactions?.reduce((total, transaction) => total + transaction.amount, 0) || 0;

  //console.log({ transactions });

  return (
    <div className="bg-white min-h-screen p-6 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <img
            src="/images/app-logo.png"
            alt="App Logo"
            className="w-32 h-16 sm:w-48 sm:h-24 lg:w-64 lg:h-32 mr-4"
          />
          <h3 className="text-black text-xl font-bold truncate">Currently logged in as {userEmail}</h3>
          <form action="/auth/signout" method="post">
            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Sign out
            </button>
          </form>
        </div>
        <div className="flex justify-between items-center mb-8">
          <TransactionForm />
          <p className="text-black text-xl font-semibold ml-4">
            Total Amount: ${totalAmount.toFixed(2)}
          </p>
        </div>
        <div className="mt-8 space-y-4">
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
