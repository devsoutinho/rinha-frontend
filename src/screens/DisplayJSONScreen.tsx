import { JSONFile } from "@src/domain/JSONFile";
import { VirtualizedList } from "@src/components/VirtualizedList/VirtualizedList";
import { parseJSONByLine } from "@src/logic/parseJSON";

interface DisplayJSONScreenProps {
  jsonFile: JSONFile;
}
export function DisplayJSONScreen({ jsonFile }: DisplayJSONScreenProps) {
  if (!jsonFile) return null;

  const fileContent = globalThis[jsonFile.contentGlobalKey];
  const fileContentLines = fileContent.split("\n") as string[];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>{jsonFile.name} [{fileContentLines.length}]</h1>
      <p>{jsonFile.contentGlobalKey}</p>
      <div
        style={{
          width: "100%",
          flex: 1,
        }}
      >
        <VirtualizedList
          data={fileContentLines}
          renderItem={(_, index, data) => (
            <div>{parseJSONByLine(index, data)}</div>
          )}
        />
      </div>
    </div>
  );
}
