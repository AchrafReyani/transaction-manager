export default function TransactionList(){
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
            </div>
        </div>
    )
}