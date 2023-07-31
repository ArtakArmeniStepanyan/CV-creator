
let initialState = []

const skillsReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD-SKILL':
            return[
                ...state,
                {
                    id: Math.round(Math.random()*10000),
                    title: action.payload.title,
                    level: action.payload.level
                }
            ]
        case 'DELETE-SKILL':
          return state.filter((s) => s.id !== action.payload) 
        case 'EDIT-SKILL':
            return state.map((s) => {
              if(s.id === action.payload.id){
                return {
                    id: Math.round(Math.random()*10000),
                    title: action.payload.skill.title,
                    level: action.payload.skill.level
                };
              }
                return s;
            })
        default:
            return state;
        }
}


//AC`s
export const addSkillAC = (skill) => {
    return {type: 'ADD-SKILL', payload: skill}
};

export const deleteSkillAC = (id) => {
    return {type: 'DELETE-SKILL', payload: id}
};

export const editSkillAC = (id, skill) => {
    return {type: 'EDIT-SKILL', payload: {id, skill}}
};

export default skillsReducer;
