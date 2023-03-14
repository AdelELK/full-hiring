import { Given, Then, When } from "@cucumber/cucumber"
import { addVehicleToFleet, createNewFleet, findVehicleInFleet } from "../../src/domain/fleet.service"
import { Vehicle } from "../../src/domain/vehicle.service"
import { VehicleError } from "../../src/domain/helper/vehicle-error.enum"
import { deepStrictEqual, strictEqual } from "assert"

When('I register this vehicle into my fleet', async function () {
  try {
    await addVehicleToFleet(this.fleet.id, this.vehicle)
  } catch (ex) { /* empty */ }
})

When('I try to register this vehicle into my fleet', async function () {
  try {
    await addVehicleToFleet(this.fleet.id, this.vehicle)
  } catch (ex) {
    this.lastError = ex
  }
})

Then('I should be informed that this vehicle has already been registered into my fleet', function () {
  strictEqual(this.lastError, VehicleError.VEHICLE_ALREADY_REGISTERED)
})

Then('this vehicle should be part of my vehicle fleet', async function () {
  const vehicleFound = await findVehicleInFleet(this.vehicle.id, this.fleet.id) as Vehicle;
  deepStrictEqual(vehicleFound, this.vehicle)
})

Given('the fleet of another user', async function () {
  this.anotherFleet = await createNewFleet('another_fleet')
});

Given(`this vehicle has been registered into the other user's fleet`, async function () {
  await addVehicleToFleet(this.anotherFleet.id, this.vehicle)
})
