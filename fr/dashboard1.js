
var absence = {
  init:function(){
    query("SELECT * FROM groupes ",function(data){
      let html = '<option value="0">TOUS</option>';
      data.forEach(function(gr){
        html+= '<option value="'+gr.id+'">'+gr.nom+'</option>';
      })
      document.getElementById('filterByGroup').innerHTML = html;
      document.getElementById('filterbygroupes').innerHTML = html;

    })
  },
  seances : function(gid){
      query("SELECT * FROM seances WHERE id_grp='"+gid+"' ",function (data) {
        let html = '<option value="0">TOUS</option>';
        data.forEach(function(sc){
          html+= '<option value="'+sc.id+'">'+sc.debut + ' - '+sc.fin +'</option>';
      })
      document.getElementById('filterbyseance').innerHTML = html;
      // document.getElementById('filterbyseances').innerHTML = html;
  })
},
eleves: function (sid) {
  let gid = document.getElementById('filterByGroup').value;

query("SELECT * from eleves where id_groupe ='"+gid +"'",function (d) {
  let html = '<option value="0">TOUS</option>', table='';


  d.forEach(function(el){
    table+='<tr ><td style="width:60px;"><div class="form-check "><input data-abs='+el.id+' class="form-check-input sel" value=" " type="checkbox" id="selectall"></div></td><td>'+el.nom+' '+el.prenom+'</td> </tr>'
  })
  table+='<tr><td><button class= "btn btn-primary" onclick="absence.selectionnertous()"> selectionner tous</button></td>'
  table+='<td><button class= "btn btn-success btn-block pull-right" onclick="absence.valider()"> valider</button></td></tr>'
document.getElementById('abs').innerHTML = table;

})
},
selectionnertous:function () {
let a_chbx =  document.querySelectorAll('[data-abs]') , etat =a_chbx[0].checked ;
etat = !etat;
for (var i = 0; i < a_chbx.length; i++) {
  a_chbx[i].checked = etat;
}
},
valider:function () {
  let a_chbx =  document.querySelectorAll('[data-abs]') ,id_e,id_s = document.getElementById('filterbyseance').value,etat , date_seance = moment().format('YYYY-MM-DD');
query("DELETE FROM presence WHERE id_seance='"+id_s+"' AND date LIKE '"+date_seance+"'",function(){

  for (var i = 0; i < a_chbx.length; i++) {
etat = (a_chbx[i].checked?'1':'0');
id_e = a_chbx[i].dataset.abs;
query("INSERT INTO presence (id_eleve,id_seance,etat,date) VALUES ('"+id_e+"','"+id_s+"','"+etat+"','"+date_seance+"')",function(res){
  console.log(res);
});
  }
})

},
afficherabscence:function(grp){



let   date = document.getElementById('filterbydate').value;

if(grp== '0')return;
  query("SELECT *,(SELECT debut from seances  Where seances.id= presence.id_seance )AS seance,(SELECT nom FROM eleves WHERE eleves.id= presence.id_eleve) AS eleve,(SELECT prenom FROM eleves WHERE eleves.id= presence.id_eleve) AS prenom FROM presence WHERE date='"+date+"' AND id_groupe='"+grp+"'",function (ab) {
console.log(ab);
let liste_abs = '';
ab.forEach(function(e){
liste_abs += `<tr data-abs="${e.etat}"><td>${e.id}</td><td><a href="javascript:infoeleve(${e.id_eleve})">${e.eleve} ${e.prenom}</a></td><td>${e.seance}</td></tr>`;
})
document.querySelector('#liste_abs').innerHTML =liste_abs;
  })
}
}
absence.init();
