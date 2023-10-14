import React from "react";

interface VirtualizedListProps<DataType> {
  data: DataType[];
  renderItem: (item: DataType, index: number, data: DataType[]) => JSX.Element;
}
export function VirtualizedList<DataType>({ data, renderItem }: VirtualizedListProps<DataType>) {
  const containerRef = React.useRef();
  const [offset, setOffset] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const itemHeight = 20;

  React.useLayoutEffect(() => {
    const $container = containerRef.current as HTMLUListElement;
    const windowHeight = window.innerHeight;
    const containerPositions =  $container.getBoundingClientRect();
    
    setLimit(Math.ceil(windowHeight / itemHeight) + 10);
    

    $container.style.height = `${data.length * itemHeight}px`;

    // TODO: Change to intersection observer
    function scrollHandler(e) {
      const scrollPosition = window.scrollY;
      const offset = Math.floor(scrollPosition / itemHeight);
      const limit = Math.ceil(windowHeight / itemHeight);
      const containerMarginTop = `${offset * itemHeight - scrollPosition}px`;
      
      setOffset(() => {
        $container.style.marginTop = containerMarginTop;
        return offset;
      });

      console.log({ scrollPosition, offset, limit, containerMarginTop });
    }

    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    }
  }, []);
  
  return (
    <ul
      ref={containerRef}
    >
      {
      data
      .slice(offset, limit + offset)
      .map((item, index) => {
        return (
          <li
            key={`VirtualizedList__${index}`}
            style={{
              height: itemHeight,
            }}
          >
            {renderItem(item, index, data)}
          </li>
        )
      })}
    </ul>
  );
}
