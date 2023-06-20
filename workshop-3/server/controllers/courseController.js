const Course = require("../models/courseModel");

/**
 * Creates a course
 *
 * @param {*} req
 * @param {*} res
 */
const coursePost = async (req, res) => {
  let course = new Course(req.body);
  await course.save()
    .then(course => {
      res.status(201); // CREATED
      res.header({
        'location': `/api/courses/?id=${course.id}`
      });
      res.json(course);
    })
    .catch(err => {
      res.status(422);
      console.log('error while saving the course', err);
      res.json({
        error: 'There was an error saving the course'
      });
    });
};

/**
 * Get all courses or one
 *
 * @param {*} req
 * @param {*} res
 */
const courseGet = (req, res) => {
  // if an specific course is required
  
  if (req.query) {
    if (req.query.id) {
      Course.findById(req.query.id).populate('teacher')
        .then((course) => {
          res.json(course);
        })
        .catch(err => {
          res.status(404);
          console.log('error while queryting the course', err)
          res.json({ error: "Course doesnt exist" })
        });
    } else if (req.query.name) {
      Course.find({ name: { $regex: '^' + req.query.name, $options: 'i' } })
        .sort({ name: req.query.sort })
        .exec((err, courses) => {
          if (err) {
            console.error(err);
            return;
          }

          res.json(courses);
        });
    }
  } else {
    // get all courses
    Course.find().populate('teacher')
      .then(courses => {
        res.json(courses);
      })
      .catch(err => {
        res.status(422);
        res.json({ "error": err });
      });
  }
};

module.exports = {
  coursePost,
  courseGet
}