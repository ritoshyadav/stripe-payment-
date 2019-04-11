
import Teachermodel from './../model/schemas/teacher';
import bodyParser from 'body-parser';
import Authenticate from './authenticate';
import _ from 'lodash';
var { ObjectID } = require('mongodb');


function create(req, res) {
    // var body=_.pick(req.body,['name','mobile','gstno','address',`_creator:req.user.id`])
    var teacherCreate = new Teachermodel({
        fullName: req.body.fullName,
        mob: req.body.mob,
        address: req.body.address,
        faculty:req.body.faculty, 
        skills:req.body.skills,
        _creator: req.user._id
    });
    teacherCreate.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
};


function list(req, res) {
    Teachermodel.find({
        _creator: req.user._id
    }).then((teacher) => {
        res.send({ teacher });
    }, (e) => {
        res.Status(400).send(e);
    });
};

// // GET /todos/1243
// app.get('/todos/:id', authenticate, 
function details(req, res) {
    var id = req.params.id;
    console.log(id)

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Teachermodel.findOne({
        _id: id,
        _creator: req.user._id
    }).then((teacher) => {
        if (!teacher) {
            return res.status(404).send();
        }
        res.send({ teacher });
    }).catch((e) => {
        res.status(400).send();
    });
};

function searchByFaculty(req, res){
    var sFaculty= req.body.faculty;

    Teachermodel.find({
        faculty:sFaculty,
        _creator:req.user.id
    }).then((teachers)=>{
        if(!teachers){
            return res.status(404).send();
        }
        res.send({teachers});
    }).catch((e)=>{
        res.status(400).send();
    });
};

// app.delete('/todos/:id', authenticate, 
// function del(req, res) {
//     var id = req.params.id;
//     console.log(id)

//     if(!ObjectID.isValid(id)){
//         return res.status(404).send();
//     }

//     Teachermodel.findByIdAndRemove({
//         _id:id,
//         _creator:req.user._id
//     }).then((teacher)=>{
//         if(!teacher){
//            return res.status(404).send();
//         }
//         res.send({teacher});
//     }).catch((e)=>{
//         res.status(400).send();
//     });
// };


// app.patch('/todos/:id', authenticate, 
function update(req, res) {

    var id = req.params.id;

    var body = _.pick(req.body, ['fullName', 'mob', 'address','faculty','skills']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Teachermodel.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, { new: true }).then((customer) => {
        // Todo.findByIdAndUpdate(id, {$set: body},{new: true}).then((todo) =>{

        if (!teacher) {
            return res.status(404).send();
        }
        res.send({ teacher });
    }).catch((e) => {
        res.status(400).send();
    })
};

//fetch data of teacher name wise
function searchByName(req,res){
    var FullName=req.body.fullName;
    Teachermodel.find({
        fullName:FullName,
        _creator:req.user._id
    }).then((teachers) =>{
        if(!teachers){
            res.status(404).send();
        }
        res.status(200).send(teachers);
    },(e)=>{
        res.status(400).send();
    });
};

export default {
    create,
    update,
    details,
    list,
    searchByFaculty,
    searchByName
};
