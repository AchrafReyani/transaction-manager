import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import EditTransaction from "../components/EditTransaction"; 
import TransactionForm from "../components/TransactionForm";
import { deleteTransaction } from "../server-actions/deleteTransaction";
import Footer from "../components/Footer";

export default async function TransactionList(){
    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore});
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user;
    const userEmail = user?.email;
    
    // the query that reads the transactions from a specific user
    const {data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', {ascending: true})

    if (error) {
        console.error('An error ocurred while fetching the transactions')
    }

    // Calculate the total amount of transactions
    const totalAmount = transactions?.reduce((total, transaction) => total + transaction.amount, 0) || 0;

    console.log({transactions});
    
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
                    <div key={transaction.id} className="bg-green-50 p-4 rounded-lg shadow-md">
                      <h2 className="text-xl font-semibold">{transaction.title}  ${transaction.amount.toFixed(2)}</h2>
                      <p className="text-gray-700">{transaction.description}</p>
                      <p className="text-gray-500 text-sm">Created on: {new Date(transaction.created_at).toLocaleDateString()}</p>
                      <div className="mt-4 flex space-x-2">
                        <form action={deleteTransaction} className="flex-grow">
                          <input type="hidden" name="id" value={transaction.id} />
                          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                            Delete
                          </button>
                        </form>
                        <EditTransaction transaction={transaction} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Footer /> {/* Use the Footer component */}
            </div>
    )
}
