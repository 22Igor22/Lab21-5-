function lockRmvBtn() {
    const fio = document.getElementsByName('fio')[0].value;
    const button = document.getElementsByClassName('rmvBtn')[0];
    if (fio.length > 1) {
        button.disabled = true; 
    }
}

function create() {
    const fio = document.getElementsByName('fio')[0].value;
    const number = document.getElementsByName('number')[0].value;
    const error = document.getElementsByClassName('error')[0];
    if (!fio || !number) {
        error.innerHTML = 'Check information!!! Wrong data';
        return;
    }
    if (!/\+375\(\d{2}\)\d{3}\-\d{2}\-\d{2}$/.test(number)) {
        error.innerHTML = 'Wrong phone number!!! Pattern: +375(xx)xxx-xx-xx';
        return;
    }

    fetch('/add',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fio, number })
        }).then(response => response.json())
        .then(() => window.location.href = '/');
}

function update() {
    const id = document.getElementsByClassName('editContainer')[0].getAttribute('data-key');
    const fio = document.getElementsByName('fio')[0].value;
    const number = document.getElementsByName('number')[0].value;
    const error = document.getElementsByClassName('error')[0];

    if (!fio || !number) {
        error.innerHTML = 'Write some info!!!';
        return;
    }

    if (!/\+375\(\d{2}\)\d{3}\-\d{2}\-\d{2}$/.test(number)) {
        error.innerHTML = 'Wrong phone number!!! Pattern: +375(xx)xxx-xx-xx';
        return;
    }

    fetch('/update',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, fio, number })
        }).then(response => response.json())
        .then(() => window.location.href = '/');
}

function remove() {
    const fio = document.getElementsByName('fio')[0].value;
    const number = document.getElementsByName('number')[0].value;
    const id = document.getElementsByClassName('editContainer')[0].getAttribute('data-key');
    const error = document.getElementsByClassName('error')[0];

    if (!id) return;

    fetch('/delete',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, fio, number })
        }).then(response => response.json())
        .then(() => window.location.href = '/');
}