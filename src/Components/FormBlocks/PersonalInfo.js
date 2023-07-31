import { Form, Button, Accordion } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {
     addImageAC, 
     removeImageAC, 
     setNameAC,
     setLastNameAC,
     setEmailAC,
     setRoleAC,
     setAboutAC,
     setBirthDayAC,
     setGenderSwitcherAC,
     setGenderAC,
     setPhoneAC,
     setSecondPhoneAC,
     setCountryAC,
     setCityAC,
     setAddressAC,
     setDriverLicenseSwitcherAC,
     setDriverLicenseAC,
     setMilitarySwitcherAC,
     setMilitaryAC,
     setMaritalStatusSwitcherAC,
     setMaritalStatusAC
    } from '../../Redux/Slices/RersonalInfo/personalReducer';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const PersonalInfo = () => {
    const acceptedImageFormats = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    const dispatch = useDispatch(); 

    const onImageChange = (event) => {  
        if (event.target.files && event.target.files[0] && acceptedImageFormats.includes(event.target.files[0].type)) {
            dispatch(addImageAC(URL.createObjectURL(event.target.files[0])));
        }
    }
    const onRemoveImage = () => {
        dispatch(removeImageAC());
    }
    const onNameChange = (name) => {
        dispatch(setNameAC(name));
    }
    const onLastNameChange = (lastName) => {
        dispatch(setLastNameAC(lastName));
    }
    const onEmailChange = (email) => {
        dispatch(setEmailAC(email));
    }
    const onRoleChange = (role) => {
        dispatch(setRoleAC(role));
    }
    const onAboutChange = (about) => {
        dispatch(setAboutAC(about));
    }
    const onBirthDayChange = (birthDay) => {
        dispatch(setBirthDayAC(birthDay));
    }
    const onGenderSwitcherChange = () => {
        dispatch(setGenderSwitcherAC());
    }
    const onGenderChange = (gender) => {
        dispatch(setGenderAC(gender));
    }
    const onPhoneChange = (phone) => {
        dispatch(setPhoneAC(phone));
    }
    const onSecondPhoneChange = (phone) => {
        dispatch(setSecondPhoneAC(phone));
    }
    const onCountryChange = (country) => {
        dispatch(setCountryAC(country));
    }
    const onCityChange = (city) => {
        dispatch(setCityAC(city));
    }
    const onAddressChange = (address) => {
        dispatch(setAddressAC(address));
    }
    const onDriverLicenseSwitcherChange = () => {
        dispatch(setDriverLicenseSwitcherAC());
    };

    let licenseArray = [];
    const onDriverLicenseChange = (event) => {  
        if(event.target.checked){
            licenseArray.push(event.target.value);
        } 
        else if(!event.target.checked){
            licenseArray = licenseArray.filter(val => val !== event.target.value)
        } 
        licenseArray.sort();
        dispatch(setDriverLicenseAC(licenseArray));
    }

    const onMilitarySwitcherChange = () => {
        dispatch(setMilitarySwitcherAC());
    }
    const onMilitaryChange = (military) => {
        dispatch(setMilitaryAC(military));
    }

    const onMaritalStatusSwitcherChange = () => {
        dispatch(setMaritalStatusSwitcherAC());
    }
    const onMaritalStatusChange = (status) => {
        dispatch(setMaritalStatusAC(status));
    }
    
    return(
        <Accordion.Item eventKey="0">
                    <Accordion.Header>Personal Information</Accordion.Header>
                    <Accordion.Body>
                        <Form.Group controlId="formImage" className="mb-3">
                            <Form.Label>Select your profile image</Form.Label>
                            <Form.Control type="file" onChange={onImageChange}/>
                            <Button onClick={onRemoveImage} style={{marginTop: '20px'}}>Remove</Button>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>*Name</Form.Label>
                            <Form.Control 
                                type="text" placeholder="Enter your  name" 
                                onChange={(evn) => onNameChange(evn.target.value)}/>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formLastName">
                            <Form.Label>*Last name</Form.Label>
                            <Form.Control 
                                type="text" placeholder="Enter your Last name" 
                                onChange={(evn) => onLastNameChange(evn.target.value)}
                                />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>*Email</Form.Label>
                            <Form.Control 
                                type="email" placeholder="Enter your email" 
                                onChange={(evn) => onEmailChange(evn.target.value)}
                                 />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control 
                                type="text" placeholder="" 
                                onChange={(evn) => onRoleChange(evn.target.value)}
                                />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formAbout">
                            <Form.Label>About</Form.Label>
                            <Form.Control 
                                as="textarea" placeholder="" 
                                onChange={(evn) => onAboutChange(evn.target.value)}
                                />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBirthDate">
                            <Form.Label>*Birth date</Form.Label>
                            <Form.Control 
                                type="date" placeholder="" 
                                onChange={(evn) => onBirthDayChange(evn.target.value)}
                                />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Check 
                                type="switch" id="custom-switch" label="Show"
                                onChange={onGenderSwitcherChange}
                            />
                            <Form.Select aria-label="gender" 
                                onChange={(evn) => onGenderChange(evn.target.value)}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                            </Form.Select>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formDriverLicense" >
                            <Form.Label>Driver License</Form.Label>
                            <Form.Check 
                                type="switch" id="custom-switch" label="Show"
                                onChange={onDriverLicenseSwitcherChange}
                            />
                            {['checkbox'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                    <Form.Check
                                        onChange={onDriverLicenseChange}
                                        value={'A'}
                                        inline
                                        label="A"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-1`}
                                    />
                                    <Form.Check
                                        onChange={onDriverLicenseChange}
                                        value={'B'}
                                        inline
                                        label="B"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-2`}
                                    />
                                    <Form.Check
                                        onChange={onDriverLicenseChange}
                                        value={'C'}
                                        inline
                                        label="C"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-3`}
                                    />
                                    <Form.Check
                                        onChange={onDriverLicenseChange}
                                        value={'D'}
                                        inline
                                        label="D"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-3`}
                                    />
                                </div>
                            ))}
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formMilitary">
                            <Form.Label>Military</Form.Label>
                            <Form.Check 
                                type="switch" id="custom-switch" label="Show"
                                onChange={onMilitarySwitcherChange}
                            />
                            <Form.Select aria-label="military" 
                                onChange={(evn) => onMilitaryChange(evn.target.value)}
                                >
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                            </Form.Select>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formMaritalStatus">
                            <Form.Label>Marital Status</Form.Label>
                            <Form.Check 
                                type="switch" id="custom-switch" label="Show"
                                onChange={onMaritalStatusSwitcherChange}
                            />
                            <Form.Select aria-label="military" 
                                onChange={(evn) => onMaritalStatusChange(evn.target.value)}
                                >
                                    <option value="Married">Married</option>
                                    <option value="Not married">Not married</option>
                            </Form.Select>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="firstPhone">
                            <Form.Label>*Phone</Form.Label>
                                <PhoneInput
                                    country={'am'}
                                    onChange={(evn) => onPhoneChange(evn)}
                                />
                        </Form.Group>

                        
                        <Form.Group className="mb-3" controlId="secondPhone">
                            <Form.Label>Second phone</Form.Label>
                            <PhoneInput
                                    country={'am'}
                                    onChange={(evn) => onSecondPhoneChange(evn)}
                                />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="country">
                            <Form.Label>*Country</Form.Label>
                            <Form.Control 
                                type="text" placeholder="Enter your country" 
                                onChange={(evn) => onCountryChange(evn.target.value)}
                                />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="city">
                            <Form.Label>*City and Province</Form.Label>
                            <Form.Control 
                                type="text" placeholder="Enter your city/province" 
                                onChange={(evn) => onCityChange(evn.target.value)}
                                />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control 
                                type="text" placeholder="Enter your address" 
                                onChange={(evn) => onAddressChange(evn.target.value)}
                                />
                        </Form.Group>
                        {/* {errors.address ?
                            <Form.Control.Feedback type="invalid" style={{display: "block"}}>
                                {errors.address.message}
                            </Form.Control.Feedback>:''
                        }  */}
                        
                    </Accordion.Body>
                </Accordion.Item>
    )
}

export default PersonalInfo;


