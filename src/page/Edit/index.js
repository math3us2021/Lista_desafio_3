import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import {Table, Criar, Input, Options} from "../Home/styles";

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3004/products")
      .then(res => {
        setProducts(res.data);
        console.log("Deu bom");
      })
      .catch(err => {
        console.log("Deu ruim");
      });
  }, []);


  function handleSubmit(e) {
    e.preventDefault();
    axios.post("http://localhost:3004/products", {
      description: String(description),
      category: String(category)
    }
    ).then(res => {
      setProducts([...products, res.data]);
    })
  }

  function handleDelete(id) {
    axios.delete(`http://localhost:3004/products/${id}`)
    .then(res => {
        setProducts(products.filter(product => product.id !== id));
    })
}

  return (
    <div className="App">

    <Navbar></Navbar>
      <form onSubmit={(e)=> handleSubmit(e)}>
        <Criar>
          <Input placeholder="nome produto" value={description}  onChange={(e) =>setDescription(e.target.value)} ></Input>
        </Criar>

        <Options>
            <select value={category} onChange={(e) => setCategory(e.target.value)} >
              <option value=" "> </option>
              <option value="smartphone">Smartphone</option>
              <option value="notebook">Notebook</option>
              <option value="tablet">Tablet</option>
              <option value="monitore">Monitores</option>
              <option value="teclado">Teclado</option>
              <option value="mouse">Mouse</option>
            </select>
        </Options>
        <Criar>
        <button className="btn btn-outline-success btn-lg" type="submit" >+ Adicionar</button>
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
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id} </td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                           <td>
                            <button type="button" className="btn btn-link" >Caracteristicas</button>
                            </td>
                            {/* <Link to={<Modal></Modal>}>
                                <td>Caracteristica</td>
                            </Link> */}
                            <td>
                            <Link to={`/category/${product.id}`}>
                                <button type="button" className="btn btn-warning">Editar</button>
                            </Link>
                            </td>
                            <td>
                            <button type="button" className="btn btn-danger" onClick={() => handleDelete(product.id)} >Excluir</button>
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