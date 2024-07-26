'use client';

import { useState } from "react";
import { transactionOperation } from "../server-actions/transactionOperations";
import EditTransaction from "./EditTransaction";

export default function TransactionItem({ transaction }) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('id', transaction.id);
    await transactionOperation('delete', formData);
    window.location.reload(); // Reload page to reflect changes
  };

  return (
    <div className="bg-green-50 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{transaction.title} ${transaction.amount.toFixed(2)}</h2>
      <p className="text-gray-700">{transaction.description}</p>
      <p className="text-gray-500 text-sm">Created on: {new Date(transaction.created_at).toLocaleDateString()}</p>
      <div className="mt-4 flex space-x-2">
        <form onSubmit={handleDelete} className="flex-grow">
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Delete
          </button>
        </form>
        <EditTransaction transaction={transaction} />
      </div>
    </div>
  );
}
