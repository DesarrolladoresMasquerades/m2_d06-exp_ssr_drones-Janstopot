const express = require('express');
const router = express.Router();

const Drone = require("../models/Drone.model")

// require the Drone model here

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
  .then((drone)=>{
    console.log(drone.length)
    res.render("drones/list", {drone})
  })
  .catch((err)=>console.log("DB error reading 'Drones'"))
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form")
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  const name = req.body.name
  const propellers = req.body.propellers
  const maxSpeed = req.body.maxSpeed

  Drone.create({name, propellers, maxSpeed})
  .then(()=>res.redirect("/drones"))
  .catch((err)=>console.log("DB error creating a drone"))
});

router.get('/drones/:id/update-form', (req, res, next) => {
  // Iteration #4: Update the drone
  const id = req.params.id
  Drone.findById(id)
  .then(drone=>{
    res.render("drones/update-form", drone)
  })
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const id = req.params.id
  const name = req.body.name
  const propellers = req.body.propellers
  const maxSpeed = req.body.maxSpeed

  Drone.findByIdAndUpdate(
    id,
    {name, propellers, maxSpeed},
    {new:true}
  ).then((editedDrone)=>{
    res.redirect("/drones")
  })
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  const id = req.params.id
  Drone.findByIdAndDelete(id)
  .then(()=>{
    console.log("DELETEEEED")
    res.redirect("/drones")
  })
});

module.exports = router;
