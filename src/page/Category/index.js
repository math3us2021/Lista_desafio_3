
import React, { useEffect, useState  } from "react";
import axios from "axios";
import { Link, useParams} from "react-router-dom";

import {Table, Criar, Input, Options} from "../Home/styles";
import Navbar from "../../components/Navbar/Navbar";

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3004/products/${id}`)
      .then(res => {
        setCategory(res.data.category); // setCategory está recebendo o valor da categoria 
        setDescription(res.data.description); // setDescription está recebendo o valor da descrição
        console.log(" Effect OK"); 
      })
      .catch(err => {
        console.log("Effect error");
      });
  }, [id]); // quando q ele será executado , se for vazio ... nunca altere o valor do id

  useEffect(() => {
    axios.get("http://localhost:3004/products")
        .then(res => {
            setProducts(res.data);
            console.log("Deu bom");
        })
}, []);



  function handleUpDate(e) {
    e.preventDefault();
    axios.put(`http://localhost:3004/products/${id}`, {
      description: String(description),
      category: String(category)
    }
    ).then(res => {
      // console.log("HandleUpDate");
      setProducts(products.map(products => products.id === id ? res.data : products)); // setProducts está recebendo o valor do produto atualizado e não o produto antigo
      setCategory(""); // setCategory está recebendo o valor vazio
      setDescription("");   // setDescription está recebendo o valor vazio

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

      <form onSubmit={(e)=> handleUpDate(e)}>
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
        <button className="btn btn-outline-success btn-lg" type="submit" >Alterar</button>
        </Criar>
      </form>

      {/* <ul>
        {products.map(product => (
          <li key={product.id}>
            <h1>{product.id}</h1>
          </li>
        ))}
      </ul> */}


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