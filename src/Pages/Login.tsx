export function Login() {
  return (
    <div className="flex justify-center h-screen">
      <form action="submit" className="relative py-4 px-10 bg-white">
        <div className="relative top-12 left-6">
          <label htmlFor="e-mail" className="block" >E-mail</label>
          <input placeholder="e-mail" type="text" id="e-mail" className="w-10/12 rounded border border-solid border-slate-200 p-2 my-2 text-lg" />

          <label htmlFor="password" className="block">Senha</label>
          <input placeholder="senha" type="text" id="password" className="w-10/12 rounded border border-solid border-slate-200 p-2 my-2 text-lg" />
        </div>
        <button className="disabled:opacity-60 absolute top-2/3 left-3 w-11/12 py-4 px-8 rounded-full bg-primary-color hover:bg-secondary-color duration-100 text-slate-800 font-bold">
          Login
        </button>
      </form>
    </div>
  );
}