var variaveis = ["x1", "x2", "Rs"];
var restricoes = [[2, 4], [5, 8], [1, 0]];
var limites = [250, 460, 44];
var funcaoObjetiva = [-14, -22, "-"];

var qtdVariaveis = variaveis.length - 1;
var qtdRestricoes = restricoes.length;
var colunas = qtdVariaveis + qtdRestricoes;

function inserirVariaveisAuxiliares() {
  var indiceVariavelAuxiliar = qtdVariaveis;
  for (var linha = 0; linha < qtdRestricoes; linha++) {
    indiceVariavelAuxiliar += linha;
    for (var coluna = qtdVariaveis; coluna < colunas; coluna++) {
      if (coluna == indiceVariavelAuxiliar) {
        restricoes[linha][coluna] = 1;
      } else {
        restricoes[linha][coluna] = 0;
      }
    }
    restricoes[linha].push(limites[linha]);
  }
  restricoes[qtdRestricoes - 1][colunas - 1] = 1;
}

function selecionarPivo() {
  var menor = 0;
  var colunaPivo = 0;
  var linhaPivo = 0;
  funcaoObjetiva.forEach((valor, index) => {
    if (valor < menor) {
      menor = valor;
      colunaPivo = index;
    }
  });
  menor = 999999999;
  restricoes.forEach((linha, index) => {
    var resultadoDivisao = limites[index] / linha[colunaPivo];
    if (resultadoDivisao < menor) {
      menor = resultadoDivisao;
      linhaPivo = index;
    }
  });
  console.log(colunaPivo, linhaPivo);
}
inserirVariaveisAuxiliares();
selecionarPivo();
console.log(restricoes);
