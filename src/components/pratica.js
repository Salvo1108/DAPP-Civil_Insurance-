import web3 from "./web3";

const address = "0x29044ca950147a55ad4e6c8868f650713f932dd6";

const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_nomeIncidente",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_data",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "comandoPoliziaMunicipale",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "costo",
				"type": "uint256"
			}
		],
		"name": "newPratica",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "ID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "nomeIncidente",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "data",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "comandoPoliziaMunicipale",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "costo",
				"type": "uint256"
			}
		],
		"name": "creazonePratica",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "ID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "nomeIncidente",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "data",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "comandoPoliziaMunicipale",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "costo",
				"type": "uint256"
			}
		],
		"name": "praticaFirmata",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ID",
				"type": "uint256"
			}
		],
		"name": "signRecord",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "_pratiche",
		"outputs": [
			{
				"internalType": "address",
				"name": "indirizzoCliente",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "ID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "nomeIncidente",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "data",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "comandoPoliziaMunicipale",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "costo",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isValue",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "firmaCount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "praticheArray",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

export default new web3.eth.Contract(abi, address);
