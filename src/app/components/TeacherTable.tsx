"use client"
import { useEffect, useState } from "react";

type Teacher = {
  id: number;
  name: string;
  subject: string;
  email: string;
};

export default function TeacherTable() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<Partial<Teacher>>({});

  // Fetch teachers from API
  const fetchTeachers = async () => {
    setLoading(true);
    const res = await fetch("/api/teachers");
    const data = await res.json();
    setTeachers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSave = async () => {
    if (!currentTeacher.name || !currentTeacher.subject || !currentTeacher.email) {
      alert("Please fill in all fields");
      return;
    }

    if (currentTeacher.id) {
      // Edit existing teacher
      const updated = teachers.map((t) =>
        t.id === currentTeacher.id ? (currentTeacher as Teacher) : t
      );
      setTeachers(updated);
      // (Optional) API PATCH endpoint here for real DB update
    } else {
      // Add new teacher
      const res = await fetch("/api/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentTeacher),
      });
      const newTeacher = await res.json();
      setTeachers((prev) => [...prev, newTeacher]);
    }
    setShowModal(false);
    setCurrentTeacher({});
  };

  const handleDelete = async (id: number) => {
    await fetch("/api/teachers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTeachers((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="text-xl font-bold">Teachers</h3>
        <button
          onClick={() => { setShowModal(true); setCurrentTeacher({}); }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Teacher
        </button>
      </div>

      {loading ? (
        <p>Loading teachers...</p>
      ) : (
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-2 px-4">Name</th>
              <th className="text-left py-2 px-4">Subject</th>
              <th className="text-left py-2 px-4">Email</th>
              <th className="text-left py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="border-b">
                <td className="py-2 px-4">{teacher.name}</td>
                <td className="py-2 px-4">{teacher.subject}</td>
                <td className="py-2 px-4">{teacher.email}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => { setShowModal(true); setCurrentTeacher(teacher); }}
                    className="bg-yellow-400 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(teacher.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
            <h4 className="text-lg font-bold mb-4">
              {currentTeacher.id ? "Edit Teacher" : "Add Teacher"}
            </h4>
            <input
              type="text"
              placeholder="Name"
              value={currentTeacher.name || ""}
              onChange={(e) => setCurrentTeacher({ ...currentTeacher, name: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Subject"
              value={currentTeacher.subject || ""}
              onChange={(e) => setCurrentTeacher({ ...currentTeacher, subject: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={currentTeacher.email || ""}
              onChange={(e) => setCurrentTeacher({ ...currentTeacher, email: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
