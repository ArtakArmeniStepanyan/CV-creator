let initialState = []

const experienceReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD-EXPERIENCE':
            return[
                ...state,
                {
                    id: Math.round(Math.random()*10000),
                    company: action.payload.company,
                    role: action.payload.role,
                    location: action.payload.location,
                    dateFrom: action.payload.dateFrom,
                    dateTo: action.payload.dateTo
                }
            ]
        case 'DELETE-EXPERIENCE':
          return state.filter((s) => s.id !== action.payload) 
        case 'EDIT-EXPERIENCE':
            return state.map((s) => {
              if(s.id === action.payload.id){
                return {
                    id: Math.round(Math.random()*10000),
                    company: action.payload.experience.company,
                    role: action.payload.experience.role,
                    location: action.payload.experience.location,
                    dateFrom: action.payload.experience.dateFrom,
                    dateTo: action.payload.experience.dateTo
                };
              }
                return s;
            })
        default:
            return state;
        }
}


//AC`s
export const addExperienceAC = (experience) => {
    if(!experience.dateTo)
        experience.dateTo = 'Present';

    return {type: 'ADD-EXPERIENCE', payload: experience}
};

export const deleteExperienceAC = (id) => {
    return {type: 'DELETE-EXPERIENCE', payload: id}
};

export const editExperienceAC = (id, experience) => {
    if(!experience.dateTo)
        experience.dateTo = 'Present';
    return {type: 'EDIT-EXPERIENCE', payload: {id, experience}}
};

export default experienceReducer;
