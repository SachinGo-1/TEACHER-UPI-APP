"use client"
import { useEffect, useState } from "react";
import ClassTable from "./../components/ClassTable";
import ClassModal from "../components/ClassModal";

type ClassType = {
  id: number;
  name: string;
  teacher: string;
};

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentClass, setCurrentClass] = useState<Partial<ClassType>>({});

  const fetchClasses = async () => {
    setLoading(true);
    const res = await fetch("/api/classes");
    const data = await res.json();
    setClasses(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleSave = async () => {
    if (!currentClass.name || !currentClass.teacher) {
      alert("Please fill in all fields");
      return;
    }

    if (currentClass.id) {
      // TODO: Add PUT/PATCH support
      setClasses((prev) =>
        prev.map((c) => (c.id === currentClass.id ? (currentClass as ClassType) : c))
      );
    } else {
      const res = await fetch("/api/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentClass),
      });
      const newClass = await res.json();
      setClasses((prev) => [...prev, newClass]);
    }

    setShowModal(false);
    setCurrentClass({});
  };

  const handleDelete = async (id: number) => {
    await fetch("/api/classes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setClasses((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Classes</h2>
        <button
          onClick={() => {
            setShowModal(true);
            setCurrentClass({});
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Class
        </button>
      </div>

      {loading ? (
        <p>Loading classes...</p>
      ) : (
        <ClassTable
          classes={classes}
          onEdit={(c) => {
            setShowModal(true);
            setCurrentClass(c);
          }}
          onDelete={handleDelete}
        />
      )}

      <ClassModal
        visible={showModal}
        currentClass={currentClass}
        setCurrentClass={setCurrentClass}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      />
    </>
  );
}
