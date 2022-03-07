/* 
!--Kervin Legaspi
        301117960
        COMP 229 Web Application Development
        Midterm_Group2
    --> */

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// call the movies model
let movies = require('../models/movies');

/* GET movies List page. READ */
router.get('/', (req, res, next) => {
  // find all movie in the books collection
  movies.find( (err, list) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('movies/index', {
        title: 'Movies',
        list: list
      });
    }
  });

});

//  GET the Movies Details page in order to add a new Movies
router.get('/add', (req, res, next) => {

    res.render('movies/details', {title: 'Movies', list : list})

});

// POST process the Movies Details page and create a new Movies - CREATE
router.post('/add', (req, res, next) => {

      let newMovie = Movie({
        "title" : req.body.title,
        "description" : req.body.description,
        "releasedDate" : req.body.releasedDate,
        "director" : req.body.director,
        "genre" : req.body.genre
      })

      Movie.create(newMovie, (err, Movie) =>{
        if(err)
        {
          console.log(err);
          res.end(err);
        }
        else
        {
          res.redirect('/movies')
        }
                
      })

});

// GET the Movies Details page in order to edit an existing Movies
router.get('/details/:id', (req, res, next) => {

    let id = req.params.id;

    Movie.findById(id,(err, BookToEdit) => {
      if(err){
        console.log(err);
        res.end(err);
      }
      else
      {
        res.render('/movies/details', {title: 'Edit Movies', list: list});
      }
    })
});

// POST - process the information passed from the details form and update the document
router.post('/details/:id', (req, res, next) => {

  let id = req.params.id;
  let updatedMovie = Movie({
    "_id" : id,
    "title" : req.body.title,
    "description" : req.body.description,
    "releasedDate" : req.body.releasedDate,
    "director" : req.body.director,
    "genre" : req.body.genre
  })

  Movie.updateOne({_id:id}, updatedMovie, (err) =>{
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.redirect('/movies')
    }
            
  })

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id;
  Movie.remove({_id:id}, (err) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect('/movies');
    }
  })
});


module.exports = router;
