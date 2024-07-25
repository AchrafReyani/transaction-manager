import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import EditTransaction from "../components/EditTransaction";
import TransactionForm from "../components/TransactionForm";


export default async function TransactionList(){
    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore});
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user;
    // the query that reads the transactions from a specific user
    const {data: transactions, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', {ascending: true})

    if (error) {
        console.error('An error ocurred while fetching the transactions')
    }

    console.log({transactions});
    
    return (
            <div className="bg-white min-h-screen p-6">
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-black text-3xl font-bold">Your Transactions</h1>
                  <form action="/auth/signout" method="post">
                    <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                      Sign out
                    </button>
                  </form>
                </div>
                <TransactionForm />
                <div className="mt-8 space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="bg-green-50 p-4 rounded-lg shadow-md">
                      <h2 className="text-xl font-semibold">{transaction.title} - ${transaction.amount}</h2>
                      <p className="text-gray-700">{transaction.description}</p>
                      <div className="mt-4 flex space-x-2">
                        <form action="deleteTransaction" method="post" className="flex-grow">
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
            </div>
    )
}