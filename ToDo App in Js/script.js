const addUserBtn = document.getElementById('addUser');
const btnText = addUserBtn.innerText
const usernameTextField = document.getElementById('username')
const recordDisplay = document.getElementById('records')
let userArray = [];
let edit_id =  null;
let objStr = localStorage.getItem('users')
if (objStr != null) {

    userArray = JSON.parse(objStr);
}
displayInfo();
console.log(userArray);

addUserBtn.onclick = () => {
    const name = usernameTextField.value;
    if(edit_id != null){
        //edit
        userArray.splice(edit_id,1,{'name': name })
        edit_id = null;
    }else{
        //insert
        
        console.log(name);
        userArray.push({ 'name': name })
    }
    saveInfo(userArray);
    usernameTextField.value = '';
    displayInfo();
    addUserBtn.innerText = btnText
}

function saveInfo(userArray) {
    let str = JSON.stringify(userArray);
    localStorage.setItem('users', str);
    displayInfo();
}

function displayInfo() {
    let statement = ''
    userArray.forEach((user, index) => {
        statement += `<tr>
        <th scope="row">${index + 1}</th>
        <td>${user.name}</td>
        <td><i class="btn text-white fa fa-edit btn-info mx-3" onClick='editInfo(${index})'></i><i class=" btn btn-danger fa fa-trash" onClick='deleteInfo(${index})'></i></td>
      </tr>`
    });
    recordDisplay.innerHTML = statement;
}

function editInfo(i) {
    edit_id = i
    usernameTextField.value = userArray[i].name
    addUserBtn.innerText = 'Save Changes'
}

function deleteInfo(i) {
    userArray.splice(i,1)
    saveInfo(userArray)
     
}