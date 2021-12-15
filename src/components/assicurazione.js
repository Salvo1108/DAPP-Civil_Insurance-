import React from 'react';
//import './insurance.css';

 export default class Assicurazione extends React.Component{
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

