'use client';
import { useState } from "react";
import { transactionOperation } from "../server-actions/transactionOperations";

export default function TransactionForm() {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    await transactionOperation('add', formData);
    setShowModal(false);
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-400 text-black font-semibold p-2 rounded-md hover:bg-green-500"
      >
        Add Transaction
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <span
              onClick={() => setShowModal(false)}
              className="text-black cursor-pointer float-right text-2xl font-bold"
            >
              &times;
            </span>
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
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
                  step="0.01"
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
          </div>
        </div>
      )}
    </div>
  );
}
