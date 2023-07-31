import styles from '../Preview.module.css';
import classNames from 'classnames';

const SingleCourse = ({course}) => {

    return( 
            <div className={styles.previewSinglelRightDiv}>
                <p className={styles.previewDateP}>{course.dateFrom} - {course.dateTo}</p>
                <p className={styles.previewContentP}>{course.courseName}</p>
                <p  className={styles.previewTitleP}>{course.organization} {course.location}</p>
            </div>
    )
}

const CourseBlock = ({courses, breakPoint=false, secondBreakPoint=false}) => {

    const elementClasses = classNames(styles.rightBlocks, {
        [styles.breakPoint]: breakPoint == 5 || secondBreakPoint == 5,
      });

    return(
        <div className={elementClasses}>
            <div className={styles.rightBlocksHeader}>
                <p>Courses</p>
            </div>
            <div className={styles.rightBlocksContent}>
                {courses.map(course => 
                    <SingleCourse key={course.id} course={course} />
                )}
            </div>
        </div>
    )
}

export default CourseBlock;

