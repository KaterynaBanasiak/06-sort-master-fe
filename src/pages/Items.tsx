/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

type Item = {
  id: number;
  name: string;
  containerId: number;
};

const containerStyle = css`
  padding: 20px;
  max-width: 700px;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const titleStyle = css`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #2c3e50;
`;

const errorStyle = css`
  color: #e74c3c;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 600;
`;

const listStyle = css`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(250px,1fr));
  gap: 20px;
`;

const listItemStyle = css`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 16px 20px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.15);
  }
`;

const itemNameStyle = css`
  font-weight: 700;
  font-size: 1.2rem;
  color: #2980b9;
  margin-bottom: 8px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const containerIdStyle = css`
  font-size: 0.9rem;
  color: #7f8c8d;
`;

const emptyStyle = css`
  font-style: italic;
  color: #95a5a6;
  text-align: center;
  margin-top: 40px;
`;

const loadingStyle = css`
  font-weight: 700;
  text-align: center;
  color: #34495e;
`;

const Items = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get<Item[]>("http://localhost:8080/api/items")
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
              <Link to={`/items/${item.id}`} css={itemNameStyle}>
                {item.name}
              </Link>
              <p css={containerIdStyle}>Контейнер #{item.containerId}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Items;
