import { Link } from "react-router-dom";

export function Nav() {
  return (
    <nav className="mt-5 bg-white rounded-md shadow-md text-slate-700 text-left">
      <ul className="list-none p-0">
        <Link to="/">
          <li className="py-3 px-5 border-b-2">Compra e Venda</li>
        </Link>
        <Link to="/transactions">
          <li className="py-3 px-5">Transações</li>
        </Link>
      </ul>
    </nav>
  );
}