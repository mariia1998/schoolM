const mysql = require("mysql") ,  Swal = require('sweetalert2');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'gep'
});



function maximize (){
  require('electron').remote.getCurrentWindow().maximize()
}
function minimize (){
  require('electron').remote.getCurrentWindow().minimize()
}
function closewin (){
  require('electron').remote.getCurrentWindow().close()
}


var errors = {
    'ECONNREFUSED':'mysql stopped' ,
    'ER_BAD_DB_ERROR':'DB not exist' ,
    'ER_NO_SUCH_TABLE':'Table not exist' ,
}


connection.connect();
function testConnexion(resultat,erreur) {
  connection.query('SELECT 1 + 1 AS solution', function (error, r, fields) {
    if (error) {console.log(error);if (erreur)erreur(error);/*throw error;*/}
if (resultat) resultat(r);
  });
  // connection.end();
}


function query(query,callback) {
// connection.connect();
connection.query(query, function (error, results, fields) {
  if (error) {console.log(error.code);return;}
callback(results);
});
// connection.end();
}
function insert(ins,data,callback) {
 connection.query(ins,data, function (error, results, fields) {
  if (error) throw error;
callback(results);
});
 }




var table = {
nom_table : null,
liste : [],
idt : null,
obj : {},
idact:0,
init : function(param){
if(param) {
  for (let [key, value] of Object.entries(param)) {
    table[key] = value;
  }
}




if (this.supp !== null) {
  document.getElementById(this.supp).addEventListener('click',table.supprimer);
}
if (this.editer !== null) {
  document.getElementById(this.editer).addEventListener('click',table.modifier);
}
  if (this.recherche !== null) {
    document.getElementById(this.recherche).addEventListener('input',table.afficherR);
  }


  query("SELECT * FROM "+table.nom_table+"",function(res){
  table.liste = res;
  table.liste.map(function(el){
    let rech = [];
    for (var i = 0; i < table.obj.length; i++) {
      rech.push(el[table.obj[i]].toString().toUpperCase());
    }
  el.recherche = rech.join(':');

return el;

  })
if (table.filters && table.filters.length) {
  for (var i = 0; i < table.filters.length; i++) {

    table.fltr( table.filters[i].name,table.liste,table.filters[i].id);
    document.getElementById(table.filters[i].id).addEventListener('change',table.afficherR);
  }
}

  table.afficherR();
  })
},
afficherR:function(){
  let lst = table.liste , htmlTable = '';
if (  document.getElementById(table.recherche) && document.getElementById(table.recherche).value !== '') {
let kw = document.getElementById(table.recherche).value.toUpperCase()  ;
console.log('recherche .....');
   lst = lst.filter(function (eleve) {
     return eleve.recherche.indexOf(kw) > -1;
   })
}

table.filters.forEach(function(f){
  let name = f.name , val = document.getElementById(f.id).value;
  if (val !== '') lst = lst.filter(function(itm){return itm[name] == val})
})




let num=0;
  for (var i = 0; i < lst.length; i++) {
    htmlTable+=`<tr onclick = table.select(this) data-id="${lst[i].id}"><td>`+(++num)+`</td>`;

    for (var j = 0; j < table.obj.length; j++) {
      htmlTable += `<td>${lst[i][table.obj[j]]}</td>`;
    }
    htmlTable+='</tr>';

  }
  document.getElementById(table.idt).innerHTML = htmlTable;
if(table.sum && document.getElementById(table.sum)){
  document.getElementById(table.sum).innerHTML=num;
}
}
, select : function (htmlTable) {
let trActive = document.querySelectorAll('.table-primary');
if ( trActive &&  trActive.length) {

for (var i = 0; i < trActive.length; i++) {
  trActive[i].classList.remove('table-primary');
}
}

  htmlTable.classList.add('table-primary');
},
supprimer : function () {
  let tr = document.querySelector('tr.table-primary');

  if (tr == undefined)  return;
let id = tr.dataset.id;
Swal.fire({
  title: 'Etes vous sur ?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Oui, Supprimer!'
}).then((result) => {
  if (result.value) {
    query("DELETE FROM "+table.nom_table+" WHERE id='"+id+"'",function(){
      table.init();
      Swal.fire(
        'Supprimé!',
        'success'
      )

    })
  }
})




}
, modifier: function () {
  let tr = document.querySelector('tr.table-primary');
  console.log(tr);
  if (tr == undefined)  return;
  console.log('edit..');
  let id = tr.dataset.id;
table.idact=id;
    query("SELECT * FROM "+table.nom_table+"  WHERE id='"+id+"' ",function(data){
let sel;
document.querySelector('.win').classList.add('afficher');
      for (var i = 0; i < table.obj.length; i++) {
    if (document.querySelector('[name="'+table.obj[i]+'"]'))    document.querySelector('[name="'+table.obj[i]+'"]').value = data[0][table.obj[i]];
      }
    })

} ,
fltr : function(nom,data,idselect){
  let filter = [];
  data.forEach(function(item){
    if( !filter.includes(item[nom])) filter.push(item[nom]);
  })


    let option='<option value="">Tous </option>';
    for(let i=0;i<filter.length;i++){
      option+='<option value="'+filter[i]+'">'+filter[i]+'</option>';
    }
    document.getElementById(idselect).innerHTML= option ;


}

}

function recherche(){
let html = [] ,n = 0; lst = liste , search= document.getElementById('recherche').value.toLowerCase();
}
function affichertab(tab) {
if (document.querySelector('.tab.afficher')) document.querySelector('.tab.afficher').classList.remove('afficher');
document.querySelector('.'+tab).classList.add('afficher');

}
