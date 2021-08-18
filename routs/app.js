const express=require('express')
const bodyParser = require("body-parser");
const http=require('http')
const socketIO = require('socket.io');
const fs=require('fs')
const app = express();
const server = http.Server(app);
const io = socketIO(server);
const upload=require('./multer-test');
const { urlencoded } = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs')
class book{
    constructor(title,description,authors,favorite,fileCover,fileName,fileBook){  
    this.id=arr.length+1
    this.title= title,
    this.description= description,
    this.authors= authors,
    this.favorite= favorite,
    this.fileCover=fileCover,
    this.fileName=fileName,
    this.fileBook=fileBook
  }}
let arr=[]
let book1=new book(1,2,3,4,5,6,7)
arr.push(book1)

app.post('/user/login',(req,res)=>{
    res.send('{ id: 1, mail: "test@mail.ru" }').statusCode=201
}
)

app.get('/api/books',(req,res)=>{
    res.render('index',{
        arr: arr
    })
})

app.get('/api/books/:id', (req, res) => {
    const {id}=req.params
    const idx=arr.findIndex(el=>el.id==id)
    if(idx==-1) {
        res.status(404).render("404",{});   
    }
    
    else{
        res.render('view',{
            arr:arr,
            id:idx
        })
    }
})
app.post('/api/books',upload.single('fileBook'),(req,res)=>{
    res.render('create',{
        arr:arr,
        book:book})
    const {title,description,authors,favorite,fileCover,fileName,fileBook} = req.body
    const abc=new book(title,description,authors,favorite,fileCover,fileName,fileBook)
    arr.push(abc)
    if(upload.single) {
        abc.fileBook='True'
    }
    else {
        abc.fileBook='False'
    }
})
app.post('/api/post/books/:id',(req,res)=>{
    const {id}=req.params
    const idx = arr.findIndex(el => el.id == id);
    var url='api/books/'+id
    if (idx!=-1) {
        res.render('update',{
            arr:arr,
            id:idx,
            book:book,
            url:url
        })
            const {title,description,authors,favorite,fileCover,fileName,fileBook} = req.body
            arr.pop(idx)
            arr[idx]=new book(title,description,authors,favorite,fileCover,fileName,fileBook)
    }
    else if (idx==-1) {
        res.render('404',{})
    } 
})
app.put('/api/books/:id',upload.single('fileBook'),(req,res)=>{
    const {id}=req.params
    const idx = arr.findIndex(el => el.id == id);
    if (idx!=-1) {
        const {title,description,authors,favorite,fileCover,fileName,fileBook} = req.body
        
        arr.pop(idx)
        arr[idx]=new book(title,description,authors,favorite,fileCover,fileName,fileBook)
        res.send(arr[idx])
    }
    else {
        res.status(404).send('not found')
    } 
})
app.delete('/api/books/:id', (req, res) => {
    const {id} = req.params;
    const idx = arr.findIndex(el => el.id === id);                                                                            
    if (idx!==-1) {
        arr.splice(idx,1,)
        res.send('ok')
    }
    else{
       res.status(404).send('not found')
    }
});
app.get('/api/books/:id/download',(req,res) =>{
    let {id}=req.params
    const idx = arr.findIndex(el => el.id == id);
    if (idx!=-1) {
        fs.writeFile('qwer.txt',Object.entries(arr[idx]).map(([k,v])=>`${k}: ${v}`).join(', '),(err)=>console.log(err))
        fs.routerendFileSync('qwer.txt','Привет!')
        res.download(__dirname+'C:\Nodejs\date.js','qwertyuiop1',(err)=>console.log(err)).send('ok')
    }
    else{
        res.status(404).send('not found')
    }
})
io.on('connection', (socket) => {
    const {id} = socket;
    console.log(`Socket connected: ${id}`);

    socket.on('message-to-me', (msg) => {
        msg.type = 'me';
        socket.emit('message-to-me', msg);
    });

    socket.on('message-to-all', (msg) => {
        msg.type = 'all';
        socket.broadcast.emit('message-to-all', msg);
        socket.emit('message-to-all', msg);
    });

    const {roomName} = socket.handshake.query;
    console.log(`Socket roomName: ${roomName}`);
    socket.join(roomName);
    socket.on('message-to-room', (msg) => {
        msg.type = `room: ${roomName}`;
        socket.to(roomName).emit('message-to-room', msg);
        socket.emit('message-to-room', msg);
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${id}`);
    });
});
const PORT = process.env.PORT || 3001;
server.listen(3000, () => {
    console.log('Server start');
});
//module.exports=router