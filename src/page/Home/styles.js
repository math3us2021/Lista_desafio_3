import styled from "styled-components";

export const Title = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;  

    h1 {
    color: red;
    font-size: 70px;
    font-weight: bold;
    font-family: Oswald;
    box-shadow:10px 5px 5px black;
    };
    
    p{
        color: ${props => props.color ? props.color : "black"};
        font-size: 30px;
       
    }
    `;


    export const Input = styled.input`
    justify-content: center;
    text-align: center;
    background: #232332;
    color: antiquewhite;
    border-radius: 8px;
    border: 5px solid #232332;
    gap: 3rem;
    width: 350px;
    height: 40px;
    align-items: center;
    box-shadow:4px 4px 4px black;



    `;

    export const Table =  styled.table`
    border-collapse: collapse;
    border-radius: 8px;
    border: 2px solid #fff;
    background: gray;
    flex-direction: wrap;
    width: 100%;
    height: 100%;
    box-shadow:4px 4px 4px black;

    th{
        background: #232332;
        color: antiquewhite;
        border-radius: 8px;
        border: 2px solid #fff;
        gap: 3rem;
        justify-content: center;
        text-align: center;  
        
    }

    td{
        border-radius: 20px;
        border: 2px solid #fff;
        width: 350px;
        height: 100%;
        justify-content: center;
        

    `;

    export const Search = styled.form`
    justify-content: center;
    text-align: center;
    display: flex;
    flex-direction: wrap;
    margin: 1rem;
    
    
    select{
        background: #232332;
        color: #fff;
        border-radius: 8px;
        width: 350px;
        box-shadow:4px 4px 4px black;
        text-align: center;
        justify-content: center;
    }


    button {
        margin-left: 1rem;
        width: 180px;
    }
    `;
    export const SearchName = styled.form`
    justify-content: center;
    text-align: center;
    display: flex;
    flex-direction: wrap;
    margin: 1rem;
    


    button {
        margin-left: 1rem;
        width: 180px;
    }
    `;



    export const Criar = styled.div`
    justify-content: center;
    text-align: center;
    display: flex;
    flex-direction: wrap;
    margin: 1rem;
    `;

    export const Options = styled.div`

    justify-content: center;
    text-align: center;
    display: flex;
    flex-direction: wrap;
    margin: 1rem;

    select{
        background: #232332;
        color: #fff;
        border-radius: 8px;
        width: 350px;
        height: 40px;
        text-align: center;
        justify-content: center;
    }

    `;