import { Button, Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getEducations } from '../../Redux/Slices/Education/educationSelector';
import styles from '../FormStyle.module.css';
import { useDispatch } from 'react-redux';
import { deleteEducationAC } from '../../Redux/Slices/Education/educationReducer';
import { confirm } from "react-confirm-box";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import EducationModal from '../Modals/Education';
  

const Education = ({setShow}) => {
    const educations = useSelector(getEducations);
    
    return(
        <Accordion.Item eventKey="1">
            <Accordion.Header>Education</Accordion.Header>
            <Accordion.Body>
                <div className={styles.educationsDiv} >
                    {educations.map(education =>
                            <SingleEducation key={education.id} education={education}/>
                    )}
                </div>
                <Button variant="primary" onClick={()=>{setShow(true)}}>
                    + Add new
                </Button>                
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default Education;

const SingleEducation = ({education}) => {

    const dispatch = useDispatch();

    const [showEditEducation, setShowEditEducation] = useState(false);
    const handleCloseEducation = () => setShowEditEducation(false);

    const onDelete = async (id) => {
        const result = await confirm("Delete education?");
        if (result) {
            dispatch(deleteEducationAC(id));
            return;
        }
    };

    const onEdit = (id) => {
        setShowEditEducation(true);
    };

    return( 
        <>
            <div className={styles.singleFormDiv}>
                <div className={styles.singleFormRow}>
                    <p className={styles.formTitleP}>{education.speciality} </p>
                    <div>
                        <FontAwesomeIcon icon="fa-pen-to-square" style={{marginRight: "15px"}} className={styles.formIcon} 
                            onClick={() => onEdit(education.id)} />
                        <FontAwesomeIcon icon="fa-trash" className={styles.formIcon}
                            onClick={() => onDelete(education.id)}/>                               
                    </div>
                </div>             
                <p className={styles.formContentP}>{education.university}</p>
                <p className={styles.formLocationP}>{education.location}</p>
                <p className={styles.formLocationP}>{education.dateFrom} - {education.dateTo}</p>
            </div>
            <EducationModal 
                showEducation={showEditEducation} 
                handleCloseEducation={handleCloseEducation}
                education={education}
            />
        </>      
    )
}