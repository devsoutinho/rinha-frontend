import { JSONFile } from "@src/domain/JSONFile";

interface DisplayJSONScreenProps {
  jsonFile: JSONFile;
}
export function DisplayJSONScreen({ jsonFile }: DisplayJSONScreenProps){
  
  console.log('[fileContent]',globalThis.fileContent);

  if (!jsonFile) return null;

  return (
    <div>
      <h1>{jsonFile.name}</h1>
      <p>{jsonFile.contentGlobalKey}</p>
    </div>
  );
}
