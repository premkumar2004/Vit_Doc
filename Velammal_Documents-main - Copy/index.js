// to fetch from database 

const express = require('express');
const mongoose=require("mongoose");
const app = express();

// const Toastify =require('toastify-js')

const PORT = 5001;
const multer = require('multer');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://yuvaraj0313:X7xYDWxajUbc8VVb@cluster0.26ivkzw.mongodb.net/Documents', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



const conn = mongoose.connection;
const itemSchema = new mongoose.Schema({
  authorName: { type: String },
  publishedDate: { type: Date},
  patentTitle:{type:String},
  patentStatus:{type:String},
  Department:{type:String},
  iprApplicationNumber:{type:String},
  data: Buffer,
  contentType: String
});

const loginSchema= new mongoose.Schema({
  Username:{type:String},
  Email:{type:String},
  Password:{type:String},
 
  
  
})
const conferenceSchema = new mongoose.Schema({
  Department:{type:String},
  authorName: { type: String },
  paperTitle:{type:String},
  conferenceName:{type:String},
  scopusIndexed:{type:String},
  
  data:String
});
const booksSchema = new mongoose.Schema({
  aurthorName:{type:String},
  bookTitle: { type: String },
  paperTitle:{type:String},
  proceedingsOfTheConference:{type:String},
  conferenceName:{type:String},
  NationalInternational:{type:String},
  year:{type:String},
  issn:{type:String},
  publisherName:String,
  Department:{type:String},
});


const articleSchema = new mongoose.Schema({
  paperTitle:String,
  authorName: { type: String },
  Department:{type:String},
  journalName:{type:String},
  year:{type:String},
  ISSNNumber:{type:String},
  
  data:String
});



const projectSchema = new mongoose.Schema({
  inventorName:String,
  projectTitle:String,
  Investigators: { type: String },
  Department:{type:String},
  fundingAgency:{type:String},
  amount:{type:String},
  CompletionDate:{type:String},

  
});

                
                   




app.use(express.static('views'));
const Item = mongoose.model('items', itemSchema,

);
const Login = mongoose.model('login', loginSchema

);
const Conference = mongoose.model('Confernces', conferenceSchema

);
const article = mongoose.model('article', articleSchema

);
const books = mongoose.model('books', booksSchema

);
const project = mongoose.model('project', projectSchema

);






app.set('view engine', 'ejs');


