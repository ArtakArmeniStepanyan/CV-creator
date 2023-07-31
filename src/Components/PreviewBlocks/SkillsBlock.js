import styles from '../Preview.module.css';
import { Progress } from 'antd';


const SingleSkill = ({skill}) => {

    return( 
            <div className={styles.previewSinglelLeftDiv}>
                <div className={styles.previewProgressDiv}>
                    <div className={styles.previewProgressTitle}>
                        <p>{skill.title}</p>
                    </div>
                    <div className={styles.previewProgressLevel}>
                        <Progress steps={5} percent={skill.level*20} format={() => ''} size={[16, 10]} />
                    </div>
                </div>
            </div>
    )
}

const SkillsBlock = ({skills}) => {

    return(
        <div className={styles.leftBlocks}>
            <div className={styles.leftBlocksHeader}>
                <p>Skills</p>
            </div>
            <div className={styles.leftBlockContent}>
                {skills.map(skill => 
                    <SingleSkill key={skill.id} skill={skill} />
                )}
            </div>
        </div>
    )
}

export default SkillsBlock;

