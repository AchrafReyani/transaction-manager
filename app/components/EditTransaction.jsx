'use client'

import { useState } from "react"

export default function EditTransaction({ transaction }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: transaction.title,
    description: transaction.description,
    amount: transaction.amount
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-400 text-black font-semibold p-2 rounded-md hover:bg-green-500"
      >
        Edit
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
            <form action="updateTransaction" onSubmit={() => setShowModal(false)} className="space-y-4 mt-6">
              <input type="hidden" name="id" value={transaction.id} />
              <div className="bg-green-50 p-4 rounded-md shadow-sm">
                <label htmlFor="title" className="block text-black font-semibold mb-2">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border border-green-200 rounded-md"
                  required
                />
              </div>
              <div className="bg-green-50 p-4 rounded-md shadow-sm">
                <label htmlFor="description" className="block text-black font-semibold mb-2">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-green-200 rounded-md"
                  required
                />
              </div>
              <div className="bg-green-50 p-4 rounded-md shadow-sm">
                <label htmlFor="amount" className="block text-black font-semibold mb-2">Amount</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  step="0.01"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full p-2 border border-green-200 rounded-md"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-400 text-black font-semibold p-2 rounded-md hover:bg-green-500"
              >
                Update Transaction
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
