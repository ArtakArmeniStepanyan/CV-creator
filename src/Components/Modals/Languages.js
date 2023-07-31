import { Form, Button, Modal } from 'react-bootstrap';
import styles from '../FormStyle.module.css';
import { useForm  } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addLanguageAC, editLanguageAC } from '../../Redux/Slices/Languages/languagesReducer';
import { useEffect, useState } from 'react';
import { Rate } from 'antd';

const LanguagesModal = ({showLanguage, handleCloseLanguage, language=null}) => {


    const{ register, getValues, setValue, formState:{errors}, handleSubmit, reset } = useForm();
        const onSubmit = (data) => {
            if(errors.title){
                console.log(data);
            }else{
                handleCloseLanguage();
                    data.level = rateCount;
                    setRateCount(2);

                if(language){
                    dispatch(editLanguageAC(language.id, data))
                }else{
                    dispatch(addLanguageAC(data))
                } 
                reset();
            }
        };

        const setAllValues = (language) => {
            setValue("title", language.title);
            setValue("level", language.level);
        }

    useEffect(() => {
        if(language){
            setAllValues(language);
            setRateCount(language.level)
        }
    }, [])
        
    const[rateCount, setRateCount] = useState(2);

        const dispatch = useDispatch();
    return(
        <Modal show={showLanguage} onHide={handleCloseLanguage}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>Languages</Modal.Title>
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
                    <Button variant="secondary" onClick={handleCloseLanguage}>
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
export default LanguagesModal;