let forms = document.querySelectorAll('.needs-validation')

let nameInput = document.getElementById("validationCustom01");
let phoneInput = document.getElementById("validationCustom02");
let timeSelect = document.getElementById("validationCustom04");

let nameInputValue = " "
let phoneInputValue = " "
let timeSelectValue = timeSelect.value

const requestUrl = 'https://jsonplaceholder.typicode.com/users';


function sendRequest(method, url, body = null) {
    const headers = {
        'Content-Type': 'application/JSON'
    }
    return fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: headers
    }).then(response => {
        return response.json()
    })
}

function submitValidation() {

    nameInput.oninput = function () {
        nameInputValue = nameInput.value

    }

    phoneInput.oninput = function () {
        phoneInputValue = phoneInput.value
        if (phoneInputValue.length === 11) {
            phoneInput.classList.add('correct-phone')
        }
    }

    timeSelect.oninput = function () {
        timeSelectValue = timeSelect.value
    }

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')

                if (phoneInputValue.length < 11) {
                    event.preventDefault()
                    event.stopPropagation()
                    phoneInput.classList.add('incorrect-phone')
                    phoneInput.focus()
                }

                if (nameInputValue === undefined) {
                    nameInput.focus()
                } else if (phoneInputValue === undefined) {
                    phoneInput.focus()
                }

                if (form.checkValidity() && phoneInputValue.length >= 11) {

                    event.preventDefault();

                    sendRequest('POST', requestUrl, {
                        name: nameInputValue,
                        phone: phoneInputValue,
                        time: timeSelectValue
                    })
                        .then(data => console.log(data))
                        .catch(err => console.log(err))

                }
            }, false)
        })
}

submitValidation()

function limit(element, max) {
    const max_chars = max;

    if (element.value.length > max_chars) {
        element.value = element.value.substr(0, max_chars);
    }
}

function noDigits(event) {
    if ("1234567890".indexOf(event.key) !== -1)
        event.preventDefault();
}

function redirect() {
    nameInput.focus()
}







