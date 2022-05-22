import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex justify-around items-center py-5 bg-secondary-color">
      <span className="font-bold text-white">Carteira Virtual</span>
      <button className="logout bg-transparent text-slate-50">
        <Link to="/login">logout</Link>
      </button>
    </header>
  );
}