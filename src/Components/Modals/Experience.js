import { Form, Button, Modal } from 'react-bootstrap';
import styles from '../FormStyle.module.css';
import { useForm  } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addExperienceAC, editExperienceAC } from '../../Redux/Slices/Experience/experienceReducer';
import { useEffect, useState } from 'react';

const ExperienceModal = ({showExperience, handleCloseExperience, experience=null}) => {

    const[isPresent, setIsPresent] = useState(true);

    const{ register, setError, setValue, formState:{errors}, handleSubmit, reset } = useForm();
        const onSubmit = (data) => {
            if(data.dateTo && !isPresent && data.dateFrom > data.dateTo){
                setError("dateTo", 
                { type: "focus", message: "Date To can't be earlier than Date From"  }, 
                { shouldFocus: true });
            }else{
                handleCloseExperience();
                if(experience){
                    if(isPresent)
                    data.dateTo = 'Present'
                    dispatch(editExperienceAC(experience.id, data))
                }else{
                    dispatch(addExperienceAC(data))
                } 
                reset();
            }
        };

        const setAllValues = (experience) => {
            setValue("company", experience.company);
            setValue("role", experience.role);
            setValue("location", experience.location);
            setValue("dateFrom", experience.dateFrom);
            if(experience.dateTo !== 'Present'){
                setValue("dateTo", experience.dateTo);
                setIsPresent(false);
            }
        }

    useEffect(() => {
        if(experience)
            setAllValues(experience);
    }, [])
        

        const dispatch = useDispatch();
    return(
        <Modal show={showExperience} onHide={handleCloseExperience}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>*Experience</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formCompany">
                        <Form.Label>*Company</Form.Label>
                            <Form.Control 
                                    {...register ("company", {
                                        required: 'Field is required'
                                    })}
                                    type="text" placeholder="" 
                                    className={`${errors.company ? styles.errorInput: ""}`} />
                    </Form.Group>
                    {errors.company ?
                        <Form.Control.Feedback type="invalid" style={{display: "block", marginTop: "-20px"}}>
                            {errors.company.message}
                        </Form.Control.Feedback>:''
                    } 

                    <Form.Group className="mb-3" controlId="formRole">
                        <Form.Label>*Role</Form.Label>
                            <Form.Control 
                                    {...register ("role", {
                                        required: 'Field is required'
                                    })}
                                    type="text" placeholder="" 
                                    className={`${errors.role ? styles.errorInput: ""}`} />
                    </Form.Group>
                    {errors.role ?
                        <Form.Control.Feedback type="invalid" style={{display: "block", marginTop: "-20px"}}>
                            {errors.role.message}
                        </Form.Control.Feedback>:''
                    } 

                    <Form.Group className="mb-3" controlId="formLocation">
                        <Form.Label>Location</Form.Label>
                            <Form.Control 
                                    {...register ("location")}
                                    type="text" placeholder="" 
                                    className={`${errors.location ? styles.errorInput: ""}`} />
                    </Form.Group>

                    <div className={styles.dateBox}>
                        <div>
                            <Form.Group className="mb-3" controlId="formDateFrom">
                                <h3>Date</h3>
                                <p>Present {' '}
                                    <input type='checkbox' checked={isPresent} onChange={(evt) => setIsPresent(!isPresent)} />
                                </p>
                                <Form.Label>*From 
                                </Form.Label>
                                    <Form.Control 
                                            {...register ("dateFrom", {
                                                required: 'Field is required'
                                            })}
                                            type="date" placeholder="" 
                                            className={`${errors.dateFrom ? styles.errorInput: ""}`} />
                            </Form.Group>
                            {errors.dateFrom ?
                                <Form.Control.Feedback type="invalid" style={{display: "block", marginTop: "-20px"}}>
                                    {errors.dateFrom.message}
                                </Form.Control.Feedback>:''
                            } 
                        </div>
                        <div>
                            {isPresent ? '' :
                                <Form.Group className="mb-3" controlId="formDateTo">
                                <Form.Label>*To</Form.Label>
                                    <Form.Control 
                                            {...register ("dateTo", {
                                                required: 'Field is required'
                                            })}
                                            type="date" placeholder="" 
                                            className={`${errors.dateTo ? styles.errorInput: ""}`} />
                                </Form.Group>}
                                {errors.dateTo && !isPresent ?
                                    <Form.Control.Feedback type="invalid" style={{display: "block", marginTop: "-20px"}}>
                                        {errors.dateTo.message}
                                    </Form.Control.Feedback>:''
                                 
                            }
                        </div>
                    </div>
                    

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseExperience}>
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
export default ExperienceModal;