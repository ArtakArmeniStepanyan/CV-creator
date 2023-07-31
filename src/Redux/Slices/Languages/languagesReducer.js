let initialState = []

const languagesReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD-LANGUAGE':
            return[
                ...state,
                {
                    id: Math.round(Math.random()*10000),
                    title: action.payload.title,
                    level: action.payload.level
                }
            ]
        case 'DELETE-LANGUAGE':
          return state.filter((s) => s.id !== action.payload) 
        case 'EDIT-LANGUAGE':
            return state.map((s) => {
              if(s.id === action.payload.id){
                return {
                    id: Math.round(Math.random()*10000),
                    title: action.payload.language.title,
                    level: action.payload.language.level
                };
              }
                return s;
            })
        default:
            return state;
        }
}


//AC`s
export const addLanguageAC = (language) => {
    return {type: 'ADD-LANGUAGE', payload: language}
};

export const deleteLanguageAC = (id) => {
    return {type: 'DELETE-LANGUAGE', payload: id}
};

export const editLanguageAC = (id, language) => {
    return {type: 'EDIT-LANGUAGE', payload: {id, language}}
};

export default languagesReducer;