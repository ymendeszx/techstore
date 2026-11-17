/**
 * Calcula a taxa de desconto de acordo com a forma de pagamento.
 * @param {string} formaPagamento - Valor do select: "pix", "boleto", "cartao-vista" ou "cartao-parcelado".
 * @returns {number} Taxa de desconto em decimal (ex.: 0.15 equivale a 15%).
 */
function calcularDescontoPagamento(formaPagamento) {
  switch (formaPagamento) {
    case "pix":
      return 0.15;
    case "boleto":
      return 0.10;
    case "cartao-vista":
      return 0.05;
    case "cartao-parcelado":
      return 0;
    default:
      return 0;
  }
}

/**
 * Retorna o valor do frete de acordo com o tipo de entrega.
 * @param {string} tipoEntrega - Valor do select: "retirada", "padrao", "expressa" ou "super-expressa".
 * @returns {number} Valor do frete em reais.
 */
function calcularValorEntrega(tipoEntrega) {
  switch (tipoEntrega) {
    case "retirada":
      return 0;
    case "padrao":
      return 12;
    case "expressa":
      return 25;
    case "super-expressa":
      return 45;
    default:
      return 0;
  }
}

/**
 * Formata um número como moeda em Real brasileiro.
 * @param {number} valor - Valor numérico a ser formatado.
 * @returns {string} Valor formatado, por exemplo "R$ 1.234,56".
 */
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// Pegando os elementos do HTML
const formulario = document.getElementById("form-orcamento");
const painelResultado = document.getElementById("resultado");

// Evento de envio do formulário
formulario.addEventListener("submit", function (event) {
  // Impede o recarregamento da página
  event.preventDefault();

  // Lendo os valores digitados e selecionados
  const valorProduto = parseFloat(document.getElementById("valor").value);
  const formaPagamento = document.getElementById("pagamento").value;
  const tipoEntrega = document.getElementById("entrega").value;

  // Cálculos
  const taxaDesconto = calcularDescontoPagamento(formaPagamento);
  const valorDesconto = valorProduto * taxaDesconto;
  const valorFrete = calcularValorEntrega(tipoEntrega);
  const totalFinal = valorProduto - valorDesconto + valorFrete;

  // Atualizando o DOM
  document.getElementById("res-valor").textContent = formatarMoeda(valorProduto);
  document.getElementById("res-desconto").textContent = formatarMoeda(valorDesconto);
  document.getElementById("res-frete").textContent = formatarMoeda(valorFrete);
  document.getElementById("res-total").textContent = formatarMoeda(totalFinal);

  // Mostrando o painel de resultado
  painelResultado.classList.remove("hidden");
});
