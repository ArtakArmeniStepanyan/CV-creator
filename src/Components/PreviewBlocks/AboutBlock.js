import styles from '../Preview.module.css';
import classNames from 'classnames';


const AboutBlock = ({about, breakPoint=false}) => {

    const elementClasses = classNames(styles.rightBlocks, {
        [styles.breakPoint]: breakPoint == 1,
      });

    return(
        <div className={elementClasses}>
            <div className={styles.rightBlocksHeader}>
                <p>About</p>
            </div>
            <div className={styles.rightBlocksContent}>
                <p className={styles.previewTitleP}>{about}</p>
            </div>
        </div> 
    )
}

export default AboutBlock;