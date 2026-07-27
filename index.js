const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());

let students = [];
let nextId = 1;


// app.get = ('/' , (req,res)=>{
//     res.send('Welcome to Students Management ');
// });

app.post('/students', (req,res) => {
const { name, age, subject, department } = req.body;

if(!name){
    return res.status(400).json({ message: 'name is required'});
}

const newStudent={
    id: nextId++,
    name,
    age,
    subject,
    department 
};

students.push(newStudent);
res.status(201).json(newStudent);
});


app.get('/students' ,(req ,res)=>{
    res.json(students);
});


app.get('/students/:id', (req,res)=>{
    const studentId= parseInt(req.params.id);
 
    const student=students.find(s => s.id === studentId);
 
    if(!student){
    return 
    res.status(404).json({message: 'student not found'});
    }
        res.json(student);
});

app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`);
});

// To UPDATE a student by ID
app.put('/students/:id', (req,res)=>{
    const studentId= parseInt(req.params.id);
    
    const{name, age, subject , department}=req.body;

    // 1. Find the student
    const studentIndex= students.findIndex(s => s.id === studentId);

    if(studentIndex === -1){
        return
     res.status(404).json({message: 'student not found'});
    };

    // 2. Update the student. keep old data if new data wasn't sent

    students[studentIndex]={
        id: studentId,
        name: name || students[studentIndex].name,   
        age: age || students[studentIndex].age,
        subject:subject  || students[studentIndex].subject, 
        department: department ||students[studentIndex].department
    };

    res.json(students[studentIndex]);
});


//  DELETE a student by ID
app.delete('/students/:id',(req,res)=>{
    const studentId =parseInt(req.params.id);

    //  1. Find the student
    const studentIndex= students.findIndex(s => s.id === studentId);
    if(studentIndex === -1){
        return res.status(404).json({ message: 'student not found'});
    }

    // 2. Remove the student from the array
    const deletedstudent= students.splice(studentIndex, 1); 
    //  splice removes 1 item

    res.json({message: 'student deleted successfully',
        student: deletedstudent[0]
        // splice returns the array,so we take[0]
    });
});

