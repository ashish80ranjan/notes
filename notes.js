let btn=document.getElementById('addBtn');
shownotes();
btn.addEventListener('click',function(){
    let text=document.getElementById('addTxt');
    let addtitle=document.getElementById('addTitle');
    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesobj=[];
    }
    else{
        notesobj=JSON.parse(notes);
    }
    let myobj={
        title:addtitle.value,
        main:text.value
    }
    notesobj.push(myobj);
    localStorage.setItem('notes',JSON.stringify(notesobj))
    text.value="";
    addtitle.value="";
    shownotes();    
})

function shownotes(){
    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesobj=[];
    }
    else{
        notesobj=JSON.parse(notes);
    }
    let html="";
    notesobj.forEach(function(element,index){
        
        html +=`<div class="card my-2 mx-2 noteCard" style="width: 18rem;">
                   
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.main}</p>
          <button id="${index}" onclick="deletenote(this.id)" class="btn btn-primary">Delete note</button>
        </div>
      </div>`;
    });
    let notesElem=document.getElementById('notes');
    if(notesobj.length!=0){
        notesElem.innerHTML=html;
    }
    else{
        notesElem.innerHTML=`Note is empty .......`;
    }
}

function deletenote(index){
    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesobj=[];
    }
    else{
        notesobj=JSON.parse(notes);
    }
    notesobj.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notesobj));
    shownotes();
}


let search=document.getElementById('searchTxt')

search.addEventListener('input', function(){
    let input=search.value.toLowerCase();
    let cardnote=document.getElementsByClassName('noteCard');
    Array.from(cardnote).forEach(function(element){
        let cardTxt=element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(input)){
            element.style.display="block";

        }
        else{
            element.style.display="none";
        }
    })

}) 

let deleteall=document.getElementById('Deleteall');
deleteall.addEventListener('click',function(){
    localStorage.clear();
    shownotes();
})