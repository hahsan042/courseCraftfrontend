
"use client";

import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_NEXT_URI;

interface Transaction {
  _id: string;
  courseId: any;
  transactionId: string;
  status: string;
  createdAt: string;
}

export default function AdminPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/api/v2/transactions`);
      const data = await res.json();

      setTransactions(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`${BASE_URL}/api/v2/transactions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    fetchTransactions();
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Admin Transactions</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white shadow rounded-xl overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Course</th>
                <th className="p-3 text-left">Transaction ID</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx) => (
               
                
                <tr key={tx._id} className="border-t">
                  <td className="p-3">
                    {tx.courseId?._id || tx.courseId}
                  </td>

                  <td className="p-3 font-mono">
                    {tx.transactionId}
                  </td>

                  <td className="p-3 capitalize">
                    {tx.status}
                  </td>

                  <td className="p-3">
                    {new Date(tx.createdAt).toLocaleString()}
                  </td>

                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => updateStatus(tx._id, "verified")}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Verify
                    </button>

                    <button
                      onClick={() => updateStatus(tx._id, "rejected")}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
               
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

