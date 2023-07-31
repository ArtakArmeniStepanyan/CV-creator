import styles from '../Preview.module.css';
import classNames from 'classnames';

const SingleExperience = ({experience}) => {

    return( 
            <div className={styles.previewSinglelRightDiv}>
                <p className={styles.previewDateP}>{experience.dateFrom} - {experience.dateTo}</p>
                <p className={styles.previewContentP}>{experience.role}</p>
                <p  className={styles.previewTitleP}>{experience.company} {experience.location}</p>
            </div>
    )
}

const ExperienceBlock = ({experiences, breakPoint=false, secondBreakPoint=false}) => {

    const elementClasses = classNames(styles.rightBlocks, {
        [styles.breakPoint]: breakPoint == 3 || secondBreakPoint == 3,
      });

    return(
        <div className={elementClasses}>
            <div className={styles.rightBlocksHeader}>
                <p>Experience</p>
            </div>
            <div className={styles.rightBlocksContent}>
                {experiences.map(experience => 
                    <SingleExperience key={experience.id} experience={experience} />
                )}
            </div>
        </div>
    )
}

export default ExperienceBlock;

