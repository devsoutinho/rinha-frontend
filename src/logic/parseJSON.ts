const cache = new Map<number, string>();

export function parseJSONByLine<DataType>(index: number, data: DataType[]) {
  const line = data[index].toString();

  if(cache.has(index)) {
    return cache.get(index);
  }
  cache.set(index, line.toString());

  // TODO: Implement this function
  const isObjectStart = line.trim().includes("{");
  const isObjectEnd = line.trim().includes("}");

  if(isObjectStart) {
    return "0:";
  }
  if(isObjectEnd) {
    return "";
  }

  return line;
}
