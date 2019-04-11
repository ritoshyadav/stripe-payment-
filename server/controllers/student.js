import StudentModel from './../model/schemas/student';
var { ObjectID } = require('mongodb');

// create new Student
function create(req, res) {
    var StudentCreate = new StudentModel({
        fullName: req.body.fullName,
        mob: req.body.mob,
        address: req.body.address,
        std: req.body.std,
        faculty: req.body.faculty,
        subjects: req.body.subjects,
        _creator: req.user._id
    });
    StudentCreate.save().then((student) => {
        res.status(200).send(student);
    }, (e) => {
        res.status(400).send(e);
    });
};

//Fetch data of Single Student by ID
function details(req, res) {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    StudentModel.findOne({
        _id: id,
        _creator: req.user._id,
        isDelete:false
    }).then((student) => {
        res.status(200).send(student)
    }, (e) => {
        res.status(404).send();
    });
};

// Fetch data Of student By Faculty 
function searchByFaculty(req, res){
    var sFaculty= req.body.faculty;

    StudentModel.find({
        faculty:sFaculty,
        _creator:req.user.id,
        isDelete:false
    }).then((students)=>{
        if(!students){
            return res.status(404).send();
        }
        res.send({students});
    }).catch((e)=>{
        res.status(400).send();
    });
};

// Fetch data Of student By Std 
function searchByStd(req, res){
    var Std= req.body.std;

    StudentModel.find({
        std:Std,
        _creator:req.user.id,
        isDelete:false
    }).then((students)=>{
        if(!students){
            return res.status(404).send();
        }
        res.send({students});
    }).catch((e)=>{
        res.status(400).send();
    });
};

// fetch data of student mobile no wise.
function searchByMob(req,res){
    var Mob=req.body.mob;
    StudentModel.find({
        mob:Mob,
        _creator:req.user._id,
        isDelete:false
    }).then((student) =>{
        if(!student){
            res.status(404).send();
        }
        res.status(200).send(student);
    },(e)=>{
        res.status(400).send();
    });
};

//fetch data of student name wise
function searchByName(req,res){
    var FullName=req.body.fullName;
    StudentModel.find({
        fullName:FullName,
        _creator:req.user._id,
        isDelete:false
    }).then((students) =>{
        if(!students){
            res.status(404).send();
        }
        res.status(200).send(students);
    },(e)=>{
        res.status(400).send();
    });
};

//fetch all student data
function list(req,res){
    StudentModel.find({
        _creator:req.user._id,
        isDelete:false
    }).then((students)=>{
        if(!students){
            res.status(404).send();
        }
        res.status(200).send(students);
    },(e)=>{
        res.status(400).send();
    });
};
export default {
    create,
    details,
    searchByFaculty,
    searchByStd,
    searchByMob,
    searchByName,
    list
}

