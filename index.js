// ------------- Initialize localeStorage & get localStorage ----------------
// data list
if(!localStorage.getItem("table")){
    localStorage.setItem("table", JSON.stringify([]));
  }
  if(!localStorage.getItem("index")){
    localStorage.setItem("index", 1);
  }
 if(!localStorage.getItem('tacheTermine')) { 
    localStorage.setItem('tacheTermine', 0)
};

if(!localStorage.getItem('tacheNouveau')) { 
    localStorage.setItem('tacheNouveau', 0)
};


if(!localStorage.getItem('tacheEncours')) { 
    localStorage.setItem('tacheEncours', 0)
};


let tableList = JSON.parse(localStorage.getItem('table'))
let  index = JSON.parse(localStorage.getItem('index', ))
let  tacheTermine = JSON.parse(localStorage.getItem('tacheTermine'))
let  tacheEncours = JSON.parse(localStorage.getItem('tacheEncours'))
let  tacheNouveau = JSON.parse(localStorage.getItem('tacheNouveau'));


const selectCategorie = document.querySelector('#categorie');
 const selectStatut = document.querySelector('#statut');
 const inutTitle = document.querySelector('#inputTitle');
 const inputDate = document.querySelector('#inputDate');
 const inputDescription = document.querySelector('#inputTextarea');
 const btnAjout = document.querySelector('#btnAjout');
 const tbody = document.querySelector('#tbodyTache');
 const notification = document.querySelector('#notification');



// ============================================

// ---------------Recuperation des données du DOM ---------------


btnAjout.addEventListener('click', ()=>{
   
    let tache = {
        id: index,
        categorie: selectCategorie.value,
        titre: inutTitle.value,
        date: inputDate.value,
        description: inputDescription.value,
        statut: selectStatut.value
    }
    // --------------- les données du graphe chartjs --------------
    if (tache.statut === 'Nouveau') {
        tacheNouveau++;
    } else if(tache.statut === 'Terminé') {
        tacheTermine++;
    }else{
        tacheEncours++
    }
    // ------------------------------------------------------------
  
     tableList.push(tache);
     index++
    //  console.log(tableList);
    // -------------notification-----------------------------------------------
    notification.classList.remove('hidden');
    setTimeout(() => {
        notification.classList.add('hidden')
    }, 2000);
    //------------------------------------------------------------------------
     updateLocalStorage(tableList, index)
     inserDatas(tableList);
     updatetache();
     vider();
})



showTableItems();
// -----------------------fonction view info tache ---------------------------

const  btnView = document.querySelectorAll('.btnView');//all btn viewbtn
    const tbodyInfo = document.querySelector('#tbodyInfo'); // tbody of tableInfo tache
    const tableInfo = document.querySelector('#tableInfo'); //table info
    const infoTache = document.querySelector('#infoTache'); // div infoTache
// console.log(infoTache);
// console.log(btnView);
// console.log(tableList);

btnView.forEach(button => {
    button.addEventListener('click', (e)=>{
       const id = e.target.parentElement.parentElement.querySelector('th').textContent;
    
       const tache = tableList.find(objet => objet.id === parseInt(id)) // l'objet ayant la propriéte id (tache)
        // console.log(tache);

        // -----creatation des ligne info tache --------------
        tbodyInfo.innerHTML = '';
        tbodyInfo.innerHTML = `
                            <tr>
                                <td class="titleColor fw-bold">Date :</td>
                                <td>${tache.date}</td>
                            </tr>
                            <tr>
                                <td class="titleColor fw-bold">Tite :</td>
                                <td>${tache.titre}</td>
                            </tr>
                            <tr>
                                <td class="titleColor fw-bold">Categorie :</td>
                                <td>${tache.categorie}</td>
                            </tr>
                            <tr>
                                <td class="titleColor fw-bold">Description :</td>
                                <td>${tache.description}</td>
                            </tr>
                            <tr>
                                <td class="titleColor fw-bold">Statut :</td>
                                <td>${tache.statut}</td>
                           </tr>`;
                 tableInfo.appendChild(tbodyInfo);
                 infoTache.classList.toggle('hidden');
                 
    })

});
// console.log(index,typeof index);
// ----------- DELETE ITEM ----------------------
const btnDelete = document.querySelectorAll('.btnDelete');

btnDelete.forEach(button => {
    button.addEventListener('click', (e)=>{
        if (index<=0) {index = 1;} // renitialisaton de l'index au moment de suppression (si < 0)
        const id = parseInt(e.target.parentElement.parentElement.querySelector('th').textContent);
        // let tache = tableList.find(object => object.id === id)
        // console.log(tache);
        const indexTache = tableList.findIndex(objet => objet.id === id);
        console.log(tableList[indexTache]);
        const tache = tableList[indexTache];

 // --------------- les données du graphe chartjs --------------
                if (tache.statut === 'Nouveau') {
                    tacheNouveau--;
                } else if(tache.statut === 'Terminé') {
                    tacheTermine--;
                }else{
                    tacheEncours--;
                }

                //console.log(tacheEncours, tacheNouveau, tacheTermine);
 // ------------------------------------------------------------
  

        const tr = e.target.parentElement.parentElement;
         tr.remove();
 
            tableList.splice(indexTache, 1);
            console.log(tableList);
            index --;
            updateLocalStorage(tableList, index); 
            updatetache();
            
       
// -------------notification -------------------------
        notification.querySelector('h3').innerHTML = 'suppresion de la tâche';
        notification.querySelector('p').innerHTML = 'La tâche est supprimée avec succès';
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 1000);
        location.reload();

    })
    
});

