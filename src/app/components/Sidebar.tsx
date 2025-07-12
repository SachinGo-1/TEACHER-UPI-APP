import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md p-4 hidden md:block">
      <h2 className="text-2xl font-bold mb-6">TeacherUPI</h2>
      <nav className="flex flex-col space-y-3">
         <Link href="/" className="hover:text-blue-600">Dashboard</Link>
        <Link href="./teachers" className="hover:text-blue-600">Teachers</Link>
         <Link href="./classes" className="hover:text-blue-600">Classes</Link>
        <Link href="./pay" className="hover:text-blue-600">UPI Payments</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
