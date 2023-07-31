let initialState = []

const courseReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD-COURSE':
            return[
                ...state,
                {
                    id: Math.round(Math.random()*10000),
                    organization: action.payload.organization,
                    courseName: action.payload.courseName,
                    location: action.payload.location,
                    dateFrom: action.payload.dateFrom,
                    dateTo: action.payload.dateTo
                }
            ]
        case 'DELETE-COURSE':
          return state.filter((s) => s.id !== action.payload) 
        case 'EDIT-COURSE':
            return state.map((s) => {
              if(s.id === action.payload.id){
                return {
                    id: Math.round(Math.random()*10000),
                    organization: action.payload.course.organization,
                    courseName: action.payload.course.courseName,
                    location: action.payload.course.location,
                    dateFrom: action.payload.course.dateFrom,
                    dateTo: action.payload.course.dateTo
                };
              }
                return s;
            })
        default:
            return state;
        }
}


//AC`s
export const addCourseAC = (course) => {
    if(!course.dateTo)
        course.dateTo = 'Present';

    return {type: 'ADD-COURSE', payload: course}
};

export const deleteCourseAC = (id) => {
    return {type: 'DELETE-COURSE', payload: id}
};

export const editCourseAC = (id, course) => {
    if(!course.dateTo)
        course.dateTo = 'Present';
    return {type: 'EDIT-COURSE', payload: {id, course}}
};

export default courseReducer;
