export function Header() {
  return (
    <header className="flex justify-around items-center py-5 mb-8 bg-[#5ace7e]">
      <span className="text-white">Logo</span>
      <button className="logout bg-transparent text-slate-50 font-thin ">logout</button>
    </header>
  );
}