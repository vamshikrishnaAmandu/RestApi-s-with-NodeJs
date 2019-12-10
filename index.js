const express=require('express');
const app=express();
app.get('/',(req , res) => {
    res.send('Hello World !!!!');
});

app.get('/api/courses' , (req ,res) => {
    res.send([1,2,3,4])
})

// Route Parameters
app.get('/api/courses/:id' , (req , res) => {
res.send(req.params.id)
})

app.get('/api/courses/:month/:year' , (req , res) => {
    res.send(req.params)
    })


const port=process.env.PORT || 3000
app.listen(port , () => console.log(`Listing on port ${port} ....`));