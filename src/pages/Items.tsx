import React, { useEffect, useState } from "react";
import axios from "axios";

type Item = {
  id: number;
  name: string;
  type: string;
  weight: number;
};

const Items = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Item[]>("http://localhost:8080/items")
      .then((res) => setItems(res.data))
      .catch((err) => {
        console.error("Ошибка при загрузке items:", err);
        setError("Ошибка загрузки данных: " + err.message);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Список предметов</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> — {item.type}, {item.weight} кг
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Items;

