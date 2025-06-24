import React, { useEffect, useState } from "react";

interface ContainerItem {
  id: string;
  name: string;
}

interface Container {
  id: string;
  color: string;
  name: string;
  description: string;
  items: ContainerItem[];
}

const ContainerList = () => {
  const [containers, setContainers] = useState<Container[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [newItems, setNewItems] = useState<Record<string, string>>({});

  // Загрузка контейнеров
  useEffect(() => {
    fetch("/api/containers")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch containers");
        return res.json();
      })
      .then(setContainers)
      .catch(() => setError("Error loading containers."));
  }, []);

  // Удаление контейнера
  const handleDelete = async (id: string) => {
    setError(null);
    setMessage(null);

    try {
      const res = await fetch(`/api/containers/${id}`, { method: "DELETE" });

      if (!res.ok) throw new Error("Failed to delete container");

      setContainers((prev) => prev.filter((c) => c.id !== id));
      setMessage("Container deleted successfully.");
    } catch {
      setError("Failed to delete container.");
    }
  };

  // Добавление предмета в контейнер
  const handleAddItem = async (containerId: string) => {
    const itemName = newItems[containerId]?.trim();
    if (!itemName) return;

    try {
      const res = await fetch(`/api/containers/${containerId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: itemName }),
      });

      if (!res.ok) throw new Error("Failed to add item");

      const newItem: ContainerItem = await res.json();

      setContainers((prev) =>
        prev.map((container) =>
          container.id === containerId
            ? { ...container, items: [...(container.items || []), newItem] }
            : container
        )
      );

      setNewItems((prev) => ({ ...prev, [containerId]: "" }));
    } catch {
      setError("Failed to add item.");
    }
  };

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

            {/* Кнопка удаления */}
            <button
              onClick={() => handleDelete(container.id)}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-sm text-white px-3 py-1 rounded"
            >
              Remove
            </button>

            {/* Добавление предмета */}
            <input
              type="text"
              placeholder="New item name"
              value={newItems[container.id] || ""}
              onChange={(e) =>
                setNewItems((prev) => ({
                  ...prev,
                  [container.id]: e.target.value,
                }))
              }
              className="mt-4 w-full p-2 rounded text-black"
            />
            <button
              onClick={() => handleAddItem(container.id)}
              className="mt-2 bg-white text-black px-4 py-1 rounded hover:bg-gray-200"
            >
              Add Item
            </button>

            {/* Отображение списка предметов */}
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
