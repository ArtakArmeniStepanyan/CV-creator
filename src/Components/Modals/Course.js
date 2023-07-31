import { Form, Button, Modal } from 'react-bootstrap';
import styles from '../FormStyle.module.css';
import { useForm  } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addCourseAC, editCourseAC } from '../../Redux/Slices/Course/courseReducer';
import { useEffect, useState } from 'react';

const CourseModal = ({showCourse, handleCloseCourse, course=null}) => {

    const[isPresent, setIsPresent] = useState(true);

    const{ register, setError, setValue, formState:{errors}, handleSubmit, reset } = useForm();
        const onSubmit = (data) => {
            if(data.dateTo && !isPresent && data.dateFrom > data.dateTo){
                setError("dateTo", 
                { type: "focus", message: "Date To can't be earlier than Date From"  }, 
                { shouldFocus: true });
            }else{
                handleCloseCourse();
                if(course){
                    if(isPresent)
                    data.dateTo = 'Present'
                    dispatch(editCourseAC(course.id, data))
                }else{
                    dispatch(addCourseAC(data))
                } 
                reset();
            }
        };

        const setAllValues = (course) => {
            setValue("organization", course.organization);
            setValue("courseName", course.courseName);
            setValue("location", course.location);
            setValue("dateFrom", course.dateFrom);
            if(course.dateTo !== 'Present'){
                setValue("dateTo", course.dateTo);
                setIsPresent(false);
            }
        }

    useEffect(() => {
        if(course)
            setAllValues(course);
    }, [])
        

        const dispatch = useDispatch();
    return(
        <Modal show={showCourse} onHide={handleCloseCourse}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formOrganization">
                        <Form.Label>*Organization</Form.Label>
                            <Form.Control 
                                    {...register ("organization", {
                                        required: 'Field is required'
                                    })}
                                    type="text" placeholder="" 
                                    className={`${errors.organization ? styles.errorInput: ""}`} />
                    </Form.Group>
                    {errors.organization ?
                        <Form.Control.Feedback type="invalid" style={{display: "block", marginTop: "-20px"}}>
                            {errors.organization.message}
                        </Form.Control.Feedback>:''
                    } 

                    <Form.Group className="mb-3" controlId="formCourseName">
                        <Form.Label>*Course Name</Form.Label>
                            <Form.Control 
                                    {...register ("courseName", {
                                        required: 'Field is required'
                                    })}
                                    type="text" placeholder="" 
                                    className={`${errors.courseName ? styles.errorInput: ""}`} />
                    </Form.Group>
                    {errors.courseName ?
                        <Form.Control.Feedback type="invalid" style={{display: "block", marginTop: "-20px"}}>
                            {errors.courseName.message}
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
                    <Button variant="secondary" onClick={handleCloseCourse}>
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
export default CourseModal;