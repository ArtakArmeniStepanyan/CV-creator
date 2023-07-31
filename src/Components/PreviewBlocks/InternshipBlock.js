import styles from '../Preview.module.css';
import classNames from 'classnames';

const SingleInternship = ({internship}) => {

    return( 
            <div className={styles.previewSinglelRightDiv}>
                <p className={styles.previewDateP}>{internship.dateFrom} - {internship.dateTo}</p>
                <p className={styles.previewContentP}>{internship.role}</p>
                <p  className={styles.previewTitleP}>{internship.company} {internship.location}</p>
            </div>
    )
}

const InternshipBlock = ({internships, breakPoint=false, secondBreakPoint=false}) => {

    const elementClasses = classNames(styles.rightBlocks, {
        [styles.breakPoint]: breakPoint == 4 || secondBreakPoint == 4,
      });

    return(
        <div className={elementClasses}>
            <div className={styles.rightBlocksHeader}>
                <p>Internship</p>
            </div>
            <div className={styles.rightBlocksContent}>
                {internships.map(internship => 
                    <SingleInternship key={internship.id} internship={internship} />
                )}
            </div>
        </div>
    )
}

export default InternshipBlock;

