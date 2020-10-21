console.log("hello");

//if user add the notes
let addbtn = document.getElementById('addbtn');
let clear = document.getElementById('clearAll');

//clear function
clear.addEventListener('click', function () {
    //checks if the localStorage is empty or not
    if (localStorage.length == 0) {
        alert("Empty Localstorage!");
    }
    else {
        localStorage.clear();
        showNotes();
    }
})
addbtn.addEventListener('click', function (e) {
    let text = document.getElementById('addtext').value;
    if (text == "") {
        alert("Please add some text and title");
    } else {

        textNote = text;
        let notes = localStorage.getItem('notes');
        if (notes == null) {
            notesobj = [];
        }
        else {
            notesobj = JSON.parse(notes);
        }
        notesobj.push(textNote);
        localStorage.setItem('notes', JSON.stringify(notesobj));
        addtext.value = "";
        console.log(notesobj);
        showNotes();
    }

});

//function to show all notes
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (note, index) {
        html += `
        <div class="noteCard mx-2 my-2 card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${index + 1}. Note</h5>
                  <p class="card-text">${note}</p>
                  <button id= "${index}" onclick= "deletNote(this.id)" class="btn btn-primary">Delet Note</button>
                </div>
              </div>
              `
    });
    let notesElem = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    //If local storage is empty show this message
    let emptyStorage = localStorage.getItem('notes');
    if (emptyStorage == null) {
        document.getElementById('notes').innerHTML = `You haven't created a note yet!`;
    }

}

//If local storage is empty show this message
let emptyStorage = localStorage.getItem('notes');
if (emptyStorage == null) {
    document.getElementById('notes').innerHTML = `You haven't created a note yet!`;
}



//function to delet the note
function deletNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
    if(notesObj == 0){
        document.getElementById('notes').innerHTML = "You haven't created a note yet!"
    }
}

// function for search elements
let searchText = document.getElementById('searchText');
searchText.addEventListener('input', function () {

    let inputVal = searchText.value;
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})

const load=()=>{
    showNotes();
}
