/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { useParams } from "react-router-dom";
import axios from "axios";

type Item = {
  id: number;
  name: string;
  type: string;
  weight: number;
  containerId: number;
};

type Container = {
  id: number;
  name: string;
  type: string;
};

const wrapperStyle = css`
  max-width: 600px;
  margin: 40px auto;
  padding: 30px 25px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #fefefe;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  color: #333;
`;

const titleStyle = css`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
  color: #222;
`;

const fieldGroup = css`
  margin-bottom: 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

const labelStyle = css`
  font-weight: 600;
  font-size: 1.1rem;
  color: #555;
  display: block;
  margin-bottom: 6px;
`;

const valueStyle = css`
  font-size: 1.2rem;
  color: #111;
`;

const containerTitleStyle = css`
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 36px;
  margin-bottom: 16px;
  color: #444;
  border-bottom: 2px solid #7f8c8d;
  padding-bottom: 6px;
`;

const loadingStyle = css`
  text-align: center;
  font-size: 1.2rem;
  font-style: italic;
  color: #666;
`;

const errorStyle = css`
  color: #b00020;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
`;

const ItemDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [container, setContainer] = useState<Container | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Item>(`http://localhost:8080/api/items/${id}`)
      .then((res) => {
        setItem(res.data);
        return axios.get<Container>(`http://localhost:8080/api/containers/${res.data.containerId}`);
      })
      .then((res) => setContainer(res.data))
      .catch((err) => {
        setError("Ошибка загрузки данных: " + err.message);
      });
  }, [id]);

  if (error) return <p css={[wrapperStyle, errorStyle]}>{error}</p>;
  if (!item) return <p css={[wrapperStyle, loadingStyle]}>Загрузка...</p>;

  return (
    <div css={wrapperStyle}>
      <h1 css={titleStyle}>Детали предмета</h1>

      <div css={fieldGroup}>
        <label css={labelStyle}>Название</label>
        <div css={valueStyle}>{item.name}</div>
      </div>

      <div css={fieldGroup}>
        <label css={labelStyle}>Вес</label>
        <div css={valueStyle}>{item.weight} кг</div>
      </div>

      {container ? (
        <>
          <h2 css={containerTitleStyle}>Контейнер</h2>
          <div css={fieldGroup}>
            <label css={labelStyle}>Название</label>
            <div css={valueStyle}>{container.name}</div>
          </div>
          <div css={fieldGroup} style={{ borderBottom: "none" }}>
            <label css={labelStyle}>Тип</label>
            <div css={valueStyle}>{container.type}</div>
          </div>
        </>
      ) : (
        <p css={loadingStyle}>Загрузка контейнера...</p>
      )}
    </div>
  );
};

export default ItemDetails;
