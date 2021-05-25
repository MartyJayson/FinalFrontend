import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import './bootstrap/css/bootstrap.min.css';

function ListAccounts(){
    const[data, setData] = useState([]);
    async function loadAccountData(){
        let response = await fetch("http://localhost:8080/accounts/getAllAccounts");
        let accountData = await response.json();
        setData(accountData);
    }

    useEffect(() =>{
        loadAccountData();
    },[])

    return(
        <div className="container">
            <table className ="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Age</th>
                    <th>Money</th>
                </tr>
                </thead>
                <tbody>
                {data?.map(row=>(
                    <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.username}</td>
                        <td>{row.age}</td>
                        <td>{row.money}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
function ListProducts(){
    const[data, setData] = useState([]);
    async function loadProductData(){
        let response = await fetch("http://localhost:8080/products/getAllProducts");
        let productData = await response.json();
        setData(productData);
    }

    useEffect(() =>{
        loadProductData();
    },[])

    return(
        <div className="container">
            <table className ="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Cost</th>
                    <th>Count</th>
                </tr>
                </thead>
                <tbody>
                {data?.map(row=>(
                    <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.cost}</td>
                        <td>{row.count}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
function AddProduct(){
    const [name, setName] = useState("");
    const [cost, setCost] = useState(0);
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState("");

    const handleNameChange = event =>{
        setName(event.target.value);
    }
    const handleCostChange = event =>{
        setCost(event.target.value);
    }
    const handleCountChange = event =>{
        setCount(event.target.value);
    }
    const handleSubmit = event =>{
        const inputData = {name, cost, count}
        addProduct(inputData)
        setName("");
        setCost(0);
        setCount(0);
        event.preventDefault();
    }
    async function addProduct(data){
        const response = await fetch("http://localhost:8080/products/addProduct",
            {
                method:"POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type":"application/json"
                },
                redirect:"follow",
                referrerPolicy:"no-referrer",
                body:JSON.stringify(data)
            });
        let messData = await response.json();
        setMessage(messData.id?"Data added successfully" : "Error");
        console.log(messData);
    }
    return(
        <div className="container">
            <h1>{message}</h1>
            <form onSubmit={handleSubmit    }>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" className="form-control" value={name} onChange={handleNameChange}/>
                </div>
                <div className="form-group">
                    <label>Cost:</label>
                    <input type="number" className="form-control" value={cost} onChange={handleCostChange}/>
                </div>
                <div className="form-group">
                    <label>Count:</label>
                    <input type="number" className="form-control" value={count} onChange={handleCountChange}/>
                </div>
                <button className="btn btn-success">ADD PRODUCT</button>
            </form>
        </div>
    )
}
function App() {
  return (
    <div className="container">
        <label>Account List from MySQL Database</label>
        <ListAccounts/>
        <label>Product List from MySQL Database</label>
        <ListProducts/>
        <AddProduct/>
    </div>
  );
}

export default App;
