let initialState = []

const certificateReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD-CERTIFICATE':
            return[
                ...state,
                {
                    id: Math.round(Math.random()*10000),
                    provider: action.payload.provider,
                    title: action.payload.title,
                    location: action.payload.location,
                    date: action.payload.date
                }
            ]
        case 'DELETE-CERTIFICATE':
          return state.filter((s) => s.id !== action.payload) 
        case 'EDIT-CERTIFICATE':
            return state.map((s) => {
              if(s.id === action.payload.id){
                return {
                    id: Math.round(Math.random()*10000),
                    provider: action.payload.certificate.provider,
                    title: action.payload.certificate.title,
                    location: action.payload.certificate.location,
                    date: action.payload.certificate.date
                };
              }
                return s;
            })
        default:
            return state;
        }
}


//AC`s
export const addCertificateAC = (certificate) => {
    return {type: 'ADD-CERTIFICATE', payload: certificate}
};

export const deleteCertificateAC = (id) => {
    return {type: 'DELETE-CERTIFICATE', payload: id}
};

export const editCertificateAC = (id, certificate) => {
    return {type: 'EDIT-CERTIFICATE', payload: {id, certificate}}
};

export default certificateReducer;
