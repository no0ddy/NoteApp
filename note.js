'use strict';
const titleEl = document.querySelector('.tx');
const messageEl = document.querySelector('.note');
const evinnerEl = document.querySelector('#evinner');
const addBtn = document.querySelector('#sub');
const notifDiv = document.querySelector('#inner');

// window.addEventListener('DOMContentLoaded', display);
// function for note data
function noteData(title, content) {
  const newNote = document.createElement('div');
  // console.log(newNote);
  newNote.classList.add('addNote');
  newNote.id = title;
  newNote.innerHTML += `<h2 class="noteKey">${title}</h2>
    <p >${content}</p>
    <div class="noteBtns">
      <button class=ed "${title}" onclick = edit("${title}")>Edit</button>
      <button class=dl "${title}" onclick =remove("${title}")>Delete</button>
    </div>
  `;
  evinnerEl.appendChild(newNote); //Adding new div
}
//Add function with apend child
const add = function () {
  let titleTxt = titleEl.value;
  let noteTxt = messageEl.value;
  if (titleTxt === '' || noteTxt === '') {
    showAlertMessage('Please add both a title and a note', 'alert-message');
  } else {
    localStorage.setItem(titleTxt, noteTxt);

    titleEl.value = '';
    messageEl.value = '';

    showAlertMessage('note succefully added', 'success-message');
    setTimeout(() => window.location.reload(), 2000);
  }

  // window.addEventListener('DOMContentLoaded', display);
};
//eventlistener for add button
addBtn.addEventListener('click', add);

//display function to display notes
const display = function () {
  if (localStorage.length > 0) {
    document.querySelector('.message').classList.add('hidden');
    let i = localStorage.length;
    while (i--) {
      const titleInd = localStorage.key(i);
      const titleValue = localStorage.getItem(titleInd);
      noteData(titleInd, titleValue);
    }
  }
};
display();
//Delete function
function remove(noteKey) {
  localStorage.removeItem(noteKey);
  showAlertMessage('note succefully deleted', 'remove-message');
  setTimeout(() => window.location.reload(), 2000);
}

//Edit function
function edit(noteKey) {
  titleEl.value = noteKey;
  messageEl.value = localStorage.getItem(noteKey);
  localStorage.removeItem(noteKey);
  titleEl.focus();
}
// Function: Show alert message
function showAlertMessage(message, alertClass) {
  const alertDiv = document.createElement('div');
  alertDiv.className = `${alertClass}`;
  alertDiv.appendChild(document.createTextNode(message));
  notifDiv.insertAdjacentElement('beforebegin', alertDiv); //Inserting div before another div
  titleEl.focus(); //Focus on the title element

  setTimeout(() => alertDiv.remove(), 2000); //setTimeout to remove the alert
}
//searching
function search() {
  evinnerEl.focus();
  let ele = document.getElementById('sr').value.toLowerCase();
  let i = localStorage.length;

  while (i--) {
    let titleInd = localStorage.key(i);
    titleInd = String(titleInd).toLowerCase();
    let titleValue = localStorage.getItem(titleInd);
    titleValue = String(titleValue).toLowerCase();
    if (!titleInd.includes(ele) && !titleValue.includes(ele)) {
      document.querySelector(`#${localStorage.key(i)}`).style.display = 'none';
    } else {
      document.querySelector(`#${localStorage.key(i)}`).style.display = 'block';
    }
  }
}
