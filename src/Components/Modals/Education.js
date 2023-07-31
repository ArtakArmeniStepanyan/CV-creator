import { Form, Button, Modal } from 'react-bootstrap';
import styles from '../FormStyle.module.css';
import { useForm  } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addEducationAC, editEducationAC } from '../../Redux/Slices/Education/educationReducer';
import { useEffect, useState } from 'react';

const EducationModal = ({showEducation, handleCloseEducation, education=null}) => {

    const[isPresent, setIsPresent] = useState(true);

    const{ register, setError, setValue, formState:{errors}, handleSubmit, reset } = useForm();
        const onSubmit = (data) => {
                if(data.dateTo && !isPresent && data.dateFrom > data.dateTo){
                        setError("dateTo", 
                        { type: "focus", message: "Date To can't be earlier than Date From"  }, 
                        { shouldFocus: true });
                    }else{
                        handleCloseEducation();
                        if(education){
                            if(isPresent)
                            data.dateTo = 'Present'
                            dispatch(editEducationAC(education.id, data))
                        }else{
                            dispatch(addEducationAC(data))
                        } 
                        reset();
                    }
        };

        const setAllValues = (education) => {
            setValue("university", education.university);
            setValue("speciality", education.speciality);
            setValue("location", education.location);
            setValue("dateFrom", education.dateFrom);
            if(education.dateTo !== 'Present'){
                setValue("dateTo", education.dateTo);
                setIsPresent(false);
            }
        }

    useEffect(() => {
        if(education)
            setAllValues(education);
    }, [])
        

        const dispatch = useDispatch();
    return(
        <Modal show={showEducation} onHide={handleCloseEducation}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Education</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formUniversity">
                        <Form.Label>*University</Form.Label>
                            <Form.Control 
                                    {...register ("university", {
                                        required: 'Field is required'
                                    })}
                                    type="text" placeholder="" 
                                    className={`${errors.university ? styles.errorInput: ""}`} />
                    </Form.Group>
                    {errors.university ?
                        <Form.Control.Feedback type="invalid" style={{display: "block", marginTop: "-20px"}}>
                            {errors.university.message}
                        </Form.Control.Feedback>:''
                    } 

                    <Form.Group className="mb-3" controlId="formSpeciality">
                        <Form.Label>*Speciality</Form.Label>
                            <Form.Control 
                                    {...register ("speciality", {
                                        required: 'Field is required'
                                    })}
                                    type="text" placeholder="" 
                                    className={`${errors.speciality ? styles.errorInput: ""}`} />
                    </Form.Group>
                    {errors.speciality ?
                        <Form.Control.Feedback type="invalid" style={{display: "block", marginTop: "-20px"}}>
                            {errors.speciality.message}
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
                                {errors.dateTo && !isPresent?
                                    <Form.Control.Feedback type="invalid" style={{display: "block", marginTop: "-20px"}}>
                                        {errors.dateTo.message}
                                    </Form.Control.Feedback>:''
                                }
                        </div>
                    </div>
                    

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEducation}>
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
export default EducationModal;