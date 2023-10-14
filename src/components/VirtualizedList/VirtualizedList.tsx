import React from "react";

interface VirtualizedListProps<DataType> {
  data: DataType[];
  renderItem: (item: DataType, index: number, data: DataType[]) => JSX.Element;
}
export function VirtualizedList<DataType>({ data, renderItem }: VirtualizedListProps<DataType>) {
  const containerRef = React.useRef();
  const threshold = 10;
  const itemHeight = 20;
  const [offset, setOffset] = React.useState(0);
  const [screenLimit, setScreenLimit] = React.useState(10 + threshold);
  const limit = offset + screenLimit;

  React.useLayoutEffect(() => {
    const $container = containerRef.current as HTMLUListElement;
    const windowHeight = window.innerHeight;
    
    setScreenLimit(Math.ceil(windowHeight / itemHeight) + threshold);
    
    const containerMaxHeight = data.length * itemHeight;
    $container.style.height = `${containerMaxHeight}px`;

    function scrollHandler() {
      const scrollPosition = window.scrollY;
      const currentOffset = Math.floor(scrollPosition / itemHeight) - threshold;
      const offset = Math.max(0, currentOffset);
      setOffset(offset);
    }

    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    }
  }, []);

  return (
    <ul
      ref={containerRef}
      style={{
        position: "relative",
      }}
    >
      {
      data
      .slice(offset, limit)
      .map((item, index) => {
        const itemIndex = index + offset;
        return (
          <li
            key={`VirtualizedList__${index}`}
            style={{
              position: "absolute",
              top: `${itemIndex * itemHeight}px`,
              height: itemHeight,
            }}
          >
            {renderItem(item, itemIndex, data)}
          </li>
        )
      })}
    </ul>
  );
}
