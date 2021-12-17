import React from "react";
import Web3 from 'web3';
import PraticaAssicurativa from "../abis/PraticaAssicurativa.json"

 export default class Assicurazione extends React.Component{


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


   render(){
     return(


      <div className="col-md-12">
      <h3  className="text-center">Pagina Assicurazione</h3>
      <div className="c-list">
      <h2 className="text-center">Campi di approvazione</h2>
        <table class="table table-bordered table-striped">
        <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome Incidente</th>
                  <th>Data</th>
                  <th>Comandante Polizia Municipale</th>
                  <th>Costo</th>
                  <th>Contatore di Firma</th>
                </tr>
             </thead>
          </table>
         </div>
       </div>
     );
   }
 }

