import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


import Navbar from "../../components/Navbar/Navbar";
import { Table, Criar, Input, Options } from "../Home/styles";

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [caracteristica, setCaracteristica] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3004/products")
      .then((res) => {
        setProducts(res.data);
        console.log("Deu bom");
      })
      .catch((err) => {
        console.log("Deu ruim");
      });
  }, []);

  // useEffect(() => {
  //   console.log("Effect OK");
  // }, [category]);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3004/products", {
        description: String(description),
        category: String(category),
        caracteristica: 
          {
            tamanho : String(caracteristica.tamanho),
            cor : String(caracteristica.cor),
            peso : String(caracteristica.peso),
            sistemaOperacional : String(caracteristica.sistemaOperacional),
          },
        
      })
      .then((res) => {
        setProducts([...products, res.data]);
        console.log (caracteristica);
      });
  }

  function handleDelete(id) {
    axios.delete(`http://localhost:3004/products/${id}`).then((res) => {
      setProducts(products.filter((product) => product.id !== id));
    });
  }

  function Caracteristica() {
    if (
      category === "smartphone" ||
      category === "notebook" ||
      category === "tablet"
    ) {
      return (
        <div>




      <div className="card" style={{width: "18rem;"}}>
        <div className="card-header">
          Destaque
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><input type="text" value={caracteristica.tamanho} onChange={(e)=> setCaracteristica({...caracteristica, tamanho: e.target.value})}   placeholder="Digite o tamanho"></input></li>

          <li className="list-group-item"><input  value={caracteristica.peso} onChange={(e)=> setCaracteristica({...caracteristica, peso: e.target.value})} placeholder="Digite o peso"></input></li>
          
          <li className="list-group-item"> <input value={caracteristica.cor} onChange={(e)=> setCaracteristica({...caracteristica, cor: e.target.value})}placeholder="Digite a cor"></input></li>

          <li className="list-group-item"> <input value={caracteristica.sistemaOperacional} onChange={(e)=> setCaracteristica({...caracteristica, sistemaOperacional: e.target.value})}placeholder="Sistema operacional"></input></li>
          <li className="list-group-item"></li>
          
          <li className="list-group-item"></li>
         

{/* 
          setCaracteristica(
{
....caracteristica,
tamanho: e.target.value
}
) */}

        </ul>
         </div>


        
        </div>
      );
    } if (category === "monitore" ||
      category === "teclado" ||
      category === "mouse") {
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th>Lista 2</th>
                <th>Peso</th>
                <th>Cor</th>
                <th>Sistema Operacional</th>
              </tr>
              <td>
                <input ></input>
              </td>
              <td>
                <input></input>
              </td>
              <td>
                <input></input>
              </td>
              <td>
                <input></input>
              </td>

              <td></td>
              <td></td>
            </thead>
          </table>
        </div>
      );
    } else {
      return (
        null
      );
    }
  }



  return (
    <div className="App">
      <Navbar></Navbar>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Criar>
          <Input
            placeholder="nome produto"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Criar>

        <Options>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value=" "> </option>
            <option value="smartphone">Smartphone</option>
            <option value="notebook">Notebook</option>
            <option value="tablet">Tablet</option>
            <option value="monitore">Monitores</option>
            <option value="teclado">Teclado</option>
            <option value="mouse">Mouse</option>
          </select>
        </Options>

        {Caracteristica()}
        <Criar>
          <button
            className="btn btn-outline-success btn-lg"
            type="submit">
            + Adicionar
          </button>
        </Criar>
      </form>


      <div>
        <Table>
          <tbody>
            <th>
              <th>ID</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Caracteristica Produto</th>
              <th>Editar</th>
              <th>Excluir</th>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id} </td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>
                    <button type="button" className="btn btn-link">
                      Caracteristicas
                    </button>
                  </td>
                  {/* <Link to={<Modal></Modal>}>
                                <td>Caracteristica</td>
                            </Link> */}
                  <td>
                    <Link to={`/category/${product.id}`}>
                      <button type="button" className="btn btn-warning">
                        Editar
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(product.id)}
                    >
                      Excluir
                    </button>
                    {/* dentro da função do botão eu passo p id */}
                  </td>
                </tr>
              ))}
            </th>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;
