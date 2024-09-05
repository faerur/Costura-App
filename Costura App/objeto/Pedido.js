class Pedido {
  constructor(id, nomeCliente, telefone, data, observacoes, preco) {
    this.id = id;
    this.nomeCliente = nomeCliente;
    this.telefone = telefone;
    this.data = data;
    this.finalizado = false;
    this.observacoes = observacoes;
    this.preco = preco;
  }
}
export default Pedido;
