import { Platform } from 'react-native';

const baseUrl = getServerAddress();
export function postStaffToApi(id, fullName, imageUrl, phoneNumber, houseLot, street, suburb, postcode,state){
    const relUrl ='/api/staff'

    return fetch(new URL(relUrl,baseUrl),
    {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            id:id,
            fullName:fullName,
            imageUrl:imageUrl,
            phoneNumber:phoneNumber,
            houseLot:houseLot,
            street:street,
            suburb:suburb,
            postcode:postcode,
            state:state 
        })
    }).then(response =>{
        if (response.ok) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error('There was an error saving data to the file'));
        } 
    })
}   
function getServerAddress() {
    if (Platform.OS === "web") {
        return 'http://localhost:3000'
    } else if (Platform.OS === "android") {
        return 'http://10.0.2.2:3000';
    } else {
        throw new Error("Unsupported platform!");
    }
}