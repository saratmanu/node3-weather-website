const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#sucess');
const messageTwo = document.querySelector('#error');

weatherForm.addEventListener('submit',(event) => {
    event.preventDefault();
    const location = searchElement.value;
    const url = '/weather?address='+location;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(url).then((res) => {
    res.json().then((data) => {
        if(data.error) {
            messageOne.textContent = '';
            messageTwo.textContent = data.error;
        }
        else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
       
    });
});
});