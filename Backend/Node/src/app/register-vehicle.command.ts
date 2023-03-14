import type { Arguments } from 'yargs'
import { addVehicleToFleet } from '../domain/fleet.service'
import { createNewVehicle } from '../domain/vehicle.service'

type Options = {
  fleetId: string
  vehiclePlateNumber: string
};

export const command = 'register-vehicle <fleetId> <vehiclePlateNumber>'
export const desc = 'Register a vehicle with its plate number in the given fleet'

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { fleetId, vehiclePlateNumber } = argv;
  const vehicle = createNewVehicle({
    plateNumber: vehiclePlateNumber
  })
  let message = `Vehicle ${vehicle.id} has been added successfully!`
  try {
    await addVehicleToFleet(fleetId, vehicle)
  } catch (ex) {
    message = String(ex)
  }
  process.stdout.write(message)
  process.exit(0);
};