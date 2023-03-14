import { Before, Given, Then, When } from "@cucumber/cucumber"
import { strictEqual } from "assert"
import { VehicleError } from "../../src/domain/helper/vehicle-error.enum"
import { LatLng, updateVehicle } from "../../src/domain/vehicle.service"

Before(function () {
    // Here we initialize our state
    this.latLng = [] as LatLng
    this.lastError = null
})

Given('a location', function () {
    this.latLng = [45.763420, 4.834277]
})

When('I park my vehicle at this location', async function () {
    this.vehicle = await updateVehicle(this.fleet.id, this.vehicle.id, { latLng: this.latLng })
})

Given('my vehicle has been parked into this location', async function () {
    this.vehicle = await updateVehicle(this.fleet.id, this.vehicle.id, { latLng: this.latLng })
})

When('I try to park my vehicle at this location', async function () {
    try {
        this.vehicle = await updateVehicle(this.fleet.id, this.vehicle.id, { latLng: this.latLng })
    } catch (ex) {
        this.lastError = ex
    }
})

Then('I should be informed that my vehicle is already parked at this location', function () {
    strictEqual(this.lastError, VehicleError.VEHICLE_ALREADY_PARKED_AT_LOCATION)
})

Then('the known location of my vehicle should verify this location', function () {
    strictEqual(this.vehicle.latLng, this.latLng)
})