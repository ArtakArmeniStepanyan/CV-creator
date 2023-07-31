import styles from '../Preview.module.css';
import { useSelector } from 'react-redux';
import { 
    getImage,
    getName,
    getLastName,
    getEmail,
    getRole,
    getBirthDate,
    getGenderSwitcher,
    getGender,
    getPhone,
    getSecondPhone,
    getCountry,
    getCity,
    getAddress,
    getDriverLicenseSwitcher,
    getDriverLicenses,
    getMilitarySwitcher,
    getMilitary,
    getMartialStatus,
    getMartialStatusSwitcher
} from '../../Redux/Slices/RersonalInfo/personalInfoSelector';

const PersonalBlock = () => {

    const image = useSelector(getImage);
    const name = useSelector(getName);
    const lastName = useSelector(getLastName);
    const email = useSelector(getEmail);
    const role = useSelector(getRole);
    const birthDate = useSelector(getBirthDate);
    const genderSwitcher = useSelector(getGenderSwitcher);
    const gender = useSelector(getGender);
    const phone = useSelector(getPhone);
    const secondPhone = useSelector(getSecondPhone);
    const country = useSelector(getCountry);
    const city = useSelector(getCity);
    const address = useSelector(getAddress);
    const driverLicenseSwitcher = useSelector(getDriverLicenseSwitcher);
    const driverLicenses = useSelector(getDriverLicenses);
    const militarySwitcher = useSelector(getMilitarySwitcher);
    const military = useSelector(getMilitary);
    const martialStatusSwitcher = useSelector(getMartialStatusSwitcher);
    const martialStatus = useSelector(getMartialStatus);    return(
            <div className={styles.personalBlock}>
                <div>
                    <div className={styles.imageName} >
                        {image ? <img src={image} className={styles.image}                    
                        /> : ''}
                        <div className={styles.name}>
                            <h3>{name ? name: 'John'} {lastName ? lastName : 'Smith'}</h3>
                            <h5>{role ? role: 'Developer'}</h5>
                        </div>
                    </div>
                </div>
                <div className={styles.personalInfo}>
                    <p className={styles.personalP}><b>Email: </b>{email? email: 'example@gmail.com'}</p>
                    <p className={styles.personalP}><b>Address: </b>
                        {country||city||address? `${country}, ${city}, ${address}`: 'Armenia, Yerevan, Mashtots 1-1'}</p>
                    <p className={styles.personalP}><b>Phone: </b>{phone? phone: '0********'}</p>
                    {secondPhone ?
                        <p className={styles.personalP}><b>Second phone: </b>{secondPhone}</p>: ''}
                    <p className={styles.personalP}><b>Date of Birth :</b>{birthDate? birthDate: '2000-01-01'}</p>
                    {genderSwitcher ?
                        <p className={styles.personalP}><b>Gender: </b>{gender}</p>: ''}
                    {driverLicenseSwitcher ?
                        <p className={styles.personalP}><b>Driver License: </b>Yes {driverLicenses ? `(${driverLicenses})`: ''} </p>: ''}
                    {militarySwitcher ?
                        <p className={styles.personalP}><b>Military: </b>{military}</p>: ''}
                    {martialStatusSwitcher ?
                        <p className={styles.personalP}><b>Martial status: </b>{martialStatus}</p>: ''}
                </div>
            </div>
    )
}



export default PersonalBlock;