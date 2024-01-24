import styled from "@emotion/styled";
import React, { FC } from "react";
import { Item } from "./Item";
import { SafelyRenderChildren } from "./SafelyRenderChildren";

const ScrollWrapper = styled.div`
  border: 1px solid black;
  width: 100%;
  width: 100%;
  height: 500px;
  overflow: auto;
`;

const ListWrapper = styled.ul`
  margin: 0;
  padding: 0;
`;

export interface ListProps {
  items: string[];
}

export const List: FC<ListProps> = ({ items, children }) => {
  return (
    <ScrollWrapper>
      <ListWrapper>
        {/**
         * Note: `SafelyRenderChildren` should NOT be removed while solving
         * this interview. This prevents rendering too many list items and
         * potentially crashing the web page. This also enforces an artificial
         * limit (5,000) to the amount of children that can be rendered at one
         * time during virtualization.
         */}
        <SafelyRenderChildren>
          {items.slice(0, 5000).map((word) => (
            <Item key={word}>{word}</Item>
          ))}
        </SafelyRenderChildren>
      </ListWrapper>
    </ScrollWrapper>
  );
};
