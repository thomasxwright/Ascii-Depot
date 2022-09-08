// Create variables:
const deleteBtn = document.querySelectorAll('.del');
const copyBtn = document.querySelectorAll('.copy');

// Set event listeners:
Array.from(deleteBtn).forEach((el) => {
    el.addEventListener('click', deleteAscii);
})

Array.from(copyBtn).forEach((el) => {
    el.addEventListener('click', setClipboardToCanvas);
})


function setClipboardToCanvas() {
    // this.preventDefault()
    const id = this.parentNode.parentNode.parentNode.dataset.id
    let ascii = document.querySelector(`[data-id="${id}"]`).querySelector('pre').innerText
    navigator.clipboard.writeText(ascii)
    alert(`Copied the ASCII:\n${ascii}`);
}


async function deleteAscii() {
    const asciiId = this.parentNode.parentNode.parentNode.dataset.id
    try {
        const response = await fetch('asciis/deleteAscii', {
            method: 'delete',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'asciiId': asciiId
            })
        })

        const data = await response.json()
        console.log(data);
        location.reload();

    } catch (err) {
        console.log(err);
    }
}


/*
Color Theme change across the site:
*/
document.querySelector('.darkBtn').addEventListener('click', () => changeMode('dark'));
document.querySelector('.matrixBtn').addEventListener('click', () => changeMode('matrix'));
document.querySelector('.normalBtn').addEventListener('click', () => changeMode('normal'));

function changeMode(mode) {
    const body = document.querySelector('body');
    body.className = '';
    body.classList.add(mode);
}