app.get('/admin', async (req, res) => {
  
  try {
    const totalCount = await Item.countDocuments({});
    const items = await Item.find();
    let i=1;
  
   
    await res.render('index', {items,totalCount,i});
   
    
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});
app.get('/Conferenceadmin', async (req, res) => {
  
  try {
    const totalCount = await Conference.countDocuments({});
    const items = await Conference.find();
  
   
   
    await res.render('adminconference', {items,totalCount});
   
    
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});
app.get('/articleadmin', async (req, res) => {
  
  try {
    const totalCount = await article.countDocuments({});
    const items = await article.find();
  
   console.log(items)
   
    await res.render('articleadmin', {items,totalCount});
   
    
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});


app.get('/booksadmin', async (req, res) => {
  
  try {
    const totalCount = await books.countDocuments({});
    const items = await books.find();
    console.log(items)
   
   
    await res.render('booksadmin', {items,totalCount});
   
    
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});


app.get('/projectadmin', async (req, res) => {
  
  try {
    const totalCount = await project.countDocuments({});
    const items = await project.find();
    console.log(items)
   
   
    await res.render('projectadmin', {items,totalCount});
   
    
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});













app.get('/cards', async (req, res) => {
  
  try {
    
    items=''
    await res.render('cards', {items});
   
    
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});
app.get('/cardsAdmin', async (req, res) => {
  
  try {
    
    items=''
    await res.render('cardsAdmin', {items});
   
    
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  
  try {
    const textToDisplay = "";
    await res.render('login' ,{textToDisplay});
    
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});


app.post('/', async (req, res) => {


  try {
    
    const Email = req.body.Email;
    const Password=req.body.Password;
    const use=req.body.userType;
    const secretkey=req.body.secretKey;
    
    const user = await Login.findOne({Email:Email}) ;
    const user_pass = await Login.findOne({Password:Password}) ;
    console.log(user)
    
   
    if (secretkey==="vitpatents" && user && user_pass) {
      return res.redirect('/cardsAdmin');
      // Redirect to a page for valid email
      
    } 
    if (user && user_pass && secretkey!=="vitpatents" && use==='Admin'){
      const textToDisplay = "SecretKey Entered Wrong";
       await res.render('login', {textToDisplay});
      
      
      
    }
    if(user && user_pass && use==='User'){
      return res.redirect('/cards')
    }
    else{
      const textToDisplay = "You are Not registred";
      await res.render('login', {textToDisplay});

     
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
}
  )


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(bodyParser.urlencoded({ extended: false }));




app.get('/store', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/conferencestore', (req, res) => {
  res.sendFile(__dirname + '/ConfernceStore.html');
});
app.get('/articlestore', (req, res) => {
  res.sendFile(__dirname + '/article.html');
});
app.get('/booksstore', (req, res) => {
  res.sendFile(__dirname + '/books.html');
});
app.get('/projectstore', (req, res) => {
  res.sendFile(__dirname + '/project.html');
});






app.get('/patentsubmit', (req, res) => {
  res.sendFile(__dirname + '/submit.html');
});

app.post('/patentsubmit',upload.single('patentFile') ,async (req, res) => {
  if (!req.file) {
                 return res.status(400).send('No file uploaded.');
             }
    const  authorName  = req.body.authorName;
    const  publishedDate  = req.body.publishedDate;
    const  patentTitle  = req.body.patentTitle;
    const  iprApplicationNumber  = req.body.iprApplicationNumber;
   const patentStatus=req.body.patentStatus;
   const Department=req.body.Department;

    try {
       //await Items.insertMany({ authorName,publishedDate ,});

        const newFormData = new Item({
            authorName:authorName,
            publishedDate:publishedDate,
            patentTitle:patentTitle,
            patentStatus:patentStatus,
            iprApplicationNumber:iprApplicationNumber,
            Department:Department,
            data: req.file.buffer,
            contentType: req.file.mimetype
            
        });
        await newFormData.save();
        res.sendFile(__dirname + '/views/submit.html');
        
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred.');
    }
});




app.get('/bookssubmit', (req, res) => {
  res.sendFile(__dirname + '/submit.html');
});

app.post('/bookssubmit',upload.single('patentFile') ,async (req, res) => {

    const  authorName  = req.body.aurthorName;
    const  bookTitle  = req.body.bookTitle;
    const  paperTitle  = req.body.paperTitle;
    const  proceedingsOfTheConference  = req.body.proceedingsOfTheConference;
   const conferenceName=req.body.conferenceName;
   const NationalInternational=req.body.NationalInternational;
   const year=req.body.year;
   const issn=req.body.issn;
   const publisherName=req.body.publisherName;
   const Department=req.body.Department;

    try {
       //await Items.insertMany({ authorName,publishedDate ,});

        const newFormData = new books({
          aurthorName:authorName,
            bookTitle:bookTitle,
            paperTitle:paperTitle,
            proceedingsOfTheConference:proceedingsOfTheConference,
            conferenceName:conferenceName,
            NationalInternational:NationalInternational,
            year:year,
            issn:issn,
            publisherName:publisherName,
            Department:Department


          
            
        });
        await newFormData.save();
        res.sendFile(__dirname + '/views/submit.html');
        
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred.');
    }
});






app.get('/articlesubmit', (req, res) => {
  res.sendFile(__dirname + '/submit.html');
});

app.post('/articlesubmit',async (req, res) => {
 
    const  patentTitle  = req.body.patentTitle;
    const  authorName  = req.body.authorName;
    const  Department  = req.body.Department;
    const  journalName  = req.body.journalName;
   const year=req.body.year;
   const issn=req.body.issn;
   const data=req.body.articleLink

    try {
       //await Items.insertMany({ authorName,publishedDate ,});
      
       
       
        const newFormData = new article({
          paperTitle:patentTitle,
          authorName:authorName,
          Department:Department,
          journalName:journalName,
          year:year,
          ISSNNumber:issn,
          data:data,
            
            
        });
        await newFormData.save();
        res.sendFile(__dirname + '/views/submit.html');
        
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred.');
    }
});




app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/register', async (req, res) => {
  
  try {
    const textToDisplay = "";
   await res.render('reg', {textToDisplay});
    
    
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});
app.get('/submit', (req, res) => {
  res.sendFile(__dirname + '/submit.html');
});
app.post('/submit',upload.single('patentFile') ,async (req, res) => {
  
    const  authorName  = req.body.authorName;
    
    const  paperTitle  = req.body.patentTitle;
    const   scoupous= req.body.Scoupous;
   const conname=req.body.conferencename;
   const Department=req.body.Department;
   const link=req.body.conferenceLink

    try {
       //await Items.insertMany({ authorName,publishedDate ,});

        const newFormData = new Conference({
          
Department:Department,
authorName: authorName,
paperTitle:paperTitle,
conferenceName:conname,
scopusIndexed:scoupous,
data:link

            
        });
        await newFormData.save();
        res.sendFile(__dirname + '/views/submit.html');
        
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred.');
    }
});





app.get('/projectsubmit', (req, res) => {
  res.sendFile(__dirname + '/submit.html');
});
app.post('/projectsubmit',async (req, res) => {
  
    const  inventorName  = req.body.inventorName;
    
    const  Investigators  = req.body.Investigators;
    const projectTitle =req.body.projectTitle;
    const   Department= req.body.Department;
   const fundingAgency=req.body.fundingAgency;
   const amount=req.body.amount;
   const CompletionDate=req.body.CompletionDate

    try {
       //await Items.insertMany({ authorName,publishedDate ,});

        const newFormData = new project({
          inventorName:inventorName,
          projectTitle:projectTitle,
          Investigators: Investigators,
          Department:Department,
          fundingAgency:fundingAgency,
          amount:amount,
          CompletionDate:CompletionDate,

            
        });
        await newFormData.save();
        res.sendFile(__dirname + '/views/submit.html');
        
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred.');
    }
});




app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/register', async (req, res) => {
  
  try {
    const textToDisplay = "";
   await res.render('reg', {textToDisplay});
    
    
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.post('/register', async (req, res) => {
  try{
 const username=req.body.Username
 const email=req.body.Email
 const password=req.body.Password

 const newLogin = new Login({
  Username:username,
  Email:email,
  Password:password
  
});
await newLogin.save();


const textToDisplay = "You are registred";
await res.render('reg', {textToDisplay});



  }
  catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
}
});


app.get('/view/:fileId', async (req, res) => {
  const fileId = req.params.fileId;
  
  try {
      const patent = await Item.findById(fileId);
      
      if (!patent) {
          return res.status(404).send('File not found');
      }
      
      const pdfData = patent.data; // Assuming 'patentFile' is the field name where the PDF data is stored
      const pdfBuffer = Buffer.from(pdfData.buffer, 'base64');
      
      res.set('Content-Type', 'application/pdf');
      res.send(pdfBuffer);
  } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred.');
  }
});

app.get('/reg', async (req, res) => {
  
  try {
    const textToDisplay = "";
   await res.render('details', {textToDisplay});
    
    
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});



//to have a table
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/table', async (req, res) => {
  try {
    const totalCount = await Item.countDocuments({});
    let j=1;
    const items = await Item.find();

    await res.render('table', {totalCount,items,j});
    
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }

  
});

app.post('/table',async (req, res) => {
  try {
    
    const FilterDepartment=req.body.Department
    const totalCount = await Item.countDocuments({Department:req.body.Department});
    console.log(FilterDepartment)
    const items = await Item.find({Department:FilterDepartment});
   let j=1
    await res.render('table', {totalCount,items,j});
    
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }

  
});

app.get('/projecttable', async (req, res) => {
  try {
    const totalCount = await project.countDocuments({});
    let j=1;
    const items = await project.find();

    await res.render('projecttable', {totalCount,items,j});
    
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }

  
});

app.post('/projecttable',async (req, res) => {
  try {
    
    const FilterDepartment=req.body.Department
    const totalCount = await project.countDocuments({Department:req.body.Department});
    console.log(FilterDepartment)
    const items = await project.find({Department:FilterDepartment});
   let j=1
    await res.render('projecttable', {totalCount,items,j});
    
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }

  
});



app.get('/Conferencetable', async (req, res) => {
  try {
    const totalCount = await Conference.countDocuments({});
    let j=1;
    const items = await Conference.find();

    await res.render('Conferencetable', {totalCount,items,j});
    
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }

  
});
app.post('/Conferencetable',async (req, res) => {
  try {
    
    const FilterDepartment=req.body.Department
    const totalCount = await Conference.countDocuments({Department:req.body.Department});
    console.log(FilterDepartment)
    const items = await Conference.find({Department:FilterDepartment});
    console.log(items)
    await res.render('Conferencetable', {totalCount,items});
    
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }

  
});





app.get('/articletable', async (req, res) => {
  try {
    const totalCount = await article.countDocuments({});
    let j=1;
    const items = await article.find();
     console.log(items)
    await res.render('articletable', {totalCount,items,j});
    
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }

  
});
app.post('/articletable',async (req, res) => {
  try {
    
    const FilterDepartment=req.body.Department
    const totalCount = await article.countDocuments({Department:req.body.Department});
    console.log(FilterDepartment)
    const items = await article.find({Department:FilterDepartment});
    console.log(items)
    await res.render('articletable', {totalCount,items});
    
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }

  
});

app.get('/bookstable', async (req, res) => {
  try {
    const totalCount = await books.countDocuments({});
    let j=1;
    const items = await books.find();

    await res.render('bookstable', {totalCount,items,j});
    
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }

  
});

app.post('/bookstable',async (req, res) => {
  try {
    
    const FilterDepartment=req.body.Department
    const totalCount = await books.countDocuments({Department:req.body.Department});
    console.log(FilterDepartment)
    const items = await books.find({Department:FilterDepartment});
   let j=1
    await res.render('bookstable', {totalCount,items,j});
    
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }

  
});





const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const { array } = require('mongoose/lib/utils');






const canvasRenderService = new ChartJSNodeCanvas({ width: 800, height: 400});

app.get('/chart', async (req, res) => {
  try {
    // Fetch data from MongoDB using Mongoose
    const data = await Item.find().exec();
   let arr=[]
    // Process the data if necessary
    const labels =['IT','CSE','MECH','MTS','EEE','ECE']
    for (var i=0;i<6;i++){
      const totalCount = await Item.countDocuments({Department:labels[i]});
      arr.push(totalCount)
       

    }
    


    const values =arr
    console.log(values)

    // Create a bar chart using Chart.js Node Canvas
    const configuration = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Data from MongoDB',
          data: values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',   // Red
            'rgba(54, 162, 235, 0.5)',  // Blue
            'rgba(255, 206, 86, 0.5)',  // Yellow
            'rgba(75, 192, 192, 0.5)',  // Teal
            'rgba(204, 255, 204, 0.7)',  // Pastel Green
            'rgba(255, 204, 255, 0.7)',  // Pastel Purple
            
          ],
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    };

    // Render the chart
    const image = await canvasRenderService.renderToBuffer(configuration);
    res.contentType('image/png').send(image);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data from MongoDB.');
  }
});


app.get('/bookschart', async (req, res) => {
  try {
    // Fetch data from MongoDB using Mongoose
    const data = await books.find().exec();
   let arr=[]
    // Process the data if necessary
    const labels =['IT','CSE','MECH','MTS','EEE','ECE']
    for (var i=0;i<6;i++){
      const totalCount = await books.countDocuments({Department:labels[i]});
      arr.push(totalCount)
       

    }
    


    const values =arr
    console.log(values)

    // Create a bar chart using Chart.js Node Canvas
    const configuration = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Data from MongoDB',
          data: values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',   // Red
            'rgba(54, 162, 235, 0.5)',  // Blue
            'rgba(255, 206, 86, 0.5)',  // Yellow
            'rgba(75, 192, 192, 0.5)',  // Teal
            'rgba(204, 255, 204, 0.7)',  // Pastel Green
            'rgba(255, 204, 255, 0.7)',  // Pastel Purple
            
          ],
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    };

    // Render the chart
    const image = await canvasRenderService.renderToBuffer(configuration);
    res.contentType('image/png').send(image);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data from MongoDB.');
  }
});


app.get('/projectchart', async (req, res) => {
  try {
    // Fetch data from MongoDB using Mongoose
    const data = await project.find().exec();
   let arr=[]
    // Process the data if necessary
    const labels =['IT','CSE','MECH','MTS','EEE','ECE']
    for (var i=0;i<6;i++){
      const totalCount = await project.countDocuments({Department:labels[i]});
      arr.push(totalCount)
       

    }
    


    const values =arr
    console.log(values)

    // Create a bar chart using Chart.js Node Canvas
    const configuration = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Data from MongoDB',
          data: values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',   // Red
            'rgba(54, 162, 235, 0.5)',  // Blue
            'rgba(255, 206, 86, 0.5)',  // Yellow
            'rgba(75, 192, 192, 0.5)',  // Teal
            'rgba(204, 255, 204, 0.7)',  // Pastel Green
            'rgba(255, 204, 255, 0.7)',  // Pastel Purple
            
          ],
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    };

    // Render the chart
    const image = await canvasRenderService.renderToBuffer(configuration);
    res.contentType('image/png').send(image);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data from MongoDB.');
  }
});










