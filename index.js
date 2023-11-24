// ------------- Initialize localeStorage & get localStorage ----------------
// data list
if (!localStorage.getItem("table")) {
    localStorage.setItem("table", JSON.stringify([]));
}
if (!localStorage.getItem("index")) {
    localStorage.setItem("index", 1);
}
if (!localStorage.getItem('tacheTermine')) {
    localStorage.setItem('tacheTermine', 0)
};

if (!localStorage.getItem('tacheNouveau')) {
    localStorage.setItem('tacheNouveau', 0)
};


if (!localStorage.getItem('tacheEncours')) {
    localStorage.setItem('tacheEncours', 0)
};


let tableList = JSON.parse(localStorage.getItem('table'))
let index = JSON.parse(localStorage.getItem('index'))
let tacheTermine = JSON.parse(localStorage.getItem('tacheTermine'))
let tacheEncours = JSON.parse(localStorage.getItem('tacheEncours'))
let tacheNouveau = JSON.parse(localStorage.getItem('tacheNouveau'));


const selectCategorie = document.querySelector('#categorie');
const selectStatut = document.querySelector('#statut');
const inutTitle = document.querySelector('#inputTitle');
const inputDate = document.querySelector('#inputDate');
const inputDescription = document.querySelector('#inputTextarea');
const btnAjout = document.querySelector('#btnAjout');
const tbodyTache = document.querySelector('#tbodyTache');
const notification = document.querySelector('#notification');

//  ==================RECUPERATIONDES DONNEES DU DOM ==============
btnAjout.addEventListener('click', () => {
    if (selectCategorie.value === '' || inutTitle.value === '' || inputDate.value === '' || inputDescription.value === '' || selectStatut.value === '') {
        // -------------notification -------------------------
        notification.querySelector('h3').innerHTML = 'Ajout de la tâche';
        notification.querySelector('p').innerHTML = 'Veuillez renseingner tous les champs';
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('hidden');
            location.reload();
        }, 2000);
        return;
    }
    let tache = {
        id: index,
        categorie: selectCategorie.value,
        titre: inutTitle.value,
        date: inputDate.value,
        description: inputDescription.value,
        statut: selectStatut.value
    }

    console.log(tache.statut);
    // --------------- les données du graphe chartjs --------------
    if (tache.statut === 'Nouveau') {
        tacheNouveau++;
    } else if (tache.statut === 'Terminé') {
        tacheTermine++;
    } else if(tache.statut === 'En-cours') {
        tacheEncours++
    }
    // ------------------------------------------------------------

    tableList.push(tache);
    index++
    // console.log(tableList, index);
    // -------------notification-----------------------------------------------
    notification.classList.remove('hidden');
    setTimeout(() => {
        notification.classList.add('hidden')
    }, 2000);
    //------------------------------------------------------------------------
    updateLocalStorage();
    showTableItems();
    vider();
    setTimeout(() => {
        location.reload();
    }, 3000);
});


// ======================== FUNCTIONS =======================

// --------------function update localStorage ----------------

function updateLocalStorage() {
    localStorage.setItem('table', JSON.stringify(tableList));
    localStorage.setItem('index', JSON.stringify(index));
    localStorage.setItem('tacheNouveau', JSON.stringify(tacheNouveau));
    localStorage.setItem('tacheEncours', JSON.stringify(tacheEncours));
    localStorage.setItem('tacheTermine', JSON.stringify(tacheTermine));
}

// ======================================================

function showTableItems() {
    tbodyTache.innerHTML = ''
    tableList.forEach((element, index) => {
        const tr = document.createElement('tr');
        tr.className = 'isPointer';
        tr.innerHTML = `
        <th  scope="row">${index + 1}</th>
        <td >${element.date}</td>
        <td class="tdTitre" data-index="${index}" title="cliquer pour voir la description de la tache"  >${element.titre}</td>
        <td>${element.categorie}</td>
        <td >
        <i data-index="${index}" class="btn btn-info bi bi-eye text-white btnView"></i>
        <i data-index="${index}" class="btn btn-success bi bi-pencil-square btnEdit"></i>
        <i data-index="${index}" class="btn btn-danger bi bi-trash text-white btnDelete"></i>
        </td>
        `;
        tbodyTache.appendChild(tr);
    });
}

showTableItems();

// ====================================================
function vider() {
    selectCategorie.value = '';
    inutTitle.value = ' ';
    inputDate.value = '';
    inputDescription.value = '';
    selectStatut.value = '';
}
// ======================================================
// ---------------- show Description -------------------------
const taskDescription = document.querySelector('#taskDescription');
const tdToshowDescriptionTask = document.querySelectorAll('.tdTitre');

tdToshowDescriptionTask.forEach(td => {
    td.addEventListener('click', (e) => {
        let indexData = parseInt(e.target.dataset.index);
        let task = tableList[indexData];
        // console.log(task);
        taskDescription.innerHTML = task.description;
    })
});
// ------------------------------------------------------------------------

// ================================================================================

// -----------------------fonction view info tache ---------------------------

const btnView = document.querySelectorAll('.btnView');//all btn viewbtn
const tbodyInfo = document.querySelector('#tbodyInfo'); // tbody of tableInfo tache
const tableInfo = document.querySelector('#tableInfo'); //table info
const infoTache = document.querySelector('#infoTache'); // div infoTache
// console.log(infoTache);
// console.log(btnView);
// console.log(tableList);

