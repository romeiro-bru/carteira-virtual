import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex justify-around items-center py-5 bg-secondary-color">
      <span className="font-bold text-white">
        <Link to="/">
          Carteira Virtual
        </Link>
      </span>
      <Link to="/login">
        <button className="logout bg-transparent text-slate-50">
          logout
        </button>
      </Link>
    </header>
  );
}