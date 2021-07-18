console.log('it works');

const firstname = document.querySelector('.firstname');
const lastname = document.querySelector('.lastname');
const email = document.querySelector('.email');
const phone = document.querySelector('.phone');
const address = document.querySelector('.address');
const password = document.querySelector('.password');
const confirmPassword = document.querySelector('.confirmPassword');
const submit = document.querySelector('.submit');

const messageDom = document.querySelector('.msg');

function updateMessage(value){
    messageDom.textContent = value
}

submit.addEventListener('click', (e) => {
    e.preventDefault();

    

    let data = {
        firstName: firstname.value,
        lastName: lastname.value,
        email: email.value,
        phone: phone.value,
        address: address.value,
        password: password.value,
        confirmPassword: confirmPassword.value
    }

    console.log(data)

    fetch('http://localhost:3090/users/register', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        updateMessage(data.msg);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
});




