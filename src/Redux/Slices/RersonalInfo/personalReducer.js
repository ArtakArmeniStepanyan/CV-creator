let initialState = {
    image: '',
    name: '',
    lastName: '',
    email: '',
    role: '',
    about: '',
    birthDate: '',
    genderSwitch: false,
    gender: 'Male',
    phone: '',
    secondPhone: '',
    country: '',
    city: '',
    address: '',
    driverLicenseSwitch: false,
    driverLicense: [],
    militarySwitch: false,
    military: 'Yes',
    maritalStatus: 'Married',
    maritalStatusSwitch: false,
    isLoading: false 
}

const personalReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD-IMAGE':
            return{
                ...state,
                image: action.payload
            }
        case 'REMOVE-IMAGE':
            return{
                ...state,
                image: ''
            }
        case 'SET-NAME':
            return{
                    ...state,
                    name: action.payload
                }
        case 'SET-LASTNAME':
            return{
                ...state,
                lastName: action.payload
            }
        case 'SET-EMAIL':
            return{
                    ...state,
                    email: action.payload
                }
        case 'SET-ROLE':
            return{
                    ...state,
                    role: action.payload
                }
        case 'SET-ABOUT':
            return{
                    ...state,
                    about: action.payload
                }
        case 'SET-BIRTH-DAY':
            return{
                    ...state,
                    birthDate: action.payload
                }
        case 'SWITCH-GENDER-SWITCHER':
            return{
                    ...state,
                    genderSwitch: !state.genderSwitch
                }
        case 'SET-GENDER':
            return{
                    ...state,
                    gender: action.payload
                }
        case 'SET-PHONE':
            return{
                    ...state,
                    phone: action.payload
                }
        case 'SET-SECOND-PHONE':
            return{
                    ...state,
                    secondPhone: action.payload
                }
        case 'SET-COUNTRY':
            return{
                    ...state,
                    country: action.payload
                }      
        case 'SET-CITY':
            return{
                    ...state,
                    city: action.payload
                }  
        case 'SET-ADDRESS':
            return{
                    ...state,
                    address: action.payload
                } 
        case 'SWITCH-DRIVER-LICENSE-SWITCHER':
            return{
                    ...state,
                    driverLicenseSwitch: !state.driverLicenseSwitch
                } 
        case 'SET-DRIVER-LICENSE':
            return{
                    ...state,
                    driverLicense:[... action.payload]
                } 
        case 'SWITCH-MILITARY-SWITCHER':
            return{
                    ...state,
                    militarySwitch: !state.militarySwitch
                }
        case 'SET-MILITARY':
            return{
                    ...state,
                    military: action.payload
                }
        case 'SWITCH-MARITAL-STATUS-SWITCHER':
            return{
                    ...state,
                    maritalStatusSwitch: !state.maritalStatusSwitch
                }
        case 'SET-MARITAL-STATUS':
            return{
                    ...state,
                    maritalStatus: action.payload
                }
        case 'SET-IS-LOADING':
            return{
                    ...state,
                    isLoading: !state.isLoading
                }
        default:
            return state;
        }
}


//AC`s
export const addImageAC = (image) => {
    return {type: 'ADD-IMAGE', payload: image}
};
export const removeImageAC = () => {
    return {type: 'REMOVE-IMAGE'}
};
export const setNameAC = (name) => {
    return {type: 'SET-NAME', payload: name}
};
export const setLastNameAC = (lastName) => {
    return {type: 'SET-LASTNAME', payload: lastName}
} 
export const setEmailAC = (email) => {
    return {type: 'SET-EMAIL', payload: email}
} 
export const setRoleAC = (role) => {
    return {type: 'SET-ROLE', payload: role}
}
export const setAboutAC = (about) => {
    return {type: 'SET-ABOUT', payload: about}
}
export const setBirthDayAC = (day) => {
    return {type: 'SET-BIRTH-DAY', payload: day}
}
export const setGenderSwitcherAC = () => {
    return {type: 'SWITCH-GENDER-SWITCHER'}
}
export const setGenderAC = (gender) => {
    return {type: 'SET-GENDER', payload: gender}
}
export const setPhoneAC = (phone) => {
    return {type: 'SET-PHONE', payload: phone}
}
export const setSecondPhoneAC = (phone) => {
    return {type: 'SET-SECOND-PHONE', payload: phone}
}
export const setCountryAC = (country) => {
    return {type: 'SET-COUNTRY', payload: country}
}
export const setCityAC = (city) => {
    return {type: 'SET-CITY', payload: city}
}
export const setAddressAC = (address) => {
    return {type: 'SET-ADDRESS', payload: address}
}
export const setDriverLicenseSwitcherAC = () => {
    return {type: 'SWITCH-DRIVER-LICENSE-SWITCHER'}
}
export const setDriverLicenseAC = (licenses) => {
    return {type: 'SET-DRIVER-LICENSE', payload: licenses}
}
export const setMilitarySwitcherAC = () => {
    return {type: 'SWITCH-MILITARY-SWITCHER'}
}
export const setMilitaryAC = (military) => {
    return {type: 'SET-MILITARY', payload: military}
}
export const setMaritalStatusSwitcherAC = () => {
    return {type: 'SWITCH-MARITAL-STATUS-SWITCHER'}
}
export const setMaritalStatusAC = (status) => {
    return {type: 'SET-MARITAL-STATUS', payload: status}
}
export const setIsLoadingAC = () => {
    return {type: 'SET-IS-LOADING'}
}

export default personalReducer;

