import React from "react";

type ClassType = {
  id?: number;
  name: string;
  teacher: string;
};

type Props = {
  visible: boolean;
  currentClass: Partial<ClassType>;
  onClose: () => void;
  onSave: () => void;
  setCurrentClass: React.Dispatch<React.SetStateAction<Partial<ClassType>>>;
};

export default function ClassModal({
  visible,
  currentClass,
  setCurrentClass,
  onClose,
  onSave,
}: Props) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
        <h4 className="text-lg font-bold mb-4">
          {currentClass.id ? "Edit Class" : "Add Class"}
        </h4>
        <input
          type="text"
          placeholder="Class Name"
          value={currentClass.name || ""}
          onChange={(e) =>
            setCurrentClass({ ...currentClass, name: e.target.value })
          }
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Teacher"
          value={currentClass.teacher || ""}
          onChange={(e) =>
            setCurrentClass({ ...currentClass, teacher: e.target.value })
          }
          className="w-full mb-3 p-2 border rounded"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
