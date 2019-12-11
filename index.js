const express=require('express');
const config=require('config');
const logger=require('./logger');
const Joi =require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const startupDebugger=require('debug')('app:startup');
const dbDebugger=require('debug')('app:db');
const app=express();
app.set('view engine' , 'pug')
app.set('views' , './views') //default no need to set
app.use(express.json()); // It parse the body of the request into json object set into req.body
app.use(helmet());
app.use(morgan('tiny'));

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
   startupDebugger('Morgan Enabled ......')
}
// dbDebugger('Connected database ......')
app.use(function(req ,res , next) {
    console.log('Authenticating ......')
    next();
});

app.use(logger);

// Configuration  --> npm i config if we set NODE_ENV=development it picks development.json for production picks production.json

console.log('Application name ::'+config.get('name'));
console.log('Mail Server ::'+config.get('mail.host'))
console.log('Mail Password ::'+config.get('mail.password'))
startupDebugger('startuo Enabled ......')  // npm i debug --> To Enable set env variable in windows set DEBUG=app:startup , in linux export  DEBUG=app:startup
                                           // To add multiple namespaces set DEBUG=app:startup,app:db or app:*
                                        // To disable set DEBUG=
dbDebugger('Connected database ......')


const courses=[
    {id:1 , name:'Angular'},
    {id:2 , name:'NodeJs'},
    {id:3 , name:'Java'}
]

app.get('/',(req , res) => {
    res.render('index' , {              // npm i pug -> template engine , in views folder index.pug
        title : 'My First App' ,
        message : 'Hello World'
    })
   // res.send('Hello World !!!!');
});

app.get('/api/courses' , (req ,res) => {
    res.send(courses)
})

//Post Request 

app.post('/api/courses' , (req ,res) => {

    const schema= {
        name : Joi.string().min(3).required()
    };
    const result=Joi.validate(req.body , schema);
    console.log(result);
    
    if(result.error){
        res.status(400).send(result.error);
        return;
    }

    const course= {
        id: courses.length + 1 ,
        name : req.body.name
    };
    courses.push(course);
    res.send(course);
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



    app.put('/api/courses/:id' , (req , res) => {

        const course=  courses.find(c => c.id === parseInt(req.params.id));
        if(!course) {
            console.log('Entered InSide if ()')
            res.status(404).send('Course is Not Found For Given Id ');
        }
       
        const result=validateCourse(req.body)
        if(result.error){
            res.status(400).send(result.error);
            return;
        }
    
        course.name=req.body.name;
        res.send(course)
        // update course 
        // return updated course

    })


    function validateCourse(course){
        const schema= {
            name : Joi.string().min(3).required()
        };
        return Joi.validate(course , schema);
    }

const port=process.env.PORT || 3000
app.listen(port , () => console.log(`Listing on port ${port} ....`));