import React, { useState } from "react";
import "./App.css";

function App() {
  const [variaveis, setVariaveis] = useState<String[]>([]);
  const [restricoes, setRestricoes] = useState<Number[][]>([]);
  const [limites, setLimites] = useState<Number[]>([]);
  const [objetivo, setObjetivo] = useState("maximizacao");
  const [funcaoObjetiva, setFuncaoObjetiva] = useState<Number[]>([]);

  console.log(restricoes, limites, funcaoObjetiva);
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
                    setFuncaoObjetiva([...funcaoObjetiva, 0])
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
                      type="text"
                      value={restricoes[indexRestricao][indexVariavel].toString()}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        restricoes[indexRestricao][indexVariavel] = parseFloat(event.target.value);
                        setRestricoes([...restricoes]);
                      }}
                    />
                  </td>
                ))}

                <td className="simplex-indicador">{objetivo === "maximizacao" ? "<=" : ">="}</td>
                <td>
                  <input
                    type="text"
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
        <h5>Função Objetiva</h5>
        <table>
          <thead>
            <tr>
              <th></th>
              {variaveis.map((value, index) => (
                <th key={index}>{`x${index + 1}`}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Max Z</td>
              {variaveis.map((value, index) => (
                <td key={index}>
                  <input
                    type="text"
                    value={funcaoObjetiva[index].toString()}
                    onChange={event => {
                      funcaoObjetiva[index] = parseFloat(event.target.value);
                      setFuncaoObjetiva([...funcaoObjetiva]);
                    }}
                  />
                </td>
              ))}
            </tr>
          </tbody>
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
