import 'bootstrap/dist/css/bootstrap.min.css';

import MyForm from './Components/MyForm';
import PreviewMy from './Components/PreviewMy';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Components/Preview.module.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { getIsLoading } from './Redux/Slices/RersonalInfo/personalInfoSelector';

import classNames from 'classnames';
import loader from './Photos/loader.webp';

function App() {
  const isLoading = useSelector(getIsLoading);
  const elementClasses = classNames(styles.app, {
    [styles.makeOpacity]: isLoading});

  library.add(faTrash, faPenToSquare)

  
  return (
  <>
    {isLoading ? <div className={styles.loader}  style={{ backgroundImage: `url(${loader})` }}></div> : ''}
    
    <div className={elementClasses}>
      <Container>
        <Row>
          <Col sm={8}>
            <PreviewMy />
          </Col>
          <Col sm={4}>
            <MyForm />
          </Col>
        </Row>
      </Container> 
    </div>
  </>
    
  );
}

export default App;
