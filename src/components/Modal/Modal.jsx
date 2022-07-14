import React from "react";
import './Modal.css';

import { Table } from "../../page/Home/styles";


export default ({closeModal}) => {


    return (
        <div className="modal">
            <div className="container">
                <button onClick={() => closeModal(false)}>X</button>
                 <div classNameName="content"></div>

                    <Table>
                        <thead>
                            <th>
                                <th>Tamanho</th>
                                <th>Peso</th>
                                <th>Cor</th>
                            </th>
                            <tr>
                            <td>Grande</td>
                            <td>Pequeno</td>
                            <td>Médio</td>
                            </tr>
                        </thead>
                    </Table>

                <button onClick={() => closeModal(false)} type="button" className="btn btn-secondary" >Voltar ao card</button>
            </div>
        </div>
    )
}