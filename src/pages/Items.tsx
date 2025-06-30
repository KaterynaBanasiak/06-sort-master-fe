/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { css } from "@emotion/react";

type Item = {
  id: number;
  name: string;
  containerId: number;
};

const containerStyle = css`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
  font-family: Arial, sans-serif;
`;

const titleStyle = css`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const errorStyle = css`
  color: red;
  margin-bottom: 1rem;
  text-align: center;
`;

const listStyle = css`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const listItemStyle = css`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  &:last-of-type {
    border-bottom: none;
  }
`;

const emptyStyle = css`
  font-style: italic;
  color: #666;
  text-align: center;
`;

const loadingStyle = css`
  font-weight: bold;
  text-align: center;
`;

const Items = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get<Item[]>("http://localhost:8080/api/items") // исправленный путь
      .then((res) => {
        setItems(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке items:", err);
        setError("Ошибка загрузки данных: " + err.message);
        setItems([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div css={containerStyle}>
      <h1 css={titleStyle}>Список предметов</h1>

      {loading && <p css={loadingStyle}>Загрузка...</p>}
      {error && <p css={errorStyle}>{error}</p>}
      {!loading && !error && items.length === 0 && (
        <p css={emptyStyle}>Список пуст</p>
      )}
      {!loading && !error && items.length > 0 && (
        <ul css={listStyle}>
          {items.map((item) => (
            <li key={item.id} css={listItemStyle}>
              <strong>{item.name}</strong> — контейнер #{item.containerId}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Items;
