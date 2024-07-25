export default function TransactionForm() {
    return (
        <form action="addTransaction">
        <div>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
        </div>
        <div>
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" required />
        </div>
        <div>
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" name="amount" required />
        </div>
        <button type="submit">
            Add transaction
        </button>
    </form>
    )
}