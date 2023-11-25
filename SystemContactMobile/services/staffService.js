import { Platform } from 'react-native';

const baseUrl = getServerAddress();

export function getStaffFromApi(){
    const relUrl = '/api/staff/all'
    return fetch (new URL(relUrl,baseUrl))
    .then((response)=>{
        if(response.ok){
            return response.json();
        }
        console.error('Error fetching staff data:', error);
        throw error;
    })
}

export function getStaffById(staffId){
    const fullUrl = new URL('/api/staff', baseUrl);
    fullUrl.searchParams.append('id', staffId);

    return fetch(fullUrl).then((response) => response.json());
}

export function postStaffToApi(fullName, imageUrl,departmentId, phoneNumber, houseLot, street, suburb, postcode,state){
    const relUrl ='/api/staff'

    return fetch(new URL(relUrl,baseUrl),
    {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            fullName:fullName,
            imageUrl:imageUrl,
            departmentId: departmentId,
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
export function updateStaffToApi(staffToUpdate){
    const {id, fullName, imageUrl,departmentId, phoneNumber, houseLot, street, suburb, postcode, state} = staffToUpdate;
    const fullUrl = new URL('/api/staff', baseUrl);
    return fetch(fullUrl, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            fullName:fullName,
            imageUrl:imageUrl,
            departmentId:departmentId,
            phoneNumber:phoneNumber,
            houseLot:houseLot,
            street:street,
            suburb:suburb,
            postcode:postcode,
            state:state 
        })
    }).then(response => {
        if (response.ok) {
            console.log('Saved')
        } else {
            return Promise.reject(new Error('Did not save staff correctly!'));
        }
    });
}
export async function getDepartmentsFromApi() {
    const fullUrl = new URL('/api/departments', baseUrl);

    const response = await fetch(fullUrl);

    return response.json();
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