import {initializeApp} from  "firebase-admin/app";
import { serviceAccount } from "../ServiceAccountKey.json" with {type: "json"}  ;


export const app = initializeApp({
    credential: cert(serviceAccount),
})

