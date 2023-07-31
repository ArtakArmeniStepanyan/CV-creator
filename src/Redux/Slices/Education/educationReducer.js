let initialState = []

const educationReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD-EDUCATION':
            return[
                ...state,
                {
                    id: Math.round(Math.random()*10000),
                    university: action.payload.university,
                    speciality: action.payload.speciality,
                    location: action.payload.location,
                    dateFrom: action.payload.dateFrom,
                    dateTo: action.payload.dateTo
                }
            ]
        case 'DELETE-EDUCATION':
          return state.filter((s) => s.id !== action.payload) 
        case 'EDIT-EDUCATION':
            return state.map((s) => {
              if(s.id === action.payload.id){
                return {
                    id: Math.round(Math.random()*10000),
                    university: action.payload.education.university,
                    speciality: action.payload.education.speciality,
                    location: action.payload.education.location,
                    dateFrom: action.payload.education.dateFrom,
                    dateTo: action.payload.education.dateTo
                };
              }
                return s;
            })
        default:
            return state;
        }
}


//AC`s
export const addEducationAC = (education) => {
    if(!education.dateTo)
        education.dateTo = 'Present';

    return {type: 'ADD-EDUCATION', payload: education}
};

export const deleteEducationAC = (id) => {
    return {type: 'DELETE-EDUCATION', payload: id}
};

export const editEducationAC = (id, education) => {
    if(!education.dateTo)
        education.dateTo = 'Present';
    return {type: 'EDIT-EDUCATION', payload: {id, education}}
};

export default educationReducer;
