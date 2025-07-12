import React from "react";

type ClassType = {
  id: number;
  name: string;
  teacher: string;
};

type Props = {
  classes: ClassType[];
  onEdit: (c: ClassType) => void;
  onDelete: (id: number) => void;
};

export default function ClassTable({ classes, onEdit, onDelete }: Props) {
  return (
    <table className="min-w-full bg-white rounded shadow">
      <thead className="bg-gray-100">
        <tr>
          <th className="text-left py-2 px-4">Class Name</th>
          <th className="text-left py-2 px-4">Teacher</th>
          <th className="text-left py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {classes.map((c) => (
          <tr key={c.id} className="border-b">
            <td className="py-2 px-4">{c.name}</td>
            <td className="py-2 px-4">{c.teacher}</td>
            <td className="py-2 px-4 space-x-2">
              <button
                onClick={() => onEdit(c)}
                className="bg-yellow-400 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(c.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
