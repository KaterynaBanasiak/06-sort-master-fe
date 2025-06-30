import { useState } from "react";
import type { Container } from "../pages/Containers";


interface ContainerListProps {
  containers: Container[];
  error: string | null;
  message: string | null;
  deleteContainer: (id: string) => void;
  addItemToContainer: (containerId: string, itemName: string) => void;
}

const ContainerList: React.FC<ContainerListProps> = ({
  containers,
  error,
  message,
  deleteContainer,
  addItemToContainer,
}) => {
  const [newItems, setNewItems] = useState<Record<string, string>>({});

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Rubbish Containers</h2>

      {message && (
        <div className="mb-4 text-sm text-green-600 bg-green-100 p-2 rounded">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
          {error}
        </div>
      )}

      <ul className="space-y-6">
        {containers.map((container) => (
          <li
            key={container.id}
            className="relative p-4 rounded-lg shadow-md text-white"
            style={{ backgroundColor: container.color }}
          >
            <h3 className="text-xl font-bold">{container.name}</h3>
            <p className="text-sm">{container.description}</p>

            {/* Delete button */}
            <button
              onClick={() => deleteContainer(container.id)}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-sm text-white px-3 py-1 rounded"
            >
              Remove
            </button>

            {/* Add new item */}
            <input
              type="text"
              placeholder="New item name"
              value={newItems[container.id] || ""}
              onChange={(e) =>
                setNewItems((prev) => ({ ...prev, [container.id]: e.target.value }))
              }
              className="mt-4 w-full p-2 rounded text-black"
            />
            <button
              onClick={() => {
                addItemToContainer(container.id, newItems[container.id] || "");
                setNewItems((prev) => ({ ...prev, [container.id]: "" }));
              }}
              className="mt-2 bg-white text-black px-4 py-1 rounded hover:bg-gray-200"
            >
              Add Item
            </button>

            {/* List of items */}
            {container.items?.length > 0 && (
              <ul className="mt-4 list-disc list-inside text-white text-sm">
                {container.items.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContainerList;

