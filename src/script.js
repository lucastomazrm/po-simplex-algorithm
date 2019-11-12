// // Teste 1
var variaveis = ["x1", "x2", "Rs"];
var restricoes = [
  [2, 4],
  [5, 8],
  [1, 0]
];
var limites = [250, 460, 44];
var funcaoObjetiva = [-14, -22];

// Maximizacao = Variavel de Excesso
// Minimizacao = Variavel de Folga

var qtdVariaveis = variaveis.length;
var qtdRestricoes = restricoes.length;
var colunas = qtdVariaveis + qtdRestricoes;

var colunaPivo = 0;
var linhaPivo = 0;

function criaModeloTabular() {
  // Acrescenta as variáveis de excesso/folga
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

  // Insere variavel de excesso/folga na ultima restrição
  restricoes[qtdRestricoes - 1][colunas - 1] = 1;

  // Insere os 0 na linha da função objetiva
  for (var i = 0; i <= qtdRestricoes; i++) funcaoObjetiva.push(0);

  // Acopla a função objetiva ao modelo tabular
  restricoes.push(funcaoObjetiva);

  // Atualiza a quantidade de linhas e colunas
  qtdRestricoes += 1;
  colunas += 1;
}

function selecionarPivo() {
  var menor = 0;

  // Seleciona a coluna do pivô (menor valor negativo)
  funcaoObjetiva.forEach((valor, index) => {
    if (valor < menor) {
      menor = valor;
      colunaPivo = index;
    }
  });

  menor = Number.MAX_VALUE;
  restricoes.forEach((linha, index) => {
    // Não calcular com a linha da função objetiva
    if (index != restricoes.length - 1) {
      // Divide a coluna da restrição pelo valor na mesma linha da coluna do pivô
      var resultadoDivisao = limites[index] / linha[colunaPivo];
      // Seleciona o menor valor positivo resultante da divisão
      if (resultadoDivisao < menor && resultadoDivisao > 0) {
        menor = resultadoDivisao;
        linhaPivo = index;
      }
    }
  });
}

function atualizaVariaveis() {
  funcaoObjetiva = restricoes[restricoes.length - 1];
  limites = restricoes.map(linha => {
    return linha[colunas - 1];
  });
}

function aplicarGauss() {
  var valorPivot = restricoes[linhaPivo][colunaPivo];

  if (valorPivot != 1) {
    // Se o pivô for diferente de 1, divide toda a linha pelo valor dele
    restricoes[linhaPivo] = restricoes[linhaPivo].map(coluna => {
      return coluna / valorPivot;
    });
  }

  // Aplica gauss para as demais linhas
  for (var i = 0; i < qtdRestricoes; i++) {
    // Não operar com a linha do Pivô que já foi modificada no passo anterior
    if (i != linhaPivo) {
      // Linha = Linha - valorConveniente * linhaPivot
      var valorConveniente = restricoes[i][colunaPivo];
      restricoes[i] = restricoes[i].map((valorColuna, index) => {
        return valorColuna - valorConveniente * restricoes[linhaPivo][index];
      });
    }
  }
}

function rodar() {
  criaModeloTabular();

  // Condição de Parada: Todos valores da linha funcaoObjetivo positivo
  while (funcaoObjetiva.some(valor => valor < 0)) {
    selecionarPivo();
    aplicarGauss();
    atualizaVariaveis();
    console.log([...restricoes]);
  }
}
