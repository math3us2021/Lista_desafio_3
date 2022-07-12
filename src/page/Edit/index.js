
import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";

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
        <div>
          <input placeholder="nome produto" value={description}  onChange={(e) =>setDescription(e.target.value)} ></input>
        </div>

        < div>
            <select value={category} onChange={(e) => setCategory(e.target.value)} >
              <option value=" "> </option>
              <option value="smartphone">Smartphone</option>
              <option value="notebook">Notebook</option>
              <option value="tablet">Tablet</option>
              <option value="monitore">Monitores</option>
              <option value="teclado">Teclado</option>
              <option value="mouse">Mouse</option>
            </select>
        </div>
        <button type="submit" >Adicionar</button>
      </form>



      <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
            </table>

            <table>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id} </td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                            <Link to={"/edit"}>
                                <button>Editar</button>
                            </Link>
                
                            <button onClick={() =>handleDelete(product.id)} >Excluir</button>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    </div>

  );
}

export default App;