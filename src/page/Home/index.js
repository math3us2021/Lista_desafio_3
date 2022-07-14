import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

import Navbar from "../../components/Navbar/Navbar";
import Modal from "../../components/Modal/Modal";


import { Input, Table, Search, Criar, SearchName } from "./styles";


function App() {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState("");
    const [category, setCategory] = useState("");
    const [openModal, setOpenModal] = useState(false);

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


    function delet(id) {
        Swal.fire({
            title: 'Você deseja excluir o arquivo? Após a exclusão não será possível recuperar o arquivo.',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Excluir',
            denyButtonText: `Manter arquivo`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Item Excluido!', '', 'success');
                handleDelete(id);
            } else if (result.isDenied) {
                Swal.fire('Arquivo salvo', '', 'info')
            }
        })
    }

    function handleDelete(id) {
        axios.delete(`http://localhost:3004/products/${id}`)
            .then(res => {
                setProducts(products.filter(product => product.id !== id));

            })
    }



    function handleSearchCategory(e) {
        e.preventDefault();
        axios.get(`http://localhost:3004/products?${category ? `category=${category}` : ""}`)
            .then(res => {
                setProducts(res.data);
            })
    }


    function handleSearchDescription(e) {
        e.preventDefault();
        axios.get(`http://localhost:3004/products?${filter ? `description=${filter}` : ""}`)
            .then(res => {
                setProducts(res.data);
            })
    }

    return (

        <div>
            <Navbar></Navbar>

            <div>

                <SearchName onSubmit={handleSearchDescription}>
                    <Input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Busca pelo nome"></Input>
                    <button type="submit" className="btn btn-primary">Pesquisar Nome   </button>
                </SearchName>




                <div>
                    <Search onSubmit={handleSearchCategory}>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} >
                            <option value=" "> </option>
                            <option value="smartphone">Smartphone</option>
                            <option value="notebook">Notebook</option>
                            <option value="tablet">Tablet</option>
                            <option value="monitore">Monitores</option>
                            <option value="teclado">Teclado</option>
                            <option value="mouse">Mouse</option>
                        </select>

                        <button type="submit" className="btn btn-primary" >Pesquisar Categoria</button>
                    </Search>
                </div>


                <Criar>
                    <Link to={"/edit"}>
                        <button type="button" className="btn btn-outline-success btn-lg">+ Criar novo Produto</button>
                    </Link>
                </Criar>

            </div>

            <button type="button" className="btn btn-link" onClick={() => setOpenModal(true)}   >Caracteristicas</button>
            {openModal && <Modal closeModal={setOpenModal} />}


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
                                    <button type="button" className="btn btn-link" onClick={() => setOpenModal(true)}   >Caracteristicas</button>
                                    {openModal && <Modal closeModal={setOpenModal} />}
                                </td>

                                <td>
                                    <Link to={`/category/${product.id}`}>
                                        <button type="button" className="btn btn-warning">Editar</button>
                                    </Link>
                                </td>
                                
                                <td>
                                    <button type="button" className="btn btn-danger" onClick={() => delet(product.id)} >Excluir</button>
                                    {/* dentro da função do botão eu passo p id */}
                                </td>
                            </tr>
                        ))}
                    </th>
                </tbody>
            </Table>
        </div>
    );
}

export default App;