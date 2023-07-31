import { Form, Button, Modal } from 'react-bootstrap';
import styles from '../FormStyle.module.css';
import { useForm  } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addCertificateAC, editCertificateAC } from '../../Redux/Slices/Certificate/certificateReducer';
import { useEffect } from 'react';

const CertificateModal = ({showCertificate, handleCloseCertificate, certificate=null}) => {


    const{ register, getValues, setValue, formState:{errors}, handleSubmit, reset } = useForm();
        const onSubmit = (data) => {
            if(errors.provider || errors.title){
                console.log(data);
            }else{
                handleCloseCertificate();
                if(certificate){
                    dispatch(editCertificateAC(certificate.id, data))
                }else{
                    dispatch(addCertificateAC(data))
                } 
                reset();
            }
        };

        const setAllValues = (certificate) => {
            setValue("provider", certificate.provider);
            setValue("title", certificate.title);
            setValue("location", certificate.location);
            setValue("date", certificate.date);
        }

    useEffect(() => {
        if(certificate)
            setAllValues(certificate);
    }, [])
        

        const dispatch = useDispatch();
    return(
        <Modal show={showCertificate} onHide={handleCloseCertificate}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Certificate</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formProvider">
                        <Form.Label>*Provider</Form.Label>
                            <Form.Control 
                                    {...register ("provider", {
                                        required: 'Field is required'
                                    })}
                                    type="text" placeholder="" 
                                    className={`${errors.provider ? styles.errorInput: ""}`} />
                    </Form.Group>
                    {errors.provider ?
                        <Form.Control.Feedback type="invalid" style={{display: "block", marginTop: "-20px"}}>
                            {errors.provider.message}
                        </Form.Control.Feedback>:''
                    } 

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

                    <Form.Group className="mb-3" controlId="formLocation">
                        <Form.Label>Location</Form.Label>
                            <Form.Control 
                                    {...register ("location")}
                                    type="text" placeholder="" 
                                    className={`${errors.location ? styles.errorInput: ""}`} />
                    </Form.Group>

                    <div className={styles.dateBox}>
                        <div>
                            <Form.Group className="mb-3" controlId="formDate">
                                <Form.Label>*Date</Form.Label>
                                    <Form.Control 
                                            {...register ("date", {
                                                required: 'Field is required'
                                            })}
                                            type="date" placeholder="" 
                                            className={`${errors.date ? styles.errorInput: ""}`} />
                            </Form.Group>
                            {errors.date ?
                                <Form.Control.Feedback type="invalid" style={{display: "block", marginTop: "-20px"}}>
                                    {errors.date.message}
                                </Form.Control.Feedback>:''
                            } 
                        </div>
                    </div>
                    

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCertificate}>
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
export default CertificateModal;