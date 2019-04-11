import AssignModel from './../model/schemas/assign';
var { ObjectID } = require('mongodb');

//Create Assign tution to Teacher
function create(req, res) {
    console.log('welcome to controller')
    var AssignCeate = new AssignModel({
        assignDate: req.body.assignDate,
        studentID: req.body.studentID,
        teacherID: req.body.teacherID,
        assignConfirm: req.body.assignConfirm,
        assignConfirmDate: req.body.assignConfirmDate,
        paymetType: req.body.paymetType,
        _creator: req.user._id
    });
    AssignCeate.save().then((assignDeatils) => {
        res.status(200).send(assignDeatils);
    }, (e) => {
        res.status(400).send()
    });
};

//fetch single Assign Details
function details(req, res) {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    AssignModel.aggregate([
        {
            $match: {
                "_id": ObjectID(req.params.id),
                "_creator": ObjectID(req.user._id)
            }
        },
        {
            $lookup: {
                from: "students",
                localField: "studentID",
                foreignField: "_id",
                as: "studentDetails"
            }
        },
        {
            $lookup: {
                from: "teachers",
                localField: "teacherID",
                foreignField: "_id",
                as: "TeacherDetails"
            }
        }
    ]).then((assign) => {
        res.status(200).send(assign);
    }, (e) => {
        res.status(400).send();
    });
};

//fetch all assign tution 
function list(req, res) {
    AssignModel.aggregate([
        {
            $match: {
                "_creator": ObjectID(req.user._id)
            }
        },
        {
            $lookup: {
                from: "students",
                localField: "studentID",
                foreignField: "_id",
                as: "StudentsDetails"
            }
        },
        {
            $lookup: {
                from: "teachers",
                localField: "teacherID",
                foreignField: "_id",
                as: "TeacherDetails"
            }
        }
    ]).then((assigns) => {
        res.status(200).send(assigns);
    }, (e) => {
        res.status(400).send();
    });
};

// fetch data teacher wise
function searchByTeacherWise(req, res) {
    // var TeacherID=req.body.teacherID;
    AssignModel.aggregate([
        {
            $match: {
                "teacherID": ObjectID(req.body.teacherID),
                "_creator": ObjectID(req.user._id)
            }
        },
        {
            $lookup: {
                from: "students",
                localField: "studentID",
                foreignField: "_id",
                as: "StudentsDetails"
            }
        },
        {
            $lookup: {
                from: "teachers",
                localField: "teacherID",
                foreignField: "_id",
                as: "TeacherDetails"
            }
        }
        
    ]).then((assign) => {
        if (!assign) {
            res.status(404).send();
        }
        res.status(200).send(assign);
    }, (e) => {
        res.status(400).send();
    });

};

//searchByBoth (Teacher and Student) data search
function searchByBoth(req, res) {
    AssignModel.aggregate([
        {
            $match: {
                "studentID": ObjectID(req.body.studentID),
                "teacherID": ObjectID(req.body.teacherID),
                "_creator": ObjectID(req.user._id)
            }
        },
        {
            $lookup: {
                from: "students",
                localField: "studentID",
                foreignField: "_id",
                as: "StudentsDetails"
            }
        },
        {
            $lookup: {
                from: "teachers",
                localField: "teacherID",
                foreignField: "_id",
                as: "TeacherDetails"
            }
        }
    ]).then((assign) => {
        if (!assign) {
            res.status(404).send();
        }
        res.status(200).send(assign);
    }, (e) => {
        res.status(400).send();
    });
};


// fetch data Student wise
function searchByStudentWise(req, res) {
    // var StudentID=req.body.studentID;
    AssignModel.aggregate([
        {
            $match: {
                "studentID": ObjectID(req.body.studentID),
                "_creator": ObjectID(req.user._id)
            }
        },
        {
            $lookup: {
                from: "students",
                localField: "studentID",
                foreignField: "_id",
                as: "StudentsDetails"
            }
        },
        {
            $lookup: {
                from: "teachers",
                localField: "teacherID",
                foreignField: "_id",
                as: "TeacherDetails"
            }
        }
        
    ]).then((assign) => {
        if (!assign) {
            res.status(404).send();
        }
        res.status(200).send(assign);
    }, (e) => {
        res.status(400).send();
    });

};


export default {
    create,
    details,
    list,
    searchByTeacherWise,
    searchByBoth,
    searchByStudentWise
};