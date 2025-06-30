/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

type Item = {
  id: number;
  name: string;
  type: string;
  weight: number;
};

const cardStyle = css`
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const titleStyle = css`
  font-weight: bold;
  margin-bottom: 4px;
`;

const infoStyle = css`
  color: #555;
`;

const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <div css={cardStyle}>
      <div css={titleStyle}>{item.name}</div>
      <div css={infoStyle}>
        Тип: {item.type}, Вес: {item.weight} кг
      </div>
    </div>
  );
};

export default ItemCard;
