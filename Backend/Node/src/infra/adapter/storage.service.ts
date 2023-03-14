import storage from 'node-persist';

let cacheStorage: typeof storage

export const getStorage = async () => {
    if (!cacheStorage) {
        await storage.init()
        cacheStorage = storage
    }
    return cacheStorage
}