// ------------------- EDIT IEMS -------------------
const divtitreTache = document.querySelector('#divtitreTache')
// console.log(tableList);
const btnEdit = document.querySelectorAll('.btnEdit')
btnEdit.forEach(button =>{
        button.addEventListener('click', (e)=>{
            /* if (index<=0) index = 1; */ // renitialisaton de l'index au moment de suppression (si < 0)
            const id = parseInt(e.target.parentElement.parentElement.querySelector('th').textContent);
            const indexTache = tableList.findIndex(objet => objet.id === id);
            const tache = tableList.find(objet => objet.id === parseInt(id)) // l'objet ayant la propriéte id (tache)
// ================================================================

// --------------- les données du graphe chartjs --------------

            if (tache.statut === 'Nouveau') {
                tacheNouveau--;
            } else if(tache.statut === 'Terminé') {
                tacheTermine--;
            }else{
                tacheEncours--;
            }

            //console.log(tacheEncours, tacheNouveau, tacheTermine);
// ------------------------------------------------------------


            if (indexTache !== -1) {
                tableList.splice(indexTache, 1);
                index--
                updateLocalStorage(tableList, index);
                inserDatas(tableList);
                updatetache()
            }
            console.log(tableList);
            // console.log(tableList);
            divtitreTache.classList.add('updateColor');
            btnAjout.classList.add('updateColor');
            divtitreTache.querySelector('h3').innerHTML = "Mise à jour de la tâche";
            btnAjout.innerHTML = "Mise à jour";
            // -------show values on form ---------------------

            selectCategorie.value = tache.categorie;
            selectStatut.value = tache.statut;
            inutTitle.value = tache.titre;
            inputDate.value = tache.date;
            inputDescription.value = tache.description
               
          
        })
})

// ---------------- show Description -------------------------
const paraDescription = document.querySelector('#paraDescription')
const afficheDescription = document.querySelectorAll('.afficheDescription');

afficheDescription.forEach(td => {
    td.addEventListener('click', (e)=>{
        let id = parseInt(e.target.parentElement.querySelector('th').textContent);
        let tache = tableList.find(object => object.id === id)
        paraDescription.innerHTML=tache.description;
    })
});
// ------------------------------------------------------------------------






//=====================FONCTIONS========================

// ---------fonction inserDatas------------------------------

function inserDatas(tableList){

    tbody.innerHTML = "";
    tableList.forEach(tache => {
         
          const tr = document.createElement('tr');;
                const th = document.createElement('th');
                const td1 = document.createElement('td');
                const td2 = document.createElement('td');
                const td3 = document.createElement('td');
                const td4 = document.createElement('td');
                const i1 = document.createElement('i');
                const i2 = document.createElement('i');
                const i3 = document.createElement('i'); 

                
                td4.append(i1, i2, i3);
                tr.append(th, td1, td2, td3, td4);
                tbody.appendChild(tr);

                i3.className = "btn btn-danger bi bi-trash text-white btnDelete mx-1";
                i2.className = "btn btn-success bi bi-pencil-square btnEdit mx-1";
                i1.className = "btn btn-info bi bi-eye text-white btnView mx-1";

                th.textContent  = tache.id;
                td1.textContent = tache.date;
                td2.textContent = tache.titre;
                td3.textContent = tache.categorie
        
    });
}

// ======================= fonction qui permet de vider les champs après validation du button ajouter =================
function vider() {
    selectCategorie.value = '';
    inutTitle.value = ' ';
    inputDate.value = '';
    inputDescription.value = '';
    selectStatut.value = '';  
}


// --------------function update localStorage ----------------

function updateLocalStorage(tableList, index,) {
    localStorage.setItem('table', JSON.stringify(tableList));
    localStorage.setItem('index', JSON.stringify(index))
}
// --------------- UPDATE-TACHE -------------
function updatetache(){
    localStorage.setItem('tacheNouveau', JSON.stringify(tacheNouveau));
    localStorage.setItem('tacheEncours', JSON.stringify(tacheEncours));
    localStorage.setItem('tacheTermine', JSON.stringify(tacheTermine));
}
// ------------ function showItem ----------------


function showTableItems() {
    tableList.forEach(element => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
                    <th scope="row">${element.id}</th>
                    <td>${element.date}</td>
                    <td>${element.titre}</td>
                    <td class="afficheDescription isPointer">${element.categorie}</td>
                    <td>
                        <i class="btn btn-info bi bi-eye text-white btnView"></i>
                        <i class="btn btn-success bi bi-pencil-square btnEdit"></i>
                        <i class="btn btn-danger bi bi-trash text-white btnDelete"></i>
                    </td>`;
        tbody.appendChild(tr);
    });
}



// ------------------------------------

// ===================chart js==============================================

const ctx = document.getElementById('myChart');
new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Terminé', 'En-cours', 'Nouveau'],
        datasets: [{
            label:  [tacheNouveau, tacheNouveau, tacheTermine],//'# of Votes',
            data: [tacheNouveau, tacheNouveau, tacheTermine],
            borderWidth: 1,
             backgroundColor:['#00ffcc','#086171','#44c7d8'],
        }]
    },
});

// ==========================================================================