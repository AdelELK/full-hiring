import type { Arguments } from 'yargs';
import { localizeVehicleByPlateNumber } from '../domain/vehicle.service';

type Options = {
    fleetId: string
    vehiclePlateNumber: string
    lat: number
    lng: number
};

export const command = 'localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng>'
export const desc = 'Localize a vehicle in the given coordinates'

export const handler = async (argv: Arguments<Options>): Promise<void> => {
    const { fleetId, vehiclePlateNumber, lat, lng } = argv
    let message = `Vehicle with platenumber ${vehiclePlateNumber} has been localized successfully!`
    try {
        await localizeVehicleByPlateNumber(fleetId, vehiclePlateNumber, [lat, lng])
    } catch (ex) {
        message = String(ex)
    }
  process.stdout.write(message)
  process.exit(0)
};