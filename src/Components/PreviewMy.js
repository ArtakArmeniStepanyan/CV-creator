import styles from './Preview.module.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { getAbout } from '../Redux/Slices/RersonalInfo/personalInfoSelector';
import { getEducations } from '../Redux/Slices/Education/educationSelector';
import { getExperiences } from '../Redux/Slices/Experience/experienceSelector';
import { getInternships } from '../Redux/Slices/Internship/internshipSelector';
import { getCourses } from '../Redux/Slices/Course/courseSelector';
import { getCertificates } from '../Redux/Slices/Certificate/certificateSelector';
import { getSkills } from '../Redux/Slices/Skills/skillsSelector';
import { getLanguages } from '../Redux/Slices/Languages/languagesSelector';

import PersonalBlock from './PreviewBlocks/PersonalBlock';
import AboutBlock from './PreviewBlocks/AboutBlock';
import EducationBlock from './PreviewBlocks/EducationBlock';
import ExperienceBlock from './PreviewBlocks/ExperienceBlock';
import InternshipBlock from './PreviewBlocks/InternshipBlock';
import CourseBlock from './PreviewBlocks/CourseBlock';
import CertificateBlock from './PreviewBlocks/CertificateBlock';
import SkillsBlock from './PreviewBlocks/SkillsBlock';
import LanguagesBlock from './PreviewBlocks/LanguagesBlock';

import { Preview } from "react-html2pdf";
import html2pdf from 'html2pdf.js';


export const generatePdfDownloader = () => {
    
    const elementToConvert = document.getElementById('pdfPage');

    const options = {
      filename: 'CV.pdf', // Specify the name of the output PDF file
      image: { type: 'jpeg', quality: 0.9 }, // Set the image type and quality
      html2canvas: { scale: 2 }, // Set the scaling factor for html2canvas
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }, // Set the document unit, format, and orientation
    };
  
    html2pdf().set(options).from(elementToConvert).save(); // Replace 'element' with the HTML element you want to convert
  };

const PreviewMy = () => {
    const about = useSelector(getAbout);
    const educations = useSelector(getEducations);
    const experiences = useSelector(getExperiences);
    const internships = useSelector(getInternships);
    const courses = useSelector(getCourses);
    const certificates = useSelector(getCertificates);
    const skills = useSelector(getSkills);
    const languages = useSelector(getLanguages);
   
    const [breakPoint, setBreakPoint] = useState(0);
    const [secondBreakPoint, setSecondBreakPoint] = useState(false);

    let block1H, block2H, block3H, block4H, block5H, block6H;
    block1H = block2H = block3H = block4H = block5H = block6H = 0;

    const block1 = document.getElementById('block1');
    if(block1){
        block1H = block1.offsetHeight;
    }

    const block2 = document.getElementById('block2');
    if(block2){
        block2H = block2.offsetHeight;
    }

    const block3 = document.getElementById('block3');
    if(block3){
        block3H = block3.offsetHeight;
    }

    const block4 = document.getElementById('block4');
    if(block4){
        block4H = block4.offsetHeight;
    }

    const block5 = document.getElementById('block5');
    if(block5){
        block5H = block5.offsetHeight;
    }

    const block6 = document.getElementById('block6');
    if(block6){
        block6H = block6.offsetHeight;
    }
    
    const blocks = [
        block1H,
        block2H + block1H,
        block3H + block2H + block1H, 
        block4H + block3H + block2H + block1H,
        block5H + block4H + block3H + block2H + block1H,
        block6H + block5H + block4H + block3H + block2H + block1H
        ]
    const breakPointBlock = blocks.findIndex((block) => block > 685 && block < 1430) + 1;
    const secondBreakPointBlock = blocks.findIndex((block) => block > 1600 && block < 2000) + 1;
    
    if(breakPointBlock && breakPoint !== breakPointBlock){
        setBreakPoint(breakPointBlock);
    }
    if(secondBreakPointBlock && secondBreakPoint !== secondBreakPointBlock){
        setSecondBreakPoint(secondBreakPointBlock);
    }

    return(<>
        
        <Preview id={"pdfPage"}>
            <div className={styles.main}>
            <PersonalBlock />
                <div className={styles.content}>
                    <div className={styles.contentLeft}>
                        {skills.length > 0 ? 
                            <SkillsBlock skills={skills} />
                        : ''}
                        {languages.length > 0 ? 
                            <LanguagesBlock languages={languages} />
                        : ''}
                    </div>
                    <div className={styles.contentRight}>
                        {about? 
                            <Preview id={"block1"}>
                                <AboutBlock about={about} breakPoint={breakPoint} />
                            </Preview>
                        : ''}
                        {educations.length > 0 ? 
                            <Preview id={"block2"}>
                                <EducationBlock educations={educations} breakPoint={breakPoint} />
                            </Preview>
                        : ''}
                        {experiences.length > 0 ? 
                            <Preview id={"block3"}>
                                <ExperienceBlock experiences={experiences} breakPoint={breakPoint} secondBreakPoint={secondBreakPoint}/>
                            </Preview>
                        : ''}
                        {internships.length > 0 ? 
                            <Preview id={"block4"}>
                                <InternshipBlock internships={internships} breakPoint={breakPoint} secondBreakPoint={secondBreakPoint}/>
                            </Preview>
                        : ''}
                        {courses.length > 0 ? 
                            <Preview id={"block5"}>
                                <CourseBlock courses={courses} breakPoint={breakPoint} secondBreakPoint={secondBreakPoint}/>
                            </Preview>
                        : ''}
                        {certificates.length > 0 ? 
                            <Preview id={"block6"}>
                                <CertificateBlock certificates={certificates} breakPoint={breakPoint} secondBreakPoint={secondBreakPoint}/>
                            </Preview>
                        : ''}
                    </div>
                </div>
            </div>
        </Preview>  
    </>
        
    )
}

export default PreviewMy;