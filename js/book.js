function createBookData() {
    let title = document.getElementById('title').value;
    let writer = document.getElementById('writer').value;
    let publisher = document.getElementById('publisher').value;
    let isbn = document.getElementById('isbn').value;
    let subject = document.getElementById('subject').value;
    let numPages = document.getElementById('numPages').value;
    let allAvailabilityValues = document.getElementsByName('availability');
    //in case of checkbox we have to take array
    //let availability = [];
    let availability;
    allAvailabilityValues.forEach((node) => {
        if (node.checked) {
            //in case of checkbox we have to push the value
            //availability.push(node.value)
            availability = node.value;
        }
    })
    let obj = {
        title: title,
        writer: writer,
        publisher: publisher,
        isbn: isbn,
        subject: subject,
        availability: availability,
        numPages: numPages
    }
    fetch("http://localhost:3000/books", {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
}


function getBooksData() {
    fetch("http://localhost:3000/books")
        .then((res) => res.json())
        .then((data) => {
            let tBody = document.getElementById('tBody')
            let templates = ''
            for (let i = 0; i < data.length; i++) {
                templates = templates + getRowTemplate(data[i])
            }
            tBody.innerHTML = templates;
        })
}

function getRowTemplate(obj) {
    let template = `
    <tr>
        <td>${obj.title}</td>
        <td>${obj.writer}</td>
        <td>${obj.publisher}</td>
        <td>${obj.isbn}</td>
        <td>${obj.subject}</td>
        <td>${obj.availability}</td>
        <td>${obj.numPages}</td>
    </tr> 
    `
    return template;
}

function goToUrl(relativeUrl) {
    location.href = relativeUrl;
}