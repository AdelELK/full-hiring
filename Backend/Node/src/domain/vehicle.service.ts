import uniqid from "uniqid";
import { getStorage } from "../infra/adapter/storage.service";
import { findVehicleInFleet, Fleet } from "./fleet.service";
import { VehicleError } from "./helper/vehicle-error.enum";

export type LatLng = Array<number>

export interface VehicleOptions {
    plateNumber: string
    latLng?: LatLng
}

export interface Vehicle extends VehicleOptions {
    id: string
}

export const createNewVehicle = (options: VehicleOptions): Vehicle => ({
    id: `vehicle-${uniqid()}`,
    plateNumber: options.plateNumber,
    latLng: options.latLng ?? []
})

export const getVehicleByPlateNumber = async (fleetId: string, plateNumber: string): Promise<Vehicle | undefined> => {
    const storage = await getStorage()
    const fleet = await storage.getItem(fleetId) as Fleet
    let vehicle = undefined
    if (fleet) {
        vehicle = fleet.vehicles.find(vehicle => vehicle.plateNumber == plateNumber)
    }

    return vehicle
}

export const localizeVehicleByPlateNumber = async (fleetId: string, plateNumber: string, latLng: LatLng): Promise<Vehicle | undefined> => {
    const vehicle = await getVehicleByPlateNumber(fleetId, plateNumber)
    if (vehicle) {
        return updateVehicle(fleetId, vehicle.id, { latLng })
    } else {
        throw VehicleError.VEHICLE_NOT_FOUND
    }
}

export const updateVehicle = async (fleetId: string, vehicleId: string, updateOptions: Partial<VehicleOptions>): Promise<Vehicle|undefined> => {
    const storage = await getStorage()
    const fleet = await storage.getItem(fleetId) as Fleet
    const vehicle = await findVehicleInFleet(vehicleId, fleetId)

    if (vehicle) {
        if (JSON.stringify(vehicle.latLng) === JSON.stringify(updateOptions?.latLng)) {
            throw VehicleError.VEHICLE_ALREADY_PARKED_AT_LOCATION
        }
        const updatedVehicle = {...vehicle, ...updateOptions}
        const updatedFleetVehicles = fleet.vehicles.map(vehicle => vehicle.id == vehicleId ? updatedVehicle : vehicle) as Vehicle[]
        const updatedFleet = { ...fleet, vehicles: updatedFleetVehicles }
        await storage.updateItem(fleetId, updatedFleet)

        return updatedVehicle
    } else {
        throw VehicleError.VEHICLE_NOT_FOUND
    }
}
