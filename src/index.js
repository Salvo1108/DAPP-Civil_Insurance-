import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import PraticaAssicurativa from "./abis/PraticaAssicurativa.json"
import 'bootstrap/dist/css/bootstrap.css'
import Web3 from 'web3'
import Cliente from './components/cliente'
import Polizia from './components/adminPolizia'
import Perito from './components/peritoAssicurazione'
import Assicurazione from './components/assicurazione'
import './Main.css';

const FullApp = () => (

    <Router>
      <div>
      <header className="App-header">
            <h1 className="App-title text-center">Civil Insurance</h1>
          </header>
        <Route exact path="/" component={App} />
        <Route path="/cliente" component={Cliente} />
        <Route path="/adminPolizia" component={Polizia} />
        <Route path="/peritoAssicurazione" component={Perito} />
        <Route path="/assicurazione" component={Assicurazione} />
  
      </div>
    </Router>
  );

  class App extends React.Component {

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
      }
    
      async loadWeb3() {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
      }
    
      async loadBlockchainData() {
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        const networkId = await web3.eth.net.getId()
        const networkData = PraticaAssicurativa.networks[networkId]
        if(networkData) {
          const praticaAssicurativa = web3.eth.Contract(PraticaAssicurativa.abi, networkData.address)
          this.setState({ praticaAssicurativa })
        } else {
          window.alert('Il Contratto pratica assicurativa non è stato rilevato nella rete.')
        }
      }
    

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
          {this.state.login ? this.state.user === "" ? this.state.password === "cliente"? <Redirect to="/cliente" /> :
    this.state.password === "polizia" ?<Redirect to="/adminPolizia" /> :
    this.state.password === "perito"? <Redirect to="/peritoAssicurazione" />:
    this.state.password === "assicurazione"? <Redirect to="/assicurazione" />:null:null:null}
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

ReactDOM.render(<FullApp />, document.getElementById('root'));