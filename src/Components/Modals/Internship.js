import { Form, Button, Modal } from 'react-bootstrap';
import styles from '../FormStyle.module.css';
import { useForm  } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addInternshipAC, editInternshipAC } from '../../Redux/Slices/Internship/internshipReducer';
import { useEffect, useState } from 'react';


const InternshipModal = ({showInternship, handleCloseInternship, internship=null}) => {

    const[isPresent, setIsPresent] = useState(true);
    const{ register, setError, setValue, formState:{errors}, handleSubmit, reset } = useForm();

    const setAllValues = (internship) => {
        setValue("company", internship.company);
        setValue("role", internship.role);
        setValue("location", internship.location);
        setValue("dateFrom", internship.dateFrom);
        if(internship.dateTo !== 'Present'){
            setValue("dateTo", internship.dateTo);
            setIsPresent(false);
        }
    }

    useEffect(() => {
        if(internship){
            setAllValues(internship)
        }
    }
    , [])

        const onSubmit = (data) => {
            if(data.dateTo && !isPresent && data.dateFrom > data.dateTo){
                setError("dateTo", 
                { type: "focus", message: "Date To can't be earlier than Date From"  }, 
                { shouldFocus: true });
            }else{
                handleCloseInternship();
                if(internship){
                    if(isPresent)
                    data.dateTo = 'Present'
                    dispatch(editInternshipAC(internship.id, data))
                }else{
                    dispatch(addInternshipAC(data))
                } 
                reset();
            }
        };

        
    
    const dispatch = useDispatch();
    
    return(
        <Modal show={showInternship} onHide={handleCloseInternship}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>*Internship</Modal.Title>
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
                                    <input type='checkbox' checked={isPresent} onChange={() => setIsPresent(!isPresent)} />
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
                    <Button variant="secondary" onClick={handleCloseInternship}>
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
export default InternshipModal;