let initialState = []

const internshipReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD-INTERNSHIP':
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
        case 'DELETE-INTERNSHIP':
          return state.filter((s) => s.id !== action.payload) 
        case 'EDIT-INTERNSHIP':
            return state.map((s) => {
              if(s.id === action.payload.id){
                return {
                    id: Math.round(Math.random()*10000),
                    company: action.payload.internship.company,
                    role: action.payload.internship.role,
                    location: action.payload.internship.location,
                    dateFrom: action.payload.internship.dateFrom,
                    dateTo: action.payload.internship.dateTo
                };
              }
                return s;
            })
        default:
            return state;
        }
}


//AC`s
export const addInternshipAC = (internship) => {
    if(!internship.dateTo)
        internship.dateTo = 'Present';

    return {type: 'ADD-INTERNSHIP', payload: internship}
};

export const deleteInternshipAC = (id) => {
    return {type: 'DELETE-INTERNSHIP', payload: id}
};

export const editInternshipAC = (id, internship) => {
    if(!internship.dateTo)
        internship.dateTo = 'Present';
    return {type: 'EDIT-INTERNSHIP', payload: {id, internship}}
};

export default internshipReducer;
