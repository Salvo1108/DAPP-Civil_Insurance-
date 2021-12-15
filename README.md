# DAPP-Civili_Insurance
Dichiarazione problema:
•	Il cliente accede, carica la documentazione riferente all’incidente e la invia per l’assicurazione. Le notifiche vengono inviate al comando municipale e al perito dell’assicurazione.
•	Il comando municipale effettua il login, verifica la documentazione e approva. Questa approvazione è memorizzata sul Smart Contract;
•	Il perito assicurativo approva i documenti. Questa approvazione è anche memorizzata sullo Smart Contract;
•	Una volta che entrambi approvano, la notifica viene inviata all'amministratore dell'assicurazione.
•	L'amministratore dell'assicurazione può verificare le approvazioni del comando municipale e del perito, dopodiché calcolerà l'importo del reclamo e farà il reclamo.


Il contratto `CivilInsurance.sol` mantiene la logica per questa DApp.
Le pagine web che si trovano nella cartella "Web-client" vengono utilizzate per comunicare con lo smart contract distribuito e consentono anche l'accesso per ogni utente specifico

Applicazione sviluppata per l'esame di Sicurezza Dei Dati all'Università Di Salerno
