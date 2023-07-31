import { Button, Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getExperiences } from '../../Redux/Slices/Experience/experienceSelector';
import styles from '../FormStyle.module.css';
import { useDispatch } from 'react-redux';
import { deleteExperienceAC } from '../../Redux/Slices/Experience/experienceReducer';
import { confirm } from "react-confirm-box";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import EexperienceModal from '../Modals/Experience';
  

const Experience = ({setShow}) => {
    const experiences = useSelector(getExperiences);

    return(
        <Accordion.Item eventKey="2">
            <Accordion.Header>Experience</Accordion.Header>
            <Accordion.Body>
                <div className={styles.educationsDiv} >
                    {experiences.map(experience =>
                            <SingleExperience key={experience.id} experience={experience}/>
                    )}
                </div>
                <Button variant="primary" onClick={()=>{setShow(true)}}>
                    + Add new
                </Button>                
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default Experience;

const SingleExperience = ({experience}) => {

    const dispatch = useDispatch();

    const [showEditExperience, setShowEditExperience] = useState(false);
    const handleCloseExperience = () => setShowEditExperience(false);

    const onDelete = async (id) => {
        const result = await confirm("Delete experience?");
        if (result) {
            dispatch(deleteExperienceAC(id));
            return;
        }
    };

    const onEdit = (id) => {
        setShowEditExperience(true);
    };

    return( 
        <>
            <div className={styles.singleFormDiv}>
                <div className={styles.singleFormRow}>
                    <p className={styles.formTitleP}>{experience.role} </p>
                    <div>
                        <FontAwesomeIcon icon="fa-pen-to-square" style={{marginRight: "15px"}} className={styles.formIcon} 
                            onClick={() => onEdit(experience.id)} />
                        <FontAwesomeIcon icon="fa-trash" className={styles.formIcon}
                            onClick={() => onDelete(experience.id)}/>                               
                    </div>
                </div>             
                <p className={styles.formContentP}>{experience.company}</p>
                <p className={styles.formLocationP}>{experience.location}</p>
                <p className={styles.formLocationP}>{experience.dateFrom} - {experience.dateTo}</p>
            </div>
            <EexperienceModal 
                showExperience={showEditExperience} 
                handleCloseExperience={handleCloseExperience}
                experience={experience}
            />
        </>      
    )
}