import React, { useState } from "react";
import "./App.css";

function App() {
  const [variaveis, setVariaveis] = useState<String[]>([]);
  const [restricoes, setRestricoes] = useState<Number[][]>([]);
  const [limites, setLimites] = useState<Number[]>([]);
  const [objetivo, setObjetivo] = useState("maximizacao");
  var funcaoObjetiva = [-30, -50];

  console.log(restricoes, limites);
  return (
    <div className="container">
      <h2>Calculadora Simplex</h2>
      <div className="form">
        <div>
          <input type="radio" checked={objetivo === "maximizacao"} onChange={(event: any) => {
            setObjetivo("maximizacao")
          }} />
          Maximização
        </div>
        <div>
          <input type="radio" checked={objetivo === "minimizacao"} onChange={(event: any) => {
            setObjetivo("minimizacao")
          }} />
          Minimização
        </div>
        <table >
          <thead>
            <tr>
              <th>Base</th>
              {variaveis.map((value, indexVariavel) => (
                <th key={indexVariavel}>{`x${indexVariavel + 1}`}</th>
              ))}
              <th></th>
              <th>Limite</th>
              <th>
                <button
                  onClick={() => {
                    setVariaveis([...variaveis, "x"]);
                    if (restricoes.length > 0) {
                      restricoes.forEach((r, i) => {
                        restricoes[i].push(0);
                      });
                      setRestricoes([...restricoes]);
                    }
                  }}
                >
                  Adicionar Variável
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {restricoes.map((x, indexRestricao) => (
              <tr key={indexRestricao}>
                <td>{`Restrição ${indexRestricao + 1}`}</td>
                {variaveis.map((y, indexVariavel) => (
                  <td key={indexVariavel}>
                    <input
                      type="number"
                      value={restricoes[indexRestricao][indexVariavel].toString()}
                      onChange={(event: any) => {
                        restricoes[indexRestricao][indexVariavel] = parseFloat(
                          event.target.value
                        );
                        setRestricoes([...restricoes]);
                      }}
                    />
                  </td>
                ))}

                <td className="simplex-indicador">{objetivo === "maximizacao" ? "<=" : ">="}</td>
                <td>
                  <input
                    type="number"
                    value={limites[indexRestricao].toString()}
                    onChange={event => {
                      limites[indexRestricao] = parseFloat(event.target.value);
                      setLimites([...limites]);
                    }}
                  />
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <button
                  onClick={() => {
                    let temp = [];
                    for (let i = 0; i < variaveis.length; i++) temp.push(0);
                    restricoes.push(temp);
                    limites.push(0);
                    setRestricoes([...restricoes]);
                    setLimites([...limites]);
                  }}
                >
                  Adicionar Restrição
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
        <br />
        <button
          onClick={() => {
            console.log(restricoes, limites);
          }}
        >
          Executar Algoritmo
        </button>
      </div>
    </div>
  );
}

export default App;
