"use client"
import { useEffect, useState } from "react";

export default function Home() {
  const [teacherCount, setTeacherCount] = useState(0);
  const [classCount, setClassCount] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const teachersRes = await fetch("/api/teachers");
      const teachers = await teachersRes.json();
      setTeacherCount(teachers.length);

      const classesRes = await fetch("/api/classes");
      const classes = await classesRes.json();
      setClassCount(classes.length);

      const paymentsRes = await fetch("/api/payments");
      const payments = await paymentsRes.json();
      const total = payments.reduce(
        (sum: number, p: { amount: number }) => sum + p.amount,
        0
      );
      setTotalPayments(total);
    };

    fetchData();
  }, []);

  return (
    <>
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold">Teachers</h3>
          <p className="text-2xl font-bold">{teacherCount}</p>
        </div>
        <div className="p-4 bg-white rounded shadow hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold">Classes</h3>
          <p className="text-2xl font-bold">{classCount}</p>
        </div>
        <div className="p-4 bg-white rounded shadow hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold">Payments</h3>
          <p className="text-2xl font-bold">₹{totalPayments}</p>
        </div>
      </div>
    </>
  );
}
