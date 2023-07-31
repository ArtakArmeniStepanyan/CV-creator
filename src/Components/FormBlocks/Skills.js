import { Button, Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getSkills } from '../../Redux/Slices/Skills/skillsSelector';
import styles from '../FormStyle.module.css';
import { useDispatch } from 'react-redux';
import { deleteSkillAC } from '../../Redux/Slices/Skills/skillsReducer';
import { confirm } from "react-confirm-box";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import SkillsModal from '../Modals/Skills';
import { Rate } from 'antd';
  

const Skills = ({setShow}) => {
    const skills = useSelector(getSkills);
    
    return(
        <Accordion.Item eventKey="6">
            <Accordion.Header>Skills</Accordion.Header>
            <Accordion.Body>
                <div className={styles.educationsDiv} >
                    {skills.map(skill =>
                            <SingleSkill key={skill.id} skill={skill}/>
                    )}
                </div>
                <Button variant="primary" onClick={()=>{setShow(true)}}>
                    + Add new
                </Button>                
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default Skills;

const SingleSkill = ({skill}) => {

    const dispatch = useDispatch();

    const [showEditSkill, setShowEditSkill] = useState(false);
    const handleCloseSkill = () => setShowEditSkill(false);

    const onDelete = async (id) => {
        const result = await confirm("Delete skill?");
        if (result) {
            dispatch(deleteSkillAC(id));
            return;
        }
    };

    const onEdit = (id) => {
        setShowEditSkill(true);
    };

    return( 
        <>
            <div className={styles.singleFormDiv}>
                <div className={styles.singleFormRow}>
                    <p className={styles.formTitleP}>{skill.title}</p>
                    <div>
                        <Rate disabled defaultValue={skill.level} style={{marginRight: '20px'}}/>
                        <FontAwesomeIcon icon="fa-pen-to-square" style={{marginRight: "15px"}} className={styles.formIcon} 
                            onClick={() => onEdit(skill.id)} />
                        <FontAwesomeIcon icon="fa-trash" className={styles.formIcon}
                            onClick={() => onDelete(skill.id)}/>                               
                    </div>
                </div>             
            </div>
            <SkillsModal 
                showSkill={showEditSkill} 
                handleCloseSkill={handleCloseSkill}
                skill={skill}
            />
        </>      
    )
}