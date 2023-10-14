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
    console.log(containerPositions);
    setLimit(Math.ceil(windowHeight / itemHeight));
    

    $container.style.height = `${data.length * itemHeight}px`;

    // TODO: Change to intersection observer
    function scrollHandler(e) {
      // set offset based on scroll position
      const scrollPosition = window.scrollY;
      const offset = Math.floor(scrollPosition / itemHeight);
      setOffset(offset);
      // set limit based on scroll position
      const windowHeight = window.innerHeight;
      const containerPositions =  $container.getBoundingClientRect();
      console.log(containerPositions);
      setLimit(Math.ceil(windowHeight / itemHeight));

      // update margin top of $container based in scroll position
    }

    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    }
  }, []);
  
  return (
    <ul ref={containerRef}
    >
      {
      data
      .slice(offset, limit)
      .map((item, index) => {
        return (
          <li
            key={`VirtualizedList__${index}`}
            style={{
              whiteSpace: "pre",
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
