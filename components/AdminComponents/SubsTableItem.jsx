import React, { useState } from "react";

const SubsTableItem = ({ email, mongoId, date, deleteEmail, editEmail }) => {
  const emailDate = new Date(date);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(email);

  const handleSave = () => {
    editEmail(mongoId, value);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setValue(email);
  };

  return (
    <tr className="bg-white border-b text-left">
      <th className="px-6 py-6 font-medium text-gray-900 whitespace-nowrap">
        {isEditing ? (
          <input
            className="border px-2 py-1 text-sm w-full"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSave();
              }
              if (e.key === "Escape") {
                e.preventDefault();
                handleCancel();
              }
            }}
            autoFocus
          />
        ) : (
          email || "No Email"
        )}
      </th>

      <td className="px-6 py-4 hidden sm:block">{emailDate.toDateString()}</td>

      <td className="px-6 py-4">
        {isEditing ? (
          <div className="flex gap-4 items-center">
            <button
              className="text-green-600 hover:underline"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="text-gray-600 hover:underline"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <button
              className="text-blue-600 hover:underline"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="text-red-600 hover:underline"
              onClick={() => deleteEmail(mongoId)}
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default SubsTableItem;
