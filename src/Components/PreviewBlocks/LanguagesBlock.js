import styles from '../Preview.module.css';
import { Progress } from 'antd';


const SingleLanguage = ({language}) => {

    return( 
            <div className={styles.previewSinglelLeftDiv}>
                <div className={styles.previewProgressDiv}>
                    <div className={styles.previewProgressTitle}>
                        <p>{language.title}</p>
                    </div>
                    <div className={styles.previewProgressLevel}>
                        <Progress steps={5} percent={language.level*20} format={() => ''} size={[16, 10]} />
                    </div>
                </div>
            </div>
    )
}

const LanguagesBlock = ({languages}) => {

    return(
        <div className={styles.leftBlocks}>
            <div className={styles.leftBlocksHeader}>
                <p>Languages</p>
            </div>
            <div className={styles.leftBlockContent}>
                {languages.map(language => 
                    <SingleLanguage key={language.id} language={language} />
                )}
            </div>
        </div>
    )
}

export default LanguagesBlock;

