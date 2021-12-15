import React from 'react';
import { BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import Cliente from './cliente'
import Polizia from './adminPolizia'
import Perito from './peritoAssicurazione'
import Assicurazione from './assicurazione'
import './Main.css';

const FullApp = () => (

    <Router>
      <div>
      <header className="App-header">
            <h1 className="App-title text-center">Civil Insurance</h1>
          </header>
        <Route exact path="/" component={Main} />
        <Route path="/cliente" component={Cliente} />
        <Route path="/adminPolizia" component={Polizia} />
        <Route path="/peritoAssicurazione" component={Perito} />
        <Route path="/assicurazione" component={Assicurazione} />
  
      </div>
    </Router>
  );

class Main extends React.Component {
    

    constructor(props) {
        super(props);
        this.state = {
          user:'',
          password:'',
          login:false
        }
      }
      render() {
        return (
          <div className="container container-fluid login-conatiner">
          {this.state.login ? this.state.user === "" ? this.state.password === "cliente"? <Navigate to="/cliente" /> :
    this.state.password === "polizia" ?<Navigate to="/adminPolizia" /> :
    this.state.password === "perito"? <Navigate to="/peritoAssicurazione" />:
    this.state.password === "assicurazione"? <Navigate to="/assicurazione" />:null:null:null}
    <div style={{
                        maxWidth: '300px',
                        margin: '0 auto' }}>
                        <div className="login-form">
                            <form method="post">
                            <h2 className="text-center">Log in</h2>
    
      <div className="form-group">
    
              <select id="selection"  className="form-control">
                <option selected>Seleziona una modalità..</option>
                <option>Cliente</option>
                <option>Polizia Municipale</option>
                <option>Perito assicurativo</option>
                <option>Assicurazione</option>
              </select>
    </div>
    <div className="form-group">
    
              <input type="password"  className="form-control" placeholder="Password" onChange={e => this.setState({password:e.target.value})}  ></input></div>
              <div className="form-group">
    
              <button className="btn btn-primary btn-block" onClick={()=> this.setState({login:true})} >Invia</button></div>
              <div className="clearfix">
                                </div>
                            </form>
            </div>
          </div>
          </div>
        );
      }
}

export default Main;
