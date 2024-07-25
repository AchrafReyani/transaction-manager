export default function TransactionForm() {
    return (
      <form action={"addTransaction"} className="space-y-4">
        <div className="bg-green-50 p-4 rounded-md shadow-sm">
          <label htmlFor="title" className="block text-black font-semibold mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full p-2 border border-green-200 rounded-md"
          />
        </div>
        <div className="bg-green-50 p-4 rounded-md shadow-sm">
          <label htmlFor="description" className="block text-black font-semibold mb-2">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            required
            className="w-full p-2 border border-green-200 rounded-md"
          />
        </div>
        <div className="bg-green-50 p-4 rounded-md shadow-sm">
          <label htmlFor="amount" className="block text-black font-semibold mb-2">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            required
            className="w-full p-2 border border-green-200 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-400 text-black font-semibold p-2 rounded-md hover:bg-green-500"
        >
          Add transaction
        </button>
      </form>
    );
  }
  