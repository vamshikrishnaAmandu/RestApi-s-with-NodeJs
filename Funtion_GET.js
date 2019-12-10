const express=require('express');
const app=express();
const courses=[
    {id:1 , name:'Angular'},
    {id:2 , name:'NodeJs'},
    {id:3 , name:'Java'}
]

app.get('/',(req , res) => {
    res.send('Hello World !!!!');
});

app.get('/api/courses' , (req ,res) => {
    res.send(courses)
})

// Route Parameters
app.get('/api/courses/:id' , (req , res) => {
  const course=  courses.find(c => c.id === parseInt(req.params.id));
  if(!course) {
      console.log('Entered InSide if ()')
      res.status(404).send('Course is Not Found For Given Id ');
  }
  console.log('Out Side if ()')
res.send(course)
})

app.get('/api/courses/:month/:year' , (req , res) => {
    res.send(req.params)
    })


const port=process.env.PORT || 5000
app.listen(port , () => console.log(`Listing on port ${port} ....`));