"use client"
import { useEffect, useState } from "react";

export default function UPIForm() {
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const [history, setHistory] = useState<{ id: number; upiId: string; amount: number }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    setLoading(true);
    const res = await fetch("api/payments");
    const data = await res.json();
    setHistory(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!upiId.includes("@") || isNaN(Number(amount))) {
      alert("Enter a valid UPI ID and amount.");
      return;
    }

    const res = await fetch("/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ upiId, amount: Number(amount) }),
    });
    const newPayment = await res.json();
    setHistory((prev) => [...prev, newPayment]);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setUpiId("");
      setAmount("");
    }, 2000);
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">Pay via UPI</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Enter UPI ID (e.g. user@upi)"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Pay Now
        </button>
      </form>

      {success && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded text-center">
          ✅ Payment Successful!
        </div>
      )}

      {/* Payment History */}
      <div className="mt-6">
        <h4 className="text-lg font-bold mb-2">Payment History</h4>
        {loading ? (
          <p>Loading payments...</p>
        ) : history.length === 0 ? (
          <p>No payments yet.</p>
        ) : (
          <ul className="space-y-2">
            {history.map((item) => (
              <li
                key={item.id}
                className="p-2 bg-gray-100 rounded flex justify-between"
              >
                <span>{item.upiId}</span>
                <span>₹{item.amount}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
