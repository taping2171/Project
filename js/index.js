const socket = io(); //socket.io를 불러오는 부분 

let lunch = document.getElementById('lunchInput');
let lunchData;

const loadLunch = () => {
    socket.emit('pushSearch')
    console.log(document.getElementById('lunchInput').value)
};

const printAll = (meal, length) => {
    let value = ""
    for (let index = 0; index < length; index++) {
        value = value + `<br>${meal[index]}<br>`;
        value = value.replace("amp;", "");
    }
    console.log(value)
    return value
}

socket.on('apiSuccess', (data) => {
    console.log('========================');
    console.log('apiSucess Req connected');
    console.log('========================');
    lunchData = data;
    lunch.innerHTML = printAll(data, Object.keys(data).length);
    console.log(Object.keys(data).length)
    console.log(data)
});

window.onload = loadLunch