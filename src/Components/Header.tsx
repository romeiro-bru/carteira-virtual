export function Header() {
  return (
    <header className="flex justify-around items-center py-5 mb-8 bg-secondary-color">
      <span className="text-white">Carteira Virtual</span>
      <button className="logout bg-transparent text-slate-50 font-thin ">logout</button>
    </header>
  );
}