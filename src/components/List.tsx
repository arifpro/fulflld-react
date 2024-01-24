import React, { FC, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Item } from "./Item";
import { SafelyRenderChildren } from "./SafelyRenderChildren";
// import { useScrollPosition } from "../hooks/useScrollPosition";

const ScrollWrapper = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 500px;
  overflow: auto;
`;

const ListWrapper = styled.ul`
  margin: 0;
  padding: 0;
`;

const SearchBox = styled.input`
  margin-bottom: 24px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid black;
  width: 300px;
  height: 50px;
  box-sizing: border-box;
  font-size: 18px;
  font-family: monospace;
`;

interface ListProps {
  items: string[];
}

const List: FC<ListProps> = ({ items }) => {
  // const itemHeight = 30;
  const itemsPerPage = 300;
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  // const scrollPosition = useScrollPosition(containerRef);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(itemsPerPage);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    const filteredItems = items.filter((word) =>
      word.toLowerCase().includes(newSearchTerm.toLowerCase())
    );
    setVisibleItems(filteredItems);
  };

  const fetchMoreData = () => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      const scrollHeight = containerRef.current.scrollHeight;
      const scrollTop = containerRef.current.scrollTop;

      if (scrollHeight - (scrollTop + containerHeight) < 100) {
        const additionalData = items.slice(startIndex, endIndex);
        setVisibleItems((prevItems) => [...prevItems, ...additionalData]);

        console.log("fetch more data", startIndex, endIndex);

        setStartIndex(endIndex);
        setEndIndex(endIndex + itemsPerPage);
      }
    }
  };

  useEffect(() => {
    setVisibleItems(items.slice(startIndex, endIndex));
  }, [items]);

  return (
    <>
      <div>
        <p>Total Data: {items.length}</p>
        <p>Visible Data: {visibleItems.length}</p>
      </div>

      {/* search */}
      <SearchBox
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* data */}
      <ScrollWrapper ref={containerRef} onScroll={fetchMoreData}>
        <ListWrapper>
          <SafelyRenderChildren>
            {visibleItems.map((word) => (
              <Item key={word}>{word}</Item>
            ))}
          </SafelyRenderChildren>
        </ListWrapper>
      </ScrollWrapper>
    </>
  );
};

export default List;
