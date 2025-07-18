import { getHadeesData } from "../../../lib/fetchdata";
import Hadees from "../pages/hadees";

type HadeesItem = {
  id: number;
  title: string;
  type: string;
  content: string;
  imageData: string;
};


export default async function Dua() {

  const allDuaItems: HadeesItem[] = await getHadeesData();

  console.log(JSON.stringify(allDuaItems));

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
          <Hadees items={allDuaItems} />
    </div>
  );
}
