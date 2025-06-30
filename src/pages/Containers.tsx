import { useEffect, useState } from "react";
import CreateContainerForm from "../components/CreateContainerForm";
import ContainerList from "../components/ContainerList";

interface ContainerItem {
  id: string;
  name: string;
}

export interface Container {
  id: string;
  color: string;
  name: string;
  description: string;
  items: ContainerItem[];
}

export default function Containers() {
  const [containers, setContainers] = useState<Container[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchContainers();
  }, []);

  const fetchContainers = async () => {
    setError(null);
    try {
      const res = await fetch("/api/containers");
      if (!res.ok) throw new Error("Failed to fetch containers");
      const data = await res.json();
      setContainers(data);
    } catch {
      setError("Error loading containers.");
    }
  };

  const addContainer = (newContainer: Container) => {
    setContainers((prev) => [...prev, newContainer]);
    setMessage("Container created successfully!");
    setError(null);
  };

  const deleteContainer = async (id: string) => {
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

  const addItemToContainer = async (containerId: string, itemName: string) => {
    setError(null);
    setMessage(null);

    if (!itemName.trim()) return;

    try {
      const res = await fetch(`/api/containers/${containerId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: itemName.trim() }),
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
      setMessage("Item added successfully.");
    } catch {
      setError("Failed to add item.");
    }
  };

  return (
    <div>
      <CreateContainerForm addContainer={addContainer} />
      <ContainerList
        containers={containers}
        error={error}
        message={message}
        deleteContainer={deleteContainer}
        addItemToContainer={addItemToContainer}
      />
    </div>
  );
}
