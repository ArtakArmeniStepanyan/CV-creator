import { Button, Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getCourses } from '../../Redux/Slices/Course/courseSelector';
import styles from '../FormStyle.module.css';
import { useDispatch } from 'react-redux';
import { deleteCourseAC } from '../../Redux/Slices/Course/courseReducer';
import { confirm } from "react-confirm-box";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import CourseModal from '../Modals/Course';
  

const Course = ({setShow}) => {
    const courses = useSelector(getCourses);
    
    return(
        <Accordion.Item eventKey="4">
            <Accordion.Header>Course</Accordion.Header>
            <Accordion.Body>
                <div className={styles.educationsDiv} >
                    {courses.map(course =>
                            <SingleCourse key={course.id} course={course}/>
                    )}
                </div>
                <Button variant="primary" onClick={()=>{setShow(true)}}>
                    + Add new
                </Button>                
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default Course;

const SingleCourse = ({course}) => {

    const dispatch = useDispatch();

    const [showEditCourse, setShowEditCourse] = useState(false);
    const handleCloseCourse = () => setShowEditCourse(false);

    const onDelete = async (id) => {
        const result = await confirm("Delete course?");
        if (result) {
            dispatch(deleteCourseAC(id));
            return;
        }
    };

    const onEdit = (id) => {
        setShowEditCourse(true);
    };

    return( 
        <>
            <div className={styles.singleFormDiv}>
                <div className={styles.singleFormRow}>
                    <p className={styles.formTitleP}>{course.courseName} </p>
                    <div>
                        <FontAwesomeIcon icon="fa-pen-to-square" style={{marginRight: "15px"}} className={styles.formIcon} 
                            onClick={() => onEdit(course.id)} />
                        <FontAwesomeIcon icon="fa-trash" className={styles.formIcon}
                            onClick={() => onDelete(course.id)}/>                               
                    </div>
                </div>             
                <p className={styles.formContentP}>{course.organization}</p>
                <p className={styles.formLocationP}>{course.location}</p>
                <p className={styles.formLocationP}>{course.dateFrom} - {course.dateTo}</p>
            </div>
            <CourseModal 
                showCourse={showEditCourse} 
                handleCloseCourse={handleCloseCourse}
                course={course}
            />
        </>      
    )
}