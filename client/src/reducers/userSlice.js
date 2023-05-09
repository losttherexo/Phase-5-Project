const initialState = null

export const fetchUser = () => {
    return function (dispatch){
        fetch('/session')
        .then(r => {
          if(r.ok){
            r.json().then(user => {
              dispatch({type: 'user/set', payload: user})})
          }else {
            dispatch({type: 'user/set', payload: null})
          }
        })
    }
}

export const loginUser = (values) => {
    return function(dispatch){
        fetch('/login', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(values)
        })
        .then(r => {
            if(r.ok){
                r.json().then(user => {
                    dispatch({type: 'user/set', payload:user})
                })
            }else{
                dispatch({type: 'user/set', payload: null})
            }
        })
    }
}

export const signupUser = (values) => {
    return function (dispatch){
        fetch('/signup', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(values)
        })
        .then(r => {
            if(r.ok){
                r.json().then(user => {
                    dispatch({type: 'user/set', payload:user})
                })
            }else{
                dispatch({type: 'user/set', payload: null})
            }
        })
    }
}

export const logoutUser = () => {
    return function (dispatch){
        fetch('/logout',{
            method: 'DELETE'
        })
        .then(r => {
            if(r.ok){
                dispatch({type: 'user/set', payload: null})
            }else{
                console.log('uh oh write an error message')
            }
        }) 
    }
}

export const updateUser = (values) => {
    return function(dispatch){
        fetch(`/dustheads/${values.id}`, {
            method:'PATCH',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(values)
        })
        .then(r => {
            if(r.ok){
                r.json().then(user => {
                    dispatch({type: 'user/set', payload:user})
                })
            }
        })
    }
}

export const deleteUser = (id) => {
    return function(dispatch){
        fetch(`/dustheads/${id}`, {
            method: 'DELETE'
        })
        dispatch({type: 'user/set', payload: null})
    }
}

export const addCopyToUser = (copy) => {
    return {
      type: 'user/addCopy',
      payload: copy
    }
}

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case 'user/set':
            return action.payload
        case 'user/addCopy':
            return {
                ...state,
                copies: [action.payload, ...state.copies]
              }
        default: return state
    }
}