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
        address indirizzoCliente;                          //Indirizzo cliente che ha aperto la pratica
        mapping (address => uint256) firme;            //Firme
    }

    //Questo metodo serve per fare un controllo di convalida per quanto riguarda gli indirizzi della polizia e del perito
    modifier signOnly {                                                       
        require (msg.sender == polizia|| msg.sender == perito );
        _;
    }

    constructor() public {
        polizia= msg.sender;
        perito = 0x62D6f59fEf467154F6EbC924F8eC74400076a106;     //assegna un'indirizzo da ganache              
    }
    
    
    // Mapping utile per memorizzare le pratiche
    mapping (uint256=> Pratica) public _pratiche;
    uint256[] public praticheArray;

    event creazionePratica(uint256 ID, string nomeIncidente, string data, string comandoPoliziaMunicipale, uint256 costo);
    event praticaFirmata(uint256 ID, string nomeIncidente, string data, string comandoPoliziaMunicipale, uint256 costo);
    
    // Creazione nuova pratica
    function newPratica(uint256 _ID, string memory _nomeIncidente, string memory _data, string memory _comandoPoliziaMunicipale, uint256 _costo) public{
        Pratica storage _newpratica = _pratiche[_ID];

        // inizializzazione nuova pratica da creare
            _newpratica.indirizzoCliente = msg.sender;
            _newpratica.ID = _ID;
            _newpratica.nomeIncidente = _nomeIncidente;
            _newpratica.data = _data;
            _newpratica.comandoPoliziaMunicipale = _comandoPoliziaMunicipale;
            _newpratica.costo = _costo;
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
