
import Dua from "../app/pages/dua";
import DuaHeader from "./components/dua-header";

export default async function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 bg-slate-200">
      <main className="flex flex-col gap-[32px] row-start-2 items-center w-full">
        <DuaHeader />
        <Dua/>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center" />
    </div>
  );
}
