import React from "react";

import { Title } from "../../page/Home/styles";

export default (props) => {


  return (
    <div>
      <ul style={{ background: "#232332" }} className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" href="/">HOME</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/edit">CRIAR</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href=""></a>
        </li>

      </ul>

      <Title>
        <h1>Lista de Produtos</h1>
      </Title>

    </div>
  )
}
