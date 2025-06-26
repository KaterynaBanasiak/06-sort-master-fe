import { useState } from "react";
import axios from "axios";

function AddItemForm() {
  const [name, setName] = useState("");
  const [containerId, setContainerId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/items", {
        name,
        containerId: Number(containerId),
      });
      setMessage(`✅ Item added with ID: ${response.data.id}`);
      setName("");
      setContainerId("");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage("❌ Error adding item: " + (error.response?.data?.message || error.message));
      } else {
        setMessage("❌ An unexpected error occurred.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 border-b border-gray-600 pb-2">Add New Item</h2>

      <div className="mb-4">
        <label className="block mb-1 font-semibold" htmlFor="itemName">
          Item Name:
        </label>
        <input
          id="itemName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 rounded border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter item name"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-semibold" htmlFor="containerId">
          Container ID:
        </label>
        <input
          id="containerId"
          type="number"
          value={containerId}
          onChange={(e) => setContainerId(e.target.value)}
          required
          className="w-full px-3 py-2 rounded border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter container ID"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 rounded transition-colors"
      >
        Add Item
      </button>

      {message && <p className="mt-4 text-center">{message}</p>}
    </form>
  );
}

export default AddItemForm;
