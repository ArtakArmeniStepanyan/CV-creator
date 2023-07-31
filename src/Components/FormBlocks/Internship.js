import { Button, Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getInternships } from '../../Redux/Slices/Internship/internshipSelector';
import styles from '../FormStyle.module.css';
import { useDispatch } from 'react-redux';
import { deleteInternshipAC } from '../../Redux/Slices/Internship/internshipReducer';
import { confirm } from "react-confirm-box";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import InternshipModal from '../Modals/Internship';
  

const Internship = ({setShow}) => {
    const internships = useSelector(getInternships);

    return(
        <Accordion.Item eventKey="3">
            <Accordion.Header>Internship</Accordion.Header>
            <Accordion.Body>
                <div className={styles.educationsDiv} >
                    {internships.map(internship =>
                            <SingleInternship key={internship.id} internship={internship}/>
                    )}
                </div>
                <Button variant="primary" onClick={()=>{setShow(true)}}>
                    + Add new
                </Button>                
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default Internship;

const SingleInternship = ({internship}) => {

    const dispatch = useDispatch();
    
    const [showEditInternship, setShowEditInternship] = useState(false);
    const handleCloseInternship = () => setShowEditInternship(false);

    const onDelete = async (id) => {
        const result = await confirm("Delete internship?");
        if (result) {
            dispatch(deleteInternshipAC(id));
            return;
        }
    };

    const onEdit = (id) => {
        setShowEditInternship(true);
    };

    return( 
        <>
            <div className={styles.singleFormDiv}>
                <div className={styles.singleFormRow}>
                    <p className={styles.formTitleP}>{internship.role} </p>
                    <div>
                        <FontAwesomeIcon icon="fa-pen-to-square" style={{marginRight: "15px"}} className={styles.formIcon} 
                            onClick={() => onEdit(internship.id)} />
                        <FontAwesomeIcon icon="fa-trash" className={styles.formIcon}
                            onClick={() => onDelete(internship.id)}/>                               
                    </div>
                </div>             
                <p className={styles.formContentP}>{internship.company}</p>
                <p className={styles.formLocationP}>{internship.location}</p>
                <p className={styles.formLocationP}>{internship.dateFrom} - {internship.dateTo}</p>
            </div>
            <InternshipModal 
                showInternship={showEditInternship} 
                handleCloseInternship={handleCloseInternship}
                internship={internship}
            />
        </>      
    )
}