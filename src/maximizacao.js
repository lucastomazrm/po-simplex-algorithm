let variaveis;
let restricoes;
let limites;
let funcaoObjetiva;

let qtdVariaveis;
let qtdRestricoes;
let colunas;

let trocas;

// Maximizacao = Variavel de Excesso
// Minimizacao = Variavel de Folga

let colunaPivo = 0;
let linhaPivo = 0;

function criaModeloTabular() {
  // Acrescenta as variáveis de excesso/folga
  let indiceVariavelAuxiliar = qtdVariaveis;
  for (let linha = 0; linha < qtdRestricoes; linha++) {
    indiceVariavelAuxiliar += linha;
    for (let coluna = qtdVariaveis; coluna < colunas; coluna++) {
      if (coluna === indiceVariavelAuxiliar) {
        restricoes[linha][coluna] = 1;
      } else {
        restricoes[linha][coluna] = 0;
      }
    }
    restricoes[linha].push(limites[linha]);
  }

  // Insere variavel de excesso/folga na ultima coluna da restrição
  restricoes[qtdRestricoes - 1][colunas - 1] = 1;

  // Insere os 0 na linha da função objetiva
  for (let i = 0; i <= qtdRestricoes; i++) funcaoObjetiva.push(0);

  // Acopla a função objetiva ao modelo tabular
  restricoes.push(funcaoObjetiva);

  // Atualiza a quantidade de linhas e colunas
  qtdRestricoes += 1;
  colunas += 1;
}

function selecionarPivo() {
  let menor = 0;

  // Seleciona a coluna do pivô (menor valor negativo na linha da Funcao Objetiva)
  funcaoObjetiva.forEach((valor, index) => {
    if (valor < menor) {
      menor = valor;
      colunaPivo = index;
    }
  });

  menor = Number.MAX_VALUE;
  restricoes.forEach((linha, index) => {
    // Não calcular com a linha da função objetiva
    if (index !== restricoes.length - 1) {
      // Divide a coluna da restrição pelo valor na mesma linha da coluna do pivô
      let resultadoDivisao = limites[index] / linha[colunaPivo];
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
  let valorPivot = restricoes[linhaPivo][colunaPivo];
  trocas.push([...trocas[trocas.length - 1]]);
  trocas[trocas.length - 1][linhaPivo] = `x${colunaPivo + 1}`;

  if (valorPivot !== 1) {
    // Se o pivô for diferente de 1, divide toda a linha pelo valor dele
    restricoes[linhaPivo] = restricoes[linhaPivo].map(coluna => {
      return coluna / valorPivot;
    });
  }

  // Aplica gauss para as demais linhas
  for (let i = 0; i < qtdRestricoes; i++) {
    // Não operar com a linha do Pivô que já foi modificada no passo anterior
    if (i !== linhaPivo) {
      // Linha = Linha - valorConveniente * linhaPivo
      const valorConveniente = restricoes[i][colunaPivo];
      restricoes[i] = restricoes[i].map((valorColuna, index) => {
        return valorColuna - valorConveniente * restricoes[linhaPivo][index];
      });
    }
  }
}

export function rodar(v, r, l, f) {
  variaveis = v;
  restricoes = r;
  limites = l;
  funcaoObjetiva = f.map(x => x * -1);
  trocas = [[...restricoes.map((v, i) => `x${i + variaveis.length + 1}`)]];

  qtdVariaveis = variaveis.length;
  qtdRestricoes = restricoes.length;
  colunas = qtdVariaveis + qtdRestricoes;

  criaModeloTabular();

  let steps = [];

  return new Promise((resolve, reject) => {
    steps.push([...restricoes]);

    // Condição de Parada: Todos valores da linha funcaoObjetivo positivo
    while (funcaoObjetiva.some(valor => valor < 0)) {
      selecionarPivo();
      aplicarGauss();
      atualizaVariaveis();
      steps.push([...restricoes]);
    }
    resolve([steps, trocas]);
  });
}
