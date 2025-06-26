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
    <form onSubmit={handleSubmit}>
      <h2>Add New Item</h2>
      <div>
        <label>Item Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Container ID:</label>
        <input
          type="number"
          value={containerId}
          onChange={(e) => setContainerId(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Item</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default AddItemForm;
