const dbSettings = {
  name: 'todos-vue',
  version: 1
}
const storeSettings = {
  name: 'tasks',
  storeOptions: { keyPath: 'id', autoIncrement: true },
  indexes: [
    { indexName: 'comment', unique: false },
    { indexName: 'status', unique: false }
  ]
}

const connectIDB = (resolve, reject) => {
  const request = indexedDB.open(dbSettings.name)

  request.onsuccess = (event) => {
    resolve(event.target.result)
  }

  request.onerror = () => {
    reject(new Error('db open error'))
  }

  request.onupgradeneeded = (event) => {
    const db = event.target.result

    if (Array.from(db.objectStoreNames).includes(storeSettings.name)) {
      db.deleteObjectStore(storeSettings.name, storeSettings.storeOptions)
    }

    const objectStore = db.createObjectStore(storeSettings.name, storeSettings.storeOptions)
    storeSettings.indexes.forEach((obj) => {
      objectStore.createIndex(obj.indexName, obj.indexName, { unique: obj.unique })
    })
  }
}

class Storage extends Promise {
  get (id) {
    return new Promise((resolve, reject) => {
      this.then((db) => {
        const transaction = db.transaction(storeSettings.name, 'readonly')
        const objectStore = transaction.objectStore(storeSettings.name)
        let request

        if (id) {
          request = objectStore.get(parseInt(id, 10))
        } else {
          request = objectStore.getAll()
        }

        request.onsuccess = (event) => resolve(event.target.result)
        request.onerror = () => reject(new Error('get error'))
      })
    })
  }

  post (task) {
    return new Promise((resolve, reject) => {
      this.then((db) => {
        const transaction = db.transaction(storeSettings.name, 'readwrite')
        const objectStore = transaction.objectStore(storeSettings.name)
        const request = objectStore.add(task)

        request.onsuccess = (event) => resolve(event.target.result)
        request.onerror = () => reject(new Error('post error'))
      })
    })
  }

  put (obj) {
    return new Promise((resolve, reject) => {
      this.then((db) => {
        const transaction = db.transaction(storeSettings.name, 'readwrite')
        const objectStore = transaction.objectStore(storeSettings.name)
        const request = objectStore.put(obj)

        request.onsuccess = (event) => resolve(event.target.result)
        request.onerror = () => reject(new Error('put error'))
      })
    })
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      this.then((db) => {
        const transaction = db.transaction(storeSettings.name, 'readwrite')
        const objectStore = transaction.objectStore(storeSettings.name)
        const request = objectStore.delete(parseInt(id, 10))

        request.onsuccess = (event) => resolve(event.type)
        request.onerror = () => reject(new Error('delete error'))
      })
    })
  }

  deleteDb () {
    return new Promise((resolve, reject) => {
      this.then((db) => {
        db.close()
        const request = indexedDB.deleteDatabase(dbSettings.name)

        request.onsuccess = (event) => {
          document.location.reload()
          resolve(event.type)
        }
        request.onblocked = () => {
          alert('errror! 複数タブでは実行できません。 タブを閉じてください')
        }
        request.onerror = () => reject(new Error('db delete error'))
      })
    })
  }
}

export default new Storage(connectIDB)
