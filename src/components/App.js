import React, { Component } from 'react';
import Web3 from 'web3'
import PraticaAssicurativa from '../abis/PraticaAssicurativa.json'
import Main from './Main'

class App extends Component {

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
    super(props)
    this.state = {
      loading: true
    }

  }


  render() {
    return (
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main/>
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
