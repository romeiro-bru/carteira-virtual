export function Form() {
  return (
    <form>
      <label htmlFor="bitcoin-venda">Você comprará:</label>
      <input type="text" />
      <span>BTC</span>

      <label htmlFor="busd-venda">Você comprará:</label>
      <input type="text" />
      <span>BUSD</span>

      <button>Comprar</button>
    </form>
  );
}