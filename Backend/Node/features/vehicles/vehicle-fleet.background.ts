import { After, Before, Given } from "@cucumber/cucumber"
import { addVehicleToFleet, createNewFleet, deleteFleet } from "../../src/domain/fleet.service"
import { createNewVehicle } from "../../src/domain/vehicle.service"

Before(function () {
    // Here we initialize our state
    this.fleet = null
    this.vehicle = null
    this.latLng = []
  })
  
  After(function () {
    // We delete everything by just deleting the fleet
    deleteFleet(this.fleet.id)
  })
  
  Given('a vehicle', async function () {
    this.vehicle = await createNewVehicle({
      plateNumber: 'my_plate_number',
      latLng: []
    })
  })
  
  Given('my fleet', async function() {
    this.fleet = await createNewFleet('my_fleet')
  });

  Given('I have registered this vehicle into my fleet', async function () {
    await addVehicleToFleet(this.fleet.id, this.vehicle)
  })