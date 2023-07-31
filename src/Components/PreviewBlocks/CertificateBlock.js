import styles from '../Preview.module.css';
import classNames from 'classnames';

const SingleCertificate = ({certificate}) => {

    return( 
            <div className={styles.previewSinglelRightDiv}>
                <p className={styles.previewDateP}>{certificate.date}</p>
                <p className={styles.previewContentP}>{certificate.title}</p>
                <p  className={styles.previewTitleP}>{certificate.provider} {certificate.location}</p>
            </div>
    )
}

const CertificateBlock = ({certificates, breakPoint=false, secondBreakPoint=false}) => {

    const elementClasses = classNames(styles.rightBlocks, {
        [styles.breakPoint]: breakPoint == 6 || secondBreakPoint == 6,
      });

    return(
        <div className={elementClasses}>
            <div className={styles.rightBlocksHeader}>
                <p>Certificates</p>
            </div>
            <div className={styles.rightBlocksContent}>
                {certificates.map(certificate => 
                    <SingleCertificate key={certificate.id} certificate={certificate} />
                )}
            </div>
        </div>
    )
}

export default CertificateBlock;

