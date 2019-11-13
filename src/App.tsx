import React, { useState, useEffect } from "react";
import "./App.css";
import { rodar } from "./script";

function App() {

  const [variaveis, setVariaveis] = useState<any[]>(["x1", "x2"]);
  const [restricoes, setRestricoes] = useState<any[][]>([[2, 4], [5, 8], [1, 0]]);
  const [limites, setLimites] = useState<any[]>([250, 460, 44]);
  const [objetivo, setObjetivo] = useState("maximizacao");
  const [funcaoObjetiva, setFuncaoObjetiva] = useState<any[]>([14, 22]);

  const [steps, setSteps] = useState([]);

  if (steps.length === 0) {
    return (
      <div className="container">
        <h2>Calculadora Simplex</h2>
        <div className="form">
          <div>
            <input type="radio" checked={objetivo === "maximizacao"} onChange={() => {
              setObjetivo("maximizacao")
            }} />
            Maximização
        </div>
          <div>
            <input type="radio" checked={objetivo === "minimizacao"} onChange={() => {
              setObjetivo("minimizacao")
            }} />
            Minimização
        </div>
          <table>
            <thead>
              <tr>
                <th>Base</th>
                {variaveis.map((value: any, indexVariavel: any) => (
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
                        restricoes.forEach((r: any, i: any) => {
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
              {restricoes.map((x: any, indexRestricao: any) => (
                <tr key={indexRestricao}>
                  <td>{`Restrição ${indexRestricao + 1}`}</td>
                  {variaveis.map((y: any, indexVariavel: any) => (
                    <td key={indexVariavel}>
                      <input
                        type="number"
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
                      type="number"
                      value={limites[indexRestricao]}
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
                {variaveis.map((value: any, index: any) => (
                  <th key={index}>{`x${index + 1}`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Max Z</td>
                {variaveis.map((value: any, index: any) => (
                  <td key={index}>
                    <input
                      type="number"
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
            onClick={() => rodar(variaveis, restricoes, limites, funcaoObjetiva).then((steps) => {
              setSteps(steps);
            })}
          >
            Executar Algoritmo
        </button>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <h2>Calculadora Simplex</h2>

    </div>
  );
}

export default App;
