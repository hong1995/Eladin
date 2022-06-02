// indexedDB 생성
function createDB(dbName) {
  return new Promise(function (resolve, reject) {
    const indexedDB = window.indexedDB;

    // 브라우저에서 지원하는지 체크
    if (!indexedDB) {
      window.alert('해당 브라우저에서는 indexedDB를 지원하지 않습니다.');
    } else {
      const request = indexedDB.open(dbName);
      let db;

      request.onupgradeneeded = (e) => {
        db = e.target.result;
        const objectStore = db.createObjectStore('product', { keyPath: '_id' });
      };

      request.onsuccess = (e) => {
        db = e.target.result;
        resolve(true);
      };

      request.onerror = (e) => {
        reject(e.target.error);
      };
    }
  });
}

// 데이터 추가
function writeDB(dbName, book) {
  return new Promise(function (resolve, reject) {
    const request = indexedDB.open(dbName);
    let db;

    request.onupgradeneeded = (e) => {
      alert('upgraed is called');
      db = e.target.result;
      const objectStore = db.createObjectStore('product', { keyPath: '_id' });
    };

    request.onsuccess = (e) => {
      db = e.target.result;

      // product ObjectStore에 읽기쓰기 권한으로 트랜잭션 생성
      const transaction = db.transaction(['product'], 'readwrite');

      transaction.oncomplete = (e) => {
        resolve(true);
      };

      transaction.onerror = (e) => {
        reject(e.target.error);
      };

      const objectStore = transaction.objectStore('product');
      const request = objectStore.add(book);

      request.onsuccess = (e) => {
        resolve(true);
      };
    };

    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
}

// 데이터 조회
function getDB(dbName, key) {
  let item;

  return new Promise(function (resolve, reject) {
    const request = indexedDB.open(dbName);
    let db;

    request.onupgradeneeded = (e) => {
      alert('upgraed is called');
      db = e.target.result;
      const objectStore = db.createObjectStore('product', { keyPath: '_id' });
    };

    request.onsuccess = (e) => {
      db = e.target.result;
      const transaction = db.transaction('product');

      transaction.oncomplete = (e) => {
        resolve(item);
      };

      transaction.onerror = (e) => {
        reject(e.target.error);
      };

      const objectStore = transaction.objectStore('product');
      const request = objectStore.get(key);

      request.onsuccess = (e) => {
        item = e.target.result;
      };
    };

    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
}

// 모든 데이터 조회
function getAllDB(dbName) {
  let item;

  return new Promise(function (resolve, reject) {
    const request = indexedDB.open(dbName);
    let db;

    request.onupgradeneeded = (e) => {
      db = e.target.result;
      const objectStore = db.createObjectStore('product', { keyPath: '_id' });
    };

    request.onsuccess = (e) => {
      db = e.target.result;
      const transaction = db.transaction('product');

      transaction.oncomplete = (e) => {
        resolve(item);
      };

      transaction.onerror = (e) => {
        reject(e.target.error);
      };

      const objectStore = transaction.objectStore('product');
      const request = objectStore.getAll();

      request.onsuccess = (e) => {
        item = e.target.result;
      };
    };

    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
}

// 데이터 수정
function updateDB(dbName, key, value) {
  return new Promise(function (resolve, reject) {
    const request = indexedDB.open(dbName);
    let db;

    request.onupgradeneeded = (e) => {
      alert('upgraed is called');
      db = e.target.result;
      const objectStore = db.createObjectStore('product', { keyPath: '_id' });
    };

    request.onsuccess = (e) => {
      db = e.target.result;
      const transaction = db.transaction('product', 'readwrite');

      transaction.oncomplete = (e) => {
        resolve(true);
      };

      transaction.onerror = (e) => {
        reject(e.target.error);
      };

      const objectStore = transaction.objectStore('product');
      const request = objectStore.get(key);

      request.onsuccess = (e) => {
        const updateRequest = objectStore.put(value);

        updateRequest.onerror = (e) => reject(e.target.error);
        updateRequest.onsuccess = (e) => resolve(true);
      };
    };

    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
}

// 데이터 삭제
function deleteDB(dbName, key) {
  return new Promise(function (resolve, reject) {
    const request = indexedDB.open(dbName);
    let db;

    request.onupgradeneeded = (e) => {
      db = e.target.result;
      const objectStore = db.createObjectStore('product', { keyPath: '_id' });
    };

    request.onsuccess = (e) => {
      db = e.target.result;
      const transaction = db.transaction('product', 'readwrite');

      transaction.oncomplete = (e) => {
        resolve(true);
      };

      transaction.onerror = (e) => {
        reject(e.target.error);
      };

      const objectStore = transaction.objectStore('product');
      const request = objectStore.delete(key);

      request.onsuccess = (e) => {
        resolve(true);
      };
    };

    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
}

// 모든 데이터 삭제
function clearAllDB(dbName) {
  return new Promise(function (resolve, reject) {
    const request = indexedDB.open(dbName);
    let db;

    request.onupgradeneeded = (e) => {
      db = e.target.result;
      const objectStore = db.createObjectStore('product', { keyPath: '_id' });
    };

    request.onsuccess = (e) => {
      db = e.target.result;
      const transaction = db.transaction('product', 'readwrite');

      transaction.oncomplete = (e) => {
        resolve(true);
      };

      transaction.onerror = (e) => {
        reject(e.target.error);
      };

      const objectStore = transaction.objectStore('product');
      const request = objectStore.clear();

      request.onsuccess = (e) => {
        resolve(true);
      };
    };

    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
}

export { createDB, writeDB, updateDB, getDB, getAllDB, deleteDB, clearAllDB };
