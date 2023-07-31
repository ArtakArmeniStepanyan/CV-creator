
import { Button, Accordion } from 'react-bootstrap';
import { useState } from 'react';
import { generatePdfDownloader } from './PreviewMy';
import styles from './FormStyle.module.css';
import { useSelector } from 'react-redux';
import { 
    getName,
    getLastName,
    getEmail,
    getBirthDate,
    getPhone,
    getCountry,
    getCity,
} from '../Redux/Slices/RersonalInfo/personalInfoSelector';

import PersonalInfo from './FormBlocks/PersonalInfo';
import Education from './FormBlocks/Education';
import Experience from './FormBlocks/Experience';
import Internship from './FormBlocks/Internship';
import Course from './FormBlocks/Course';
import Certificate from './FormBlocks/Certificate';
import Skills from './FormBlocks/Skills';
import Languages from './FormBlocks/Languages';

import EducationModal from './Modals/Education';
import ExperienceModal from './Modals/Experience';
import InternshipModal from './Modals/Internship';
import CourseModal from './Modals/Course';
import CertificateModal from './Modals/Certificate';
import SkillsModal from './Modals/Skills';
import LanguagesModal from './Modals/Languages';

const MyForm = () => {

    const [showEducation, setShowEducation] = useState(false);
    const handleCloseEducation = () => setShowEducation(false);

    const [showExperience, setShowExperience] = useState(false);
    const handleCloseExperience = () => setShowExperience(false);
    
    const [showInternship, setShowInternship] = useState(false);
    const handleCloseInternship = () => setShowInternship(false);

    const [showCourse, setShowCourse] = useState(false);
    const handleCloseCourse = () => setShowCourse(false);

    const [showCertificate, setShowCertificate] = useState(false);
    const handleCloseCertificate = () => setShowCertificate(false);

    const [showSkill, setShowSkill] = useState(false);
    const handleCloseSkill = () => setShowSkill(false);
    
    const [showLanguage, setShowLanguage] = useState(false);
    const handleCloseLanguage = () => setShowLanguage(false);

    const [isDisabled, setIsDisabled] = useState(true);


    
    const name = useSelector(getName);
    const lastName = useSelector(getLastName);
    const email = useSelector(getEmail);
    const birthDate = useSelector(getBirthDate);
    const phone = useSelector(getPhone);
    const country = useSelector(getCountry);
    const city = useSelector(getCity);

    if( name && lastName && email && birthDate && phone && country && city && isDisabled){
        setIsDisabled(false);
    }else if( !name || !lastName || !email || !birthDate || !phone || !country || !city ){
        if(!isDisabled)
            setIsDisabled(true);
    }

    return(
    <>
        <Accordion defaultActiveKey="0">
            <PersonalInfo />
            <Education setShow={setShowEducation}/>  
            <Experience setShow={setShowExperience}/>  
            <Internship setShow={setShowInternship}/> 
            <Course setShow={setShowCourse}/>
            <Certificate setShow={setShowCertificate}/>
            <Skills setShow={setShowSkill}/>
            <Languages setShow={setShowLanguage}/>
        </Accordion>

        <div className={styles.downloadBtnDiv}>
            { isDisabled? 
                <p className={styles.errorMessage}>Please fill out all required fields in personal Information block</p>
                : ''}            
            <Button onClick={generatePdfDownloader} disabled={isDisabled}>Download</Button>
        </div>

        {/* Modals */}

        <EducationModal 
            showEducation={showEducation} 
            handleCloseEducation={handleCloseEducation}
        />
        <ExperienceModal 
            showExperience={showExperience} 
            handleCloseExperience={handleCloseExperience}
        />
        <InternshipModal 
            showInternship={showInternship} 
            handleCloseInternship={handleCloseInternship}
        />
        <CourseModal 
            showCourse={showCourse} 
            handleCloseCourse={handleCloseCourse}
        />
        <CertificateModal 
            showCertificate={showCertificate} 
            handleCloseCertificate={handleCloseCertificate}
        />
        <SkillsModal 
            showSkill={showSkill} 
            handleCloseSkill={handleCloseSkill}
        />
        <LanguagesModal 
            showLanguage={showLanguage} 
            handleCloseLanguage={handleCloseLanguage}
        />
    </>

    )
}
 
 

export default MyForm;

