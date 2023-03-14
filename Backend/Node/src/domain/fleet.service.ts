import uniqid from 'uniqid';
import { getStorage } from '../infra/adapter/storage.service';
import { VehicleError } from './helper/vehicle-error.enum';
import { Vehicle } from './vehicle.service';

export interface Fleet{
    id: string
    vehicles: Vehicle[]
    userId: string
}

export const createNewFleet = async (userId: string): Promise<Fleet> => {
    const storage = await getStorage()
    const id = `fleet-${uniqid()}`
    const fleet = {
        id,
        vehicles: [],
        userId
    } as Fleet

    await storage.setItem(id, fleet)
    return fleet
}

export const addVehicleToFleet = async (fleetId: string, vehicle: Vehicle): Promise<void> => {
    const storage = await getStorage()
    const fleet = await storage.getItem(fleetId)
    if (fleet) {
        if (await findVehicleInFleet(vehicle.id, fleet.id)) {
            throw VehicleError.VEHICLE_ALREADY_REGISTERED
        }
        fleet.vehicles.push(vehicle)
        await storage.updateItem(fleetId, fleet)
    }
}

export const deleteFleet = async (fleetId: string): Promise<void> => {
    const storage = await getStorage()
    await storage.removeItem(fleetId)
}

export const findVehicleInFleet = async (vehicleId: string, fleetId: string): Promise<Vehicle|void> => {
    const storage = await getStorage()
    const fleet = await storage.getItem(fleetId) as Fleet;

    if (fleet) {
        const vehicle = fleet?.vehicles.find((vehicle: Vehicle) => vehicle.id === vehicleId)
        return vehicle
    }
        
}

