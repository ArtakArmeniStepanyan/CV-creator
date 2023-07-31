import { Button, Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getLanguages } from '../../Redux/Slices/Languages/languagesSelector';
import styles from '../FormStyle.module.css';
import { useDispatch } from 'react-redux';
import { deleteLanguageAC } from '../../Redux/Slices/Languages/languagesReducer';
import { confirm } from "react-confirm-box";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import LanguagesModal from '../Modals/Languages';
import { Rate } from 'antd';
  

const Languages = ({setShow}) => {
    const languages = useSelector(getLanguages);
    
    return(
        <Accordion.Item eventKey="7">
            <Accordion.Header>Languages</Accordion.Header>
            <Accordion.Body>
                <div className={styles.educationsDiv} >
                    {languages.map(language =>
                            <SingleLanguage key={language.id} language={language}/>
                    )}
                </div>
                <Button variant="primary" onClick={()=>{setShow(true)}}>
                    + Add new
                </Button>                
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default Languages;

const SingleLanguage = ({language}) => {

    const dispatch = useDispatch();

    const [showEditLanguage, setShowEditLanguage] = useState(false);
    const handleCloseLanguage = () => setShowEditLanguage(false);

    const onDelete = async (id) => {
        const result = await confirm("Delete language?");
        if (result) {
            dispatch(deleteLanguageAC(id));
            return;
        }
    };

    const onEdit = (id) => {
        setShowEditLanguage(true);
    };

    return( 
        <>
            <div className={styles.singleFormDiv}>
                <div className={styles.singleFormRow}>
                    <p className={styles.formTitleP}>{language.title}</p>
                    <div>
                        <Rate disabled defaultValue={language.level} style={{marginRight: '20px'}}/>
                        <FontAwesomeIcon icon="fa-pen-to-square" style={{marginRight: "15px"}} className={styles.formIcon} 
                            onClick={() => onEdit(language.id)} />
                        <FontAwesomeIcon icon="fa-trash" className={styles.formIcon}
                            onClick={() => onDelete(language.id)}/>                               
                    </div>
                </div>             
            </div>
            <LanguagesModal 
                showLanguage={showEditLanguage} 
                handleCloseLanguage={handleCloseLanguage}
                language={language}
            />
        </>      
    )
}