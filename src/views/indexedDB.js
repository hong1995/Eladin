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
        let db = e.target.result;
        let objectStore = db.createObjectStore('product', { keyPath: '_id' });
      };

      request.onsuccess = (e) => {
        db = e.target.result;
        resolve();
      };

      request.onerror = (e) => {
        console.error('indexedDB : ', e.target.errorCode);
      };
    }
  });
}

// 데이터 추가
function writeDB(dbName, book) {
  return new Promise(function (resolve, reject) {
    const request = indexedDB.open(dbName);

    request.onsuccess = (e) => {
      const db = e.target.result;

      // product ObjectStore에 읽기쓰기 권한으로 트랜잭션 생성
      const transaction = db.transaction(['product'], 'readwrite');

      transaction.oncomplete = (e) => {
        console.log('done');
      };

      transaction.onerror = (e) => {
        console.log('fail');
      };

      const objectStore = transaction.objectStore('product');
      const request = objectStore.add(book);

      request.onsuccess = (e) => {
        console.log(e.target.result);
        resolve();
      };
    };

    request.onerror = (e) => {
      console.error('indexedDB : ', e.target.errorCode);
    };
  });
}

// 모든 데이터 조회
function getAllDB(dbName) {
  let item;

  return new Promise(function (resolve, reject) {
    const request = indexedDB.open(dbName);

    request.onsuccess = (e) => {
      const db = e.target.result;
      const transaction = db.transaction('product');

      transaction.oncomplete = (e) => {
        console.log('done');
        resolve(item);
      };

      transaction.onerror = (e) => {
        console.log('fail');
      };

      const objectStore = transaction.objectStore('product');
      const request = objectStore.getAll();

      request.onsuccess = (e) => {
        item = e.target.result;
      };
    };

    request.onerror = (e) => {
      console.error('indexedDB : ', e.target.errorCode);
    };
  });
}

// 데이터 모두 삭제
function clearAllDB(dbName) {
  return new Promise(function (resolve, reject) {
    const request = indexedDB.open(dbName);

    request.onsuccess = (e) => {
      const db = e.target.result;
      const transaction = db.transaction('product', 'readwrite');

      transaction.oncomplete = (e) => {
        console.log('done');
      };

      transaction.onerror = (e) => {
        console.log('fail');
      };

      const objectStore = transaction.objectStore('product');
      const request = objectStore.clear();

      request.onsuccess = (e) => {
        console.log('삭제완료');
      };
    };

    request.onerror = (e) => {
      console.error('indexedDB : ', e.target.errorCode);
    };
  });
}

export { createDB, writeDB, getAllDB, clearAllDB };
