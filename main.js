
// Array created Dynamically
let empDetails = function(fname, lname,id,country, state, profile){
    this.fname = fname,
    this.lname = lname,
    this.id = id
    this.country = country,
    this.state = state,
    this.profile= profile
}

//created objects Array
 var empObj = new empDetails('james', 'Butt',101, 'USA', 'OH', 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60');
 var empObj1 = new empDetails('Josephine','Dara',102,  'India', 'Stow', 'https://images.unsplash.com/photo-1558980664-3a031cf67ea8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60');
 var empObj2 = new empDetails('Art', 'Venere',103, 'Autralia', 'Twinsburg', 'https://images.unsplash.com/photo-1454942901704-3c44c11b2ad1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60');

//Pushed all the objects into an empty array
let empCardDetails =[];
empCardDetails.push(empObj);
empCardDetails.push(empObj1);
empCardDetails.push(empObj2);

//local storage
var isLocalData = function() {
    let localData = localStorage.getItem('empCardData');
    console.log(localData);
   
   if(localData){
       empCardDetails = JSON.parse(localData);
   }
   return empCardDetails;
   
}


let empCard = document.getElementById("emp-section");
isLocalData().map(item => {
    userCard(item);
    console.log(userCard(item));
});

//Card created

function userCard(item){
        let cardSection = document.createElement('DIV');
            cardSection.setAttribute('class', 'col-4');
        let card = document.createElement('DIV');
            card.setAttribute('class', 'card');
        let cardFigure = document.createElement('FIGURE');
        let cardImg = document.createElement('IMG');
            cardImg.setAttribute('class', 'card-img-top');
            cardImg.setAttribute('alt', 'Card image cap');
            cardImg.setAttribute('src', item.profile);
        let cardButton = document.createElement('BUTTON');
            cardButton.setAttribute('data-id', item.id);
            cardButton.setAttribute('class', 'delete');
        let cardDelete = document.createElement('I');
            cardDelete.setAttribute('class', 'fa fa-user-times');
        let cardUpdateButton = document.createElement('BUTTON');
            cardUpdateButton.setAttribute('data-id', item.id);
            cardUpdateButton.setAttribute('class', 'user-update');
        let cardUpdate = document.createElement('I');
            cardUpdate.setAttribute('class', 'fa fa-user-edit');
        let cardBody = document.createElement('DIV');
            cardBody.setAttribute('class', 'card-body');
        let cardTitle = document.createElement('H5');
            cardTitle.setAttribute('class', 'card-title');
            cardTitle.innerHTML = item.fname + " " + item.lname;
        let cardLocIcon = document.createElement('I');
            cardLocIcon.setAttribute('class', 'fas fa-map-marker-alt')
        let cardLoc = document.createElement('SPAN');
            cardLoc.setAttribute('class', 'card-text');
            cardLoc.innerHTML = item.state;
        let cardCountryIcon = document.createElement('I');
            cardCountryIcon.setAttribute('class', 'fas fa-flag-usa');
        let cardCountry = document.createElement('SPAN');
            cardCountry.setAttribute('class', 'card-text country');
            cardCountry.innerHTML = item.country;

   //append the  card and cardelements to Div
        card.appendChild(cardFigure);
        cardFigure.appendChild(cardImg);
        card.appendChild(cardBody);
        cardButton.appendChild(cardDelete);
        cardFigure.appendChild(cardButton);
        cardFigure.appendChild(cardUpdateButton);
        cardUpdateButton.appendChild(cardUpdate);
        cardBody.appendChild(cardTitle);
        cardLoc.prepend(cardLocIcon);
        cardBody.appendChild(cardLoc);
        cardCountry.prepend(cardCountryIcon);
        cardBody.appendChild(cardCountry);
        cardSection.appendChild(card);
        empCard.appendChild(cardSection);
}

let isValid = false;

function getUserDetails(){
    
    let empDetailsValidations;
    let newEmpFName = document.getElementById('ftname');
    let newEmpLName = document.getElementById('ltname');
    let newEmpId = document.getElementById('eid');
    let newEmpLocation = document.getElementById('newempLocation');
    let newEmpCountry = document.getElementById('newempCountry');
    let newEmpProfile = document.getElementById('newempProfile');

    empDetailsValidations = {
        efname: newEmpFName,
        elname:newEmpLName,
        eId : newEmpId,
        eLocation: newEmpLocation,
        eCountry: newEmpCountry,
        eProfile: newEmpProfile
    }
//validateForm(empDetailsValidations);
    let efname = newEmpFName.value, elname = newEmpLName.value,eId = newEmpId.value, elocation = newEmpLocation.value, eCountry = newEmpCountry.value, eimage = newEmpProfile.value; 
    let newEmpCardDetails = new empDetails(efname, elname,eId, elocation, eCountry, eimage);

    console.log( validateForm(empDetailsValidations));
    if(validateForm(empDetailsValidations)){
        userCard(newEmpCardDetails);
        empCardDetails.push(newEmpCardDetails);
        console.log(empCardDetails);
         localStorage.setItem('empCardData', JSON.stringify(empCardDetails));
        $('#createUser').modal('hide');
    }     
}

  function validateForm(emp) {
        const fnameE = document.getElementById('fnameError');
        const lnameE = document.getElementById('ltnameError');
        const idE = document.getElementById('idError');
        const locationE = document.getElementById('newempLocationError');
        const countryE = document.getElementById('newempCountryError');
        const profileE = document.getElementById('newempProfileError');

       let efname = fnameE.innerText = isRequiredEle(emp.efname);
       let elname = lnameE.innerText = isRequiredEle(emp.elname);
       let eid = idE.innerText = isRequiredEle(emp.eId);
       let elocation = locationE.innerText = isRequiredEle(emp.eLocation);
       let ecoutry = countryE.innerText = isRequiredEle(emp.eCountry);
       let eimage = profileE.innerText = isRequiredEle(emp.eProfile);

        if(efname === '' &&  
            elname === '' &&  
            eid === '' &&
            elocation === '' && 
            ecoutry === '' && 
            eimage === '' ) {
            return true;
        } else {
            return false;
        }
 }

  function isRequiredEle(input) {
      if(input.value === null || input.value === '') {
          input.classList.add('control-error');
          return 'This field should not be empty';
      } else {
        input.classList.remove('control-error');
          return '';
      }
  }

//Delete the User

  let deletedEl = document.querySelectorAll('.delete');
      deletedEl.forEach(item =>{
          item.addEventListener('click', function(e){
           
            let userCurrentId = e.target.dataset.id;
            empCardDetails = isLocalData();
            console.log(empCardDetails);
            let userDeletionConfirm = confirm('Do you really want to delete the User!!');
           

            if(userDeletionConfirm){
               e.target.parentElement.parentElement.remove();
               empCardDetails.map(item =>{
                  if(parseInt(item.id)  === parseInt(userCurrentId)){
                    empCardDetails.pop(item);
                    console.log(empCardDetails);
                    localStorage.setItem('empCardData', JSON.stringify(empCardDetails));                  } 
               })
            }
          })
      });


//Update the UserDetails
let updateUserEle;
let updateUser = document.querySelectorAll('.user-update');
    updateUser.forEach(item =>{
        item.addEventListener('click', function(e){
            $('#createUser').modal('show');
            document.getElementById('createUser').classList.add('update-user-popup');
            let updateUserId = e.target.dataset.id;
            empCardDetails = isLocalData();
            empCardDetails.map(emp =>{
                if(parseInt(updateUserId) === parseInt(emp.id)){
                    document.getElementById('ftname').value = emp.fname;
                    document.getElementById('ltname').value = emp.lname;
                    document.getElementById('eid').value = emp.id;
                    document.getElementById('newempLocation').value = emp.state;
                    document.getElementById('newempCountry').value = emp.country;
                    document.getElementById('newempProfile').value = emp.profile;
                    updateUserEle = e.target;
                }

            })
        })
    })

function updateUserDetails(){

console.log(updateUserEle.parentElement.parentElement);
      let updatedUserFName = document.getElementById('ftname').value;
      let updatedUserLName = document.getElementById('ltname').value;
      let updatedUserLocation = document.getElementById('newempLocation').value;
      let updatedUserCountry = document.getElementById('newempCountry').value;
      let updatedUserProfile = document.getElementById('newempProfile').value;
      let CurrentCard = updateUserEle.parentElement.parentElement;
      empCardDetails = isLocalData();
      empCardDetails.map(index =>{
          if(parseInt(index.id) === parseInt(updateUserEle.dataset.id)){
            CurrentCard.querySelector('.card-img-top').setAttribute('src', updatedUserProfile);
            CurrentCard.querySelector('.card-title').innerHTML = updatedUserFName +" "+ updatedUserLName;
            CurrentCard.querySelector('.card-text.country').innerHTML = updatedUserCountry;
            CurrentCard.querySelector('.card-text').innerHTML = '<i class="fas fa-map-marker-alt"></i>' + updatedUserCountry;
            $('#createUser').modal('hide');
            index.fname = updatedUserFName;
            index.lname = updatedUserLName;
            index.state = updatedUserLocation;
            index.country = updatedUserCountry;
            index.profile = updatedUserProfile;
            localStorage.setItem('empCardData', JSON.stringify(empCardDetails));
        } ;
      })
}


function newUserPopUp(){
    document.getElementById('createUser').classList.remove('update-user-popup'); 
}


