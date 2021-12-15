pragma solidity >=0.4.22 <0.9.0;

contract PraticaAssicurativa {

    address private polizia;        //Indirizzo ganache polizia
    address private perito;         //Indirizzo ganache perito

    struct Pratica {
        uint256 ID;             //ID Pratica
        uint256 costo;          //Costo 
        uint256 firmaCount;     //Contatore numero firme sulla pratica
        string nomeIncidente;   //Indentificativo incidente
        string data;            //Data
        string comandoPoliziaMunicipale;        //Nome del comando di polizia municipale che ha in gestione la pratica
        bool isValue;
        address indirizzoCliente;                          //Indirizzo cliente che ha aperto la pratica
        mapping (address => uint256) firme;            //Firme
    }

    //Questo metodo serce per fare un controllo di convalida per quanto riguarda gli indirizzi della polizia e del perito
    modifier signOnly {                                                       
        require (msg.sender == polizia|| msg.sender == perito );
        _;
    }

    constructor() public {
        polizia= msg.sender;
        perito = 0xF6F2F51c07e44efE7BC25E0EC6B332f39d930ac0;     //assegna un'indirizzo da ganache              
    }
    
    
    // Mapping utile per memorizzare le pratiche
    mapping (uint256=> Pratica) public _pratiche;
    uint256[] public praticheArray;

    event creazionePratica(uint256 ID, string nomeIncidente, string data, string comandoPoliziaMunicipale, uint256 costo);
    event praticaFirmata(uint256 ID, string nomeIncidente, string data, string comandoPoliziaMunicipale, uint256 costo);
    
    // Creazione nuova pratica
    function newPratica(uint256 _ID, string memory _nomeIncidente, string memory _data, string memory _comandoPoliziaMunicipale, uint256 _costo) public{
        Pratica storage _newpratica = _pratiche[_ID];

        // inizializzazione nuova oratica da creare
        require(!_pratiche[_ID].isValue);
            _newpratica.indirizzoCliente = msg.sender;
            _newpratica.ID = _ID;
            _newpratica.nomeIncidente = _nomeIncidente;
            _newpratica.data = _data;
            _newpratica.comandoPoliziaMunicipale = _comandoPoliziaMunicipale;
            _newpratica.costo = _costo;
            _newpratica.isValue = true;
            _newpratica.firmaCount = 0;

        praticheArray.push(_ID);
        emit  creazionePratica(_newpratica.ID, _nomeIncidente, _data, _comandoPoliziaMunicipale, _costo);
    }

    // funzione per firmare la pratica
    function firmaPratica(uint256 _ID) signOnly public {
        Pratica storage pratica = _pratiche[_ID];
        
        // Controllo sull'autenticità delle firme
        require(address(0) != pratica.indirizzoCliente);
        require(msg.sender != pratica.indirizzoCliente);
        
        // Non è permesso che la stessa persona firmi più volte
        require(pratica.firme[msg.sender] != 1);

        pratica.firme[msg.sender] = 1;
        pratica.firmaCount++;

        // Controllo se la pratica è stata firmata corretamente da polziia e perito, cosi da procedere con il processo assicurativo
        if(pratica.firmaCount == 2)
            emit  praticaFirmata(pratica.ID, pratica.nomeIncidente, pratica.data, pratica.comandoPoliziaMunicipale, pratica.costo);

    }
}
