import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";



import { Title } from "./styles";

function App() {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState("");
    const [category, setCategory] = useState("");

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



    function handleDelete(id) {
        axios.delete(`http://localhost:3004/products/${id}`)
            .then(res => {
                setProducts(products.filter(product => product.id !== id));
            })
    }

    function handleSearchDescription(e) {
        e.preventDefault();
        axios.get(`http://localhost:3004/products?${filter ? `description=${filter}` : ""}`)
            .then(res => {
                setProducts(res.data);
              
            })
    }

    function handleSearchCategory(e) {
        e.preventDefault();
        axios.get(`http://localhost:3004/products?${category ? `category=${category}` : ""}`)
            .then(res => {
                setProducts(res.data);
            })
    }



    return (
        
        <div>
            <Navbar></Navbar>
            <Title>
                <h1>Desafio 3</h1>
            </Title>


            <div>
                <form onSubmit={handleSearchDescription}>
                    <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Busca pelo nome"></input>
                    <button >Pesquisar Nome</button>
                </form>



                <div div>
                    <form onSubmit={handleSearchCategory}>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} >
                            <option value=" "> </option>
                            <option value="smartphone">Smartphone</option>
                            <option value="notebook">Notebook</option>
                            <option value="tablet">Tablet</option>
                            <option value="monitore">Monitores</option>
                            <option value="teclado">Teclado</option>
                            <option value="mouse">Mouse</option>
                        </select>

                        <button type="submit" >Pesquisar Categoria</button>
                    </form>
                </div>

                <br></br>

                <Link to={"/edit"}>
                    <button type="button" >Criar</button>
                </Link>


            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Caracteristica Produto</th>
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
                            <td>{product.features}</td>

                            <Link to={`/category/${product.id}`}>
                                <button>Editar</button>
                            </Link>

                            <button onClick={() => handleDelete(product.id)} >Excluir</button>
                            {/* dentro da função do botão eu passo p id */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;