app.get('/conferencechart', async (req, res) => {
  try {
    // Fetch data from MongoDB using Mongoose
    const data = await Conference.find().exec();
   let arr=[]
    // Process the data if necessary
    const labels =['IT','CSE','MECH','MTS','EEE','ECE']
    for (var i=0;i<6;i++){
      const totalCount = await Conference.countDocuments({Department:labels[i]});
      arr.push(totalCount)
       

    }
    


    const values =arr
    console.log(values)

    // Create a bar chart using Chart.js Node Canvas
    const configuration = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Data from MongoDB',
          data: values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',   // Red
            'rgba(54, 162, 235, 0.5)',  // Blue
            'rgba(255, 206, 86, 0.5)',  // Yellow
            'rgba(75, 192, 192, 0.5)',  // Teal
            'rgba(204, 255, 204, 0.7)',  // Pastel Green
            'rgba(255, 204, 255, 0.7)',  // Pastel Purple
            
          ],
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    };

    // Render the chart
    const image = await canvasRenderService.renderToBuffer(configuration);
    res.contentType('image/png').send(image);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data from MongoDB.');
  }
});



app.get('/articlechart', async (req, res) => {
  try {
    // Fetch data from MongoDB using Mongoose
    const data = await article.find().exec();
   let arr=[]
    // Process the data if necessary
    const labels =['IT','CSE','MECH','MTS','EEE','ECE']
    for (var i=0;i<6;i++){
      const totalCount = await article.countDocuments({Department:labels[i]});
      arr.push(totalCount)
       

    }
    


    const values =arr
    console.log(values)

    // Create a bar chart using Chart.js Node Canvas
    const configuration = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Data from MongoDB',
          data: values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',   // Red
            'rgba(54, 162, 235, 0.5)',  // Blue
            'rgba(255, 206, 86, 0.5)',  // Yellow
            'rgba(75, 192, 192, 0.5)',  // Teal
            'rgba(204, 255, 204, 0.7)',  // Pastel Green
            'rgba(255, 204, 255, 0.7)',  // Pastel Purple
            
          ],
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    };

    // Render the chart
    const image = await canvasRenderService.renderToBuffer(configuration);
    res.contentType('image/png').send(image);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving data from MongoDB.');
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
