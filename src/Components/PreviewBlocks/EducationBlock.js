import styles from '../Preview.module.css';
import classNames from 'classnames';

const SingleEducation = ({education}) => {

    return( 
            <div className={styles.previewSinglelRightDiv}>
                <p className={styles.previewDateP}>{education.dateFrom} - {education.dateTo}</p>
                <p className={styles.previewContentP}>{education.speciality}</p>
                <p  className={styles.previewTitleP}>{education.university} {education.location}</p>
            </div>
    )
}

const EducationBlock = ({educations, breakPoint=false}) => {

    const elementClasses = classNames(styles.rightBlocks, {
        [styles.breakPoint]: breakPoint == 2,
      });

    return(
        <div className={elementClasses}>
            <div className={styles.rightBlocksHeader}>
                <p>Education</p>
            </div>
            <div className={styles.rightBlocksContent}>
                {educations.map(education => 
                    <SingleEducation key={education.id} education={education} />
                )}
            </div>
        </div>
    )
}

export default EducationBlock;

