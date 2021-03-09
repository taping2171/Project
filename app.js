const express = require('express');//express 모듈 추가
const request = require('request');//request 모듈 추가

const app = express();
const cors = require('cors');
const path = require('path');

const socket = require('http').createServer(app);
const io = require('socket.io')(socket);

const port = 8000;


app.use('/img', express.static('./img'));
app.use('/css', express.static('./css'));
app.use('/js', express.static('./js'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let d = new Date();

function getTimeStamp() {


    var s =
        leadingZeros(d.getFullYear(), 4) + '.' +
        leadingZeros(d.getMonth() + 1, 2) + '.' +
        leadingZeros(d.getDate(), 2);

    return s;
}

function leadingZeros(n, digits) {

    var zero = '';
    n = n.toString();

    if (n.length < digits) {
        for (let i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
}


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))

    // console.log(lunch)



});

io.on('connection', (socket) => {
    socket.on('pushSearch', () => {
        console.log('========================');
        console.log('pushSearch Req connected');
        console.log('========================');
        let url = "http://222.110.147.50:3012/getmeal"
        let day = d.getDay();
        let sendDay = getTimeStamp();
        // console.log(sendDay)
        // console.log(day)
    
        //post 요청
        let jsonDataObj = {
            "code": 2,
            "ymd": sendDay,
            "weekday": day
        }
        let options = {
            url: url,
            method: 'POST',
            body: jsonDataObj,
            json: true //json으로 보낼경우 true로 해주어야 header값이 json으로 설정됩니다.
        };
    
        // console.log(options)

        request.post(options, (error, response, body) => {
            socket.emit('apiSuccess', body);
            console.log('socket.emit succeed', body)

            if (error) {
                console.log(error)
            }
        });
    })
});

socket.listen(port, () => {
    console.log(`${port}번 포트에서 웹서버 실행중`);
    console.log(`http://localhost:${port}/`)
});
