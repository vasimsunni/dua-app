import { getHadeesData } from "../../../lib/fetchdata";
import Hadees from "../pages/hadees";

export default async function Dua() {

  const allDuaItems = await getHadeesData();

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
          <Hadees items={allDuaItems} />
    </div>
  );
}
