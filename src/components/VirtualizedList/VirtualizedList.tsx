import React from "react";

interface VirtualizedListProps<DataType> {
  data: DataType[];
  renderItem: (item: DataType, index: number, data: DataType[]) => JSX.Element;
}
export function VirtualizedList<DataType>({ data, renderItem }: VirtualizedListProps<DataType>) {
  const containerRef = React.useRef();
  const itemHeight = 20;
  const [offset, setOffset] = React.useState(0);
  const [screenLimit, setScreenLimit] = React.useState(10);
  const limit = offset + screenLimit;

  React.useLayoutEffect(() => {
    const $container = containerRef.current as HTMLUListElement;
    const windowHeight = window.innerHeight;
    const containerPositions =  $container.getBoundingClientRect();
    const diffFromTopToContainer = containerPositions.top;
    
    setScreenLimit(Math.ceil(windowHeight / itemHeight));
    
    const containerMaxHeight = data.length * itemHeight;
    $container.style.height = `${containerMaxHeight}px`;


    // TODO: Change to intersection observer
    function scrollHandler(e) {

      const scrollPosition = window.scrollY;
      const offset = Math.floor(scrollPosition / itemHeight);
      const limit = Math.ceil(windowHeight / itemHeight);
      
      const containerMarginTop = scrollPosition - diffFromTopToContainer;
      
      setOffset(() => {
        return offset;
      });

      console.log({ scrollPosition, offset, limit });
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
