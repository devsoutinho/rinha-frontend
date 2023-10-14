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
    
    setScreenLimit(Math.ceil(windowHeight / itemHeight));
    

    $container.style.height = `${data.length * itemHeight}px`;

    // TODO: Change to intersection observer
    function scrollHandler(e) {
      const diffFromTopToContainer = containerPositions.top;
      const scrollPosition = window.scrollY;
      const offset = Math.floor(scrollPosition / itemHeight);
      const limit = Math.ceil(windowHeight / itemHeight);
      
      const containerMarginTop = scrollPosition - diffFromTopToContainer;
      
      setOffset(() => {
        $container.style.marginTop = `${containerMarginTop < 0 ? 0 : containerMarginTop}px`;
        return offset;
      });

      console.log({ scrollPosition, offset, limit, containerMarginTop });
    }

    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    }
  }, []);

  console.log(
    offset,
    limit,
    data
    .slice(offset, limit)
  );
  
  return (
    <ul
      ref={containerRef}
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
