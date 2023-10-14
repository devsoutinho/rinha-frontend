import { JSONFile } from "@src/domain/JSONFile";
import { VirtualizedList } from "@src/components/VirtualizedList/VirtualizedList";

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
          whiteSpace: "pre",
        }}
      >
        <VirtualizedList
          data={fileContentLines}
          renderItem={(line) => (
            <div>{line}</div>
          )}
        />
      </div>
    </div>
  );
}
