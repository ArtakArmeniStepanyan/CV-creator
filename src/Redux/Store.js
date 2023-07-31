import { createStore, combineReducers, applyMiddleware } from 'redux';
import personalReducer from "./Slices/RersonalInfo/personalReducer";
import educationReducer from "./Slices/Education/educationReducer";
import experienceReducer from "./Slices/Experience/experienceReducer";
import internshipReducer from "./Slices/Internship/internshipReducer";
import courseReducer from "./Slices/Course/courseReducer";
import certificateReducer from "./Slices/Certificate/certificateReducer";
import skillsReducer from "./Slices/Skills/skillsReducer";
import languagesReducer from "./Slices/Languages/languagesReducer";

let reducers = combineReducers({
    personalInfo: personalReducer,
    education: educationReducer,
    experience: experienceReducer,
    internship: internshipReducer,
    course: courseReducer,
    certificate: certificateReducer,
    skills: skillsReducer,
    languages: languagesReducer
})


let id;
const midl = (store) => (next) => (action) => {
    if(action.type.slice(0, 3) !== 'SET')
        next(action)
    else{
        if(id)
            clearTimeout(id);
        id = setTimeout(() => next(action), 1000)
        }
}

let store = createStore(reducers, applyMiddleware(midl)); // , 

export default store;