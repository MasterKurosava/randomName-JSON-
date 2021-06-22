const newGenBtn = document.getElementById('newGen'),
      removeGenBtn = document.getElementById('removeGen'),
      surNameLabel=document.getElementById('surnameOutput'),
      nameLabel = document.getElementById('firstNameOutput'),
      genderLabel=document.getElementById('genderOutput'),
      ageLabel=document.getElementById('birthYearOutput'),
      workLabel=document.getElementById('workPlace')
      PG=personGenerator;
function Generation(){
    let gender=PG.randomGender();
    PG.inputName(gender);
    PG.randomDate();
    PG.randomWork(gender);
}

newGenBtn.addEventListener('click',()=>Generation())
removeGenBtn.addEventListener('click',()=>PG.clear())

