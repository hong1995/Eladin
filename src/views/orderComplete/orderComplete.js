import * as Api from '../api.js';
import { getAllDB, clearAllDB } from '../indexedDB.js';

// **주문된 상품이면 cartDB에서도 제거되도록 구현 필요?

clearAllDB('buy');
