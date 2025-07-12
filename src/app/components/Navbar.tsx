const Navbar = () => {
  return (
    <header className="w-full bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">TeacherUPI</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Logout
      </button>
    </header>
  );
};

export default Navbar;
