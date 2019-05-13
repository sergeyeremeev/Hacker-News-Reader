import { reject } from "q";

const checkIndexedDBExists = () => {
    if (!('indexedDB' in window)) {
        return false;
    }

    return true;
};

export const idbUpdateDatabase = (objStoreName, method, idx, data, db) => {
    if (!checkIndexedDBExists) {
        return;
    }
    
    const tx = db.transaction(objStoreName, 'readwrite');
    const objStore = tx.objectStore(objStoreName);
    let requestUpdate;

    if (method === 'put') {
        requestUpdate = objStore.put(data, idx);
    } else if (method === 'add') {
        requestUpdate = objStore.add(data);
    }

    requestUpdate.onerror = () => {
        console.log(`Error updating ${objStoreName} record`);
    };

    requestUpdate.onsuccess = () => {
        console.log(`${objStoreName} have been successfully updated`);
    };
};

export const idbClearDatabase = (objStoreName, db) => {
    if (!checkIndexedDBExists) {
        return;
    }
    
    const tx = db.transaction(objStoreName, 'readwrite');
    const objStore = tx.objectStore(objStoreName);
    const request = objStore.clear();

    request.onsuccess = (e) => {
        console.log(e.target.result);
    };
}

export const idbReadData = (objStoreName, idx, dbName) => {
    return new Promise(resolve => {
        if (!checkIndexedDBExists) {
            reject(new Error('indexedDB is not available'));
        }
    
        const request = window.indexedDB.open(dbName);
        let db;
    
        request.onsuccess = () => {
            db = request.result;
            const tx = db.transaction(objStoreName, 'readonly');
            const objStore = tx.objectStore(objStoreName);
            const storeRequest = objStore.get(idx);
    
            storeRequest.onsuccess = () => {
                resolve(storeRequest.result);
            };

            storeRequest.onerror = () => {
                reject(new Error('Error while fetching data from database'));
            };
        };

        request.onerror = () => {
            reject(new Error('Error while fetching data from database'));
        };
    });
};
