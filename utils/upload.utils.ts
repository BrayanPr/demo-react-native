import { Platform } from 'react-native';
import Crypto from 'crypto-js'
import {apiSecret, apiKey, cloudName} from '../secrets'

const isIOS = Platform.OS === 'ios';

export async function UploadFile(file) {
    const ts = Math.round((new Date()).getTime() / 1000) as any;

    const uri = file.uri;
    const base64 = file.base64
    const type = 'image';
    const arr = file.uri.split('.');
    const ext = arr[arr.length - 1];

    console.log({base64})

    const name =  `${ts}.${ext}`;

    const photo = { uri, type, name } as any;
    const hash = `timestamp=${ts}${apiSecret}`;
    const signature = Crypto.SHA1(hash).toString();
    
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const formData = new FormData();
    formData.append('file', photo);
    formData.append('timestamp', ts);
    formData.append('timestamp', ts);
    formData.append('upload_preset', 'ml_default')

    formData.append('api_key', apiKey);
    formData.append('signature', signature);

    return fetch(url, {
        method: 'POST',
        body: formData,
    })
        .then(res => res.json())
        .catch(err => console.log(err ))

}