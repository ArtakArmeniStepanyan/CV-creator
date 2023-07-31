import { Form, Button, Modal } from 'react-bootstrap';
import styles from '../FormStyle.module.css';
import { useForm  } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addSkillAC, editSkillAC } from '../../Redux/Slices/Skills/skillsReducer';
import { useEffect, useState } from 'react';
import { Rate } from 'antd';

const SkillsModal = ({showSkill, handleCloseSkill, skill=null}) => {


    const{ register, getValues, setValue, formState:{errors}, handleSubmit, reset } = useForm();
        const onSubmit = (data) => {
            if(errors.title){
                console.log(data);
            }else{
                handleCloseSkill();
                    data.level = rateCount;
                    setRateCount(2);

                if(skill){
                    dispatch(editSkillAC(skill.id, data))
                }else{
                    dispatch(addSkillAC(data))
                } 
                reset();
            }
        };

        const setAllValues = (skill) => {
            setValue("title", skill.title);
            setValue("level", skill.level);
        }

    useEffect(() => {
        if(skill){
            setAllValues(skill);
            setRateCount(skill.level)
        }
    }, [])
        
    const[rateCount, setRateCount] = useState(2);

        const dispatch = useDispatch();
    return(
        <Modal show={showSkill} onHide={handleCloseSkill}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Skills</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.rateDiv}>
                        <div>
                            <Form.Group className="mb-3" controlId="formTitle">
                                <Form.Label>*Title</Form.Label>
                                <Form.Control 
                                        {...register ("title", {
                                            required: 'Field is required'
                                        })}
                                        type="text" placeholder="" 
                                        className={`${errors.title ? styles.errorInput: ""}`} />
                            </Form.Group>
                            {errors.title ?
                                <Form.Control.Feedback type="invalid" style={{display: "block", marginTop: "-20px"}}>
                                    {errors.title.message}
                                </Form.Control.Feedback>:''
                            } 
                        </div>
                        <div>
                            <Rate 
                                defaultValue={rateCount}
                                onChange={(value)=>setRateCount(value)}
                            />
                        </div>
                    </div>
                    
                    <Form.Group className="mb-3" controlId="formLevel">
                            <Form.Control 
                                    {...register ("level",)}
                                    type="hidden" placeholder=""
                                    className={`${errors.level ? styles.errorInput: ""}`} />
                    </Form.Group>
                    {errors.level ?
                        <Form.Control.Feedback type="invalid" style={{display: "block", marginTop: "-20px"}}>
                            {errors.level.message}
                        </Form.Control.Feedback>:''
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSkill}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit'>
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
export default SkillsModal;