btnView.forEach(button => {
    button.addEventListener('click', (e) => {
        //    const id = e.target.parentElement.parentElement.querySelector('th').textContent;
        let indexTaskToshow = parseInt(e.target.dataset.index)
        let taskToShow = tableList[indexTaskToshow];

        //    const tache = tableList.find(objet => objet.id === parseInt(id)) // l'objet ayant la propriéte id (tache)
        //     // console.log(tache);

        //     // -----creatation des ligne info tache --------------
        tbodyInfo.innerHTML = '';
        tbodyInfo.innerHTML = `
                            <tr>
                                <td class="titleColor fw-bold">Date :</td>
                                <td>${taskToShow.date}</td>
                            </tr>
                            <tr>
                                <td class="titleColor fw-bold">Tite :</td>
                                <td>${taskToShow.titre}</td>
                            </tr>
                            <tr>
                                <td class="titleColor fw-bold">Categorie :</td>
                                <td>${taskToShow.categorie}</td>
                            </tr>
                            <tr>
                                <td class="titleColor fw-bold">Description :</td>
                                <td>${taskToShow.description}</td>
                            </tr>
                            <tr>
                                <td class="titleColor fw-bold">Statut :</td>
                                <td>${taskToShow.statut}</td>
                           </tr>`;
        tableInfo.appendChild(tbodyInfo);
        infoTache.classList.toggle('hidden');

    })
});
// ===================================================================

// ----------- DELETE ITEM ----------------------
const btnDelete = document.querySelectorAll('.btnDelete');

btnDelete.forEach(button => {
    button.addEventListener('click', (e) => {
        let indexTask = parseInt(e.target.dataset.index);
        console.log(indexTask);
        let taskToDelete = tableList[indexTask]
        console.log(taskToDelete);
        // --------------- les données du graphe chartjs --------------
        if (taskToDelete.statut === 'Nouveau') {
            tacheNouveau--;
        } else if (taskToDelete.statut === 'Terminé') {
            tacheTermine--;
        } else {
            tacheEncours--;
        }

        //console.log(tacheEncours, tacheNouveau, tacheTermine);

        tableList.splice(indexTask, 1);
        taskDescription.innerHTML = '';
        updateLocalStorage();
        // // -------------notification -------------------------
        notification.querySelector('h3').innerHTML = 'suppresion de la tâche';
        notification.querySelector('p').innerHTML = 'La tâche est supprimée avec succès';
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('hidden');
            location.reload();
        }, 2000);

        showTableItems();

    })
});


// ===================== EDIT ITEMS ===================

const btnUpdate = document.querySelector('#btnUpdate');
let taskToEdit = '';
let indexToEdt = '';
const btnEdit = document.querySelectorAll('.btnEdit')
btnEdit.forEach(button => {
    button.addEventListener('click', (e) => {
        btnAjout.classList.add('d-none');
        btnUpdate.classList.remove('d-none');
        divtitreTache.classList.add('updateColor');

        indexToEdt = parseInt(e.target.dataset.index);
        taskToEdit = tableList[indexToEdt];
        // console.log(taskToEdit);

        // -------show values on form ---------------------

        selectCategorie.value = taskToEdit.categorie;
        selectStatut.value = taskToEdit.statut;
        inutTitle.value = taskToEdit.titre;
        inputDate.value = taskToEdit.date;
        inputDescription.value = taskToEdit.description;
    })
})


btnUpdate.addEventListener('click', () => {

    if (selectCategorie.value === '' || inutTitle.value === '' || inputDate.value === '' || inputDescription.value === '' || selectStatut.value === '') {
        // -------------notification -------------------------
        notification.querySelector('h3').innerHTML = 'Ajout de la tâche';
        notification.querySelector('p').innerHTML = 'Veuillez renseingner tous les champs';
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 2000);
        return;
    }
    let newTask = {
        id: index,
        categorie: selectCategorie.value,
        titre: inutTitle.value,
        date: inputDate.value,
        description: inputDescription.value,
        statut: selectStatut.value
    }
    vider();
    console.log('ancienne tache ', taskToEdit);
    console.log('nouvelles valeur de tache', newTask);
    tableList[indexToEdt] = newTask;
    updateLocalStorage();
    showTableItems();
    btnAjout.classList.remove('d-none');
    btnUpdate.classList.add('d-none');
    divtitreTache.classList.remove('updateColor');
    // -------------notification -------------------------
    notification.querySelector('h3').innerHTML = 'Mise à jour';
    notification.querySelector('p').innerHTML = 'Mise à jour effectuée avec succès';
    notification.classList.remove('hidden');
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 2000);
    // console.log('tache modifiée ', tableList[indexToEdt]);

    setTimeout(() => {
        location.reload();
    }, 3000);

})


// ===================chart js==============================================

const ctx = document.getElementById('myChart');
new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Terminé', 'En-cours', 'Nouveau'],
        datasets: [{
            label: [tacheTermine, tacheEncours, tacheNouveau],//'# of Votes',
            data: [tacheTermine, tacheEncours, tacheNouveau],
            borderWidth: 1,
            backgroundColor: ['#00ffcc', '#086171', '#44c7d8'],
        }]
    },
});

// ==========================================================================

