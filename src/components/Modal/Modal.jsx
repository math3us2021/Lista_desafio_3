import React, { useState, useEffect } from "react";
import axios from "axios";
import './Modal.css';
//import { useParams } from "react-router-dom";

import Button from '@mui/material/Button';


// export default ( props) => {
export default ({ closeModal, id }) => {


    const [products, setProducts] = useState({});
    console.log(id);


    useEffect(() => {

        if (id) {
            axios.get(`http://localhost:3004/products/${id}`)
                .then(res => {
                    setProducts(res.data);
                    console.log(" Effect OK");
                })
                .catch(err => {
                    console.log("Effect error");
                }
                );
        }
    }
        , [id]);


    return (
        <div className="modal">
            <div classNameName="container">

                <div className="modal">
                    <div className="container">

                    <button className="btn btn-danger" onClick={() => closeModal(false)}>X</button>

                        <div className="tabela">
                            <div className="card" style={{ width: "18rem;" }}>
                                <div className="card-header">
                                    Caracteristicas do produto
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Tamanho: <strong>{products.caracteristica?.tamanho}</strong></li>
                                    <li className="list-group-item">Tamanho: <strong>{products.caracteristica?.cor}</strong></li>
                                    <li className="list-group-item">Tamanho: <strong>{products.caracteristica?.peso}</strong></li>
                                    <li className="list-group-item">Tamanho: <strong>{products.caracteristica?.sistemaOperacional}</strong></li>
                               
                              
                                </ul>
                            </div>
                        </div>

                        <div className="modalButton">          
                            

                            <button className="btn btn-primary" onClick={() => closeModal(false)} type="button"  >Voltar ao card</button>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    )
}