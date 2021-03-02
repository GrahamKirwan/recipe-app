import {TIMEOUT_SEC} from './config.js'

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  }; 

export const getJSON = async function(url) {
    try {
        // This will create a race between our API call promise and a allocated timer (to stop fetch taking too long)
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        // const res = await fetch(url);
        const data = await res.json();
    
        if(!res.ok) throw new Error(`${data.message} (${res.status})`);    
        return data;
    } catch(err) {
        //This propogates the error down from this async function to where its called by re-throwing the error
        throw err;
    }

}