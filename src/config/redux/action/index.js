import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { getDatabase, ref, push, onValue, set, remove } from "firebase/database";

import { database } from '../../firebase'

export const registerUserAPI = (data) => (dispatch) => {
    return new Promise ((resolve, reject) => {
        dispatch({type: "CHANGE_LOADING", value: true})
    
        createUserWithEmailAndPassword(getAuth(), data.email, data.password)
        .then((res) => {
            console.log('success:', res);
            dispatch({
                type: "CHANGE_LOADING",
                value: false
            })
            resolve(true)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            dispatch({
                type: "CHANGE_LOADING",
                value: false
            })
            reject(false)
        })
    })
}

export const loginUserAPI = (data) => (dispatch) => {
    return new Promise ((resolve, reject) => {
        dispatch({type: "CHANGE_LOADING", value: true})
    
        signInWithEmailAndPassword(getAuth(), data.email, data.password)
        .then((res) => {
            console.log('success:', res);
            const dataUser = {
                email: res.user.email,
                uid: res.user.uid,
                emailVerified: res.user.emailVerified,
                refreshToken: res.user.refreshToken
            }
            dispatch({type: "CHANGE_LOADING", value: false})
            dispatch({type: "CHANGE_ISLOGIN", value: true})
            dispatch({type: "CHANGE_USER", value: dataUser})
            resolve(dataUser)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            dispatch({type: "CHANGE_LOADING", value: false})
            dispatch({type: "CHANGE_ISLOGIN", value: false})
            reject(false)
        })
    })
}

export const addDataToAPI = (data) => () => {
    const db = getDatabase();
    push(ref(db, 'notes/' + data.userId), {
        title: data.title,
        date: data.date,
        content : data.content
    });
}

export const getDataFromAPI = (userId) => (dispatch) => {
    const starCountRef = ref(database, 'notes/' + userId);
    return new Promise((resolve, reject) => {
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                console.log('get data: ', data);
                const arrayData = []
                Object.keys(data).map(key => {
                    return arrayData.push({
                        id: key,
                        arrayData: data[key] 
                    })
                })
                dispatch({type: 'SET_NOTES', value: arrayData})
                resolve(data)
            } else {
                console.log('No data available!');
            }
        });
    })
}

export const updateDataAPI = (data) => (dispatch) => {
    const starCountRef = ref(database, `notes/${data.userId}/${data.noteId}`);
    return new Promise ((resolve, reject) => {
        set(starCountRef, {
            title: data.title,
            date: data.date,
            content : data.content
        })
        .then(() => {
            resolve(true)
        })
        .catch((error) => {
            reject(false)
        });
    })
}

export const detailDataAPI = (data) => (dispatch) => {
    console.log('detailDataAPI', data);
    const starCountRef = ref(database, `notes/${data.userId}/${data.noteId}`);
    return new Promise ((resolve, reject) => {
        onValue(starCountRef, (snapshot) => {
            const note = {
                title: data.arrayData.title,
                content: data.arrayData.content,
                date: data.arrayData.date,
                noteId: data.id
            }
            console.log('get data: ', note);
            // const data = snapshot.val();
            // console.log('get data: ', data);
            // const arrayData = []
            // Object.keys(data).map(key => {
            //     return arrayData.push({
            //         id: key,
            //         arrayData: data[key] 
            //     })
            // })
            dispatch({type: 'SET_NOTES', value: note})
            console.log('set notes: ', note);
            resolve(data)
        });
    })
}

export const deleteDataAPI = (data) => (dispatch) => {
    const starCountRef = ref(database, `notes/${data.userId}/${data.noteId}`);
    return new Promise ((resolve, reject) => {
        remove(starCountRef)
    })
}
