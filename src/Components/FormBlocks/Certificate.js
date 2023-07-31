import { Button, Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getCertificates } from '../../Redux/Slices/Certificate/certificateSelector';
import styles from '../FormStyle.module.css';
import { useDispatch } from 'react-redux';
import { deleteCertificateAC } from '../../Redux/Slices/Certificate/certificateReducer';
import { confirm } from "react-confirm-box";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import CertificateModal from '../Modals/Certificate';
  

const Certificate = ({setShow}) => {
    const certificates = useSelector(getCertificates);
    
    return(
        <Accordion.Item eventKey="5">
            <Accordion.Header>Certificate</Accordion.Header>
            <Accordion.Body>
                <div className={styles.educationsDiv} >
                    {certificates.map(certificate =>
                            <SingleCertificate key={certificate.id} certificate={certificate}/>
                    )}
                </div>
                <Button variant="primary" onClick={()=>{setShow(true)}}>
                    + Add new
                </Button>                
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default Certificate;

const SingleCertificate = ({certificate}) => {

    const dispatch = useDispatch();

    const [showEditCertificate, setShowEditCertificate] = useState(false);
    const handleCloseCertificate = () => setShowEditCertificate(false);

    const onDelete = async (id) => {
        const result = await confirm("Delete certificate?");
        if (result) {
            dispatch(deleteCertificateAC(id));
            return;
        }
    };

    const onEdit = (id) => {
        setShowEditCertificate(true);
    };

    return( 
        <>
            <div className={styles.singleFormDiv}>
                <div className={styles.singleFormRow}>
                    <p className={styles.formTitleP}>{certificate.title} </p>
                    <div>
                        <FontAwesomeIcon icon="fa-pen-to-square" style={{marginRight: "15px"}} className={styles.formIcon} 
                            onClick={() => onEdit(certificate.id)} />
                        <FontAwesomeIcon icon="fa-trash" className={styles.formIcon}
                            onClick={() => onDelete(certificate.id)}/>                               
                    </div>
                </div>             
                <p className={styles.formContentP}>{certificate.provider}</p>
                <p className={styles.formLocationP}>{certificate.location}</p>
                <p className={styles.formLocationP}>{certificate.date}</p>
            </div>
            <CertificateModal 
                showCertificate={showEditCertificate} 
                handleCloseCertificate={handleCloseCertificate}
                certificate={certificate}
            />
        </>      
    )
}