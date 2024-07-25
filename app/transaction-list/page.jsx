export default function TransactionList(){

    const transactions = [];
    
    return (
        <div>
            <div>
                <div>
                    <h1>
                        Your Transactions
                    </h1>
                    <form action="/auth/signout" method="post">
                        <button type="Submit">
                            Sign out
                        </button>
                    </form>
                </div>
                <TransactionForm />
                <div>
                    {
                        transactions.map((transaction) => (
                            <div key={transaction.id}>
                                <h2>{transaction.title} - {transaction.amount}</h2>
                                <p>{transaction.description}</p>
                                <div>
                                    <form action="deleteTransaction">
                                        <input type="hidden" name="id" value={transaction.id}/>
                                        <button type="submit">
                                            Delete
                                        </button>
                                    </form>
                                    <EditTransaction transaction={transaction} />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}