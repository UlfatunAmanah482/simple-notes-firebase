import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { getDataFromAPI, detailDataAPI, deleteDataAPI } from '../../../config/redux/action'

function NewDashboard(props) {
    const history= useNavigate()

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        props.getNotes(userData.uid)
    }, [])

    const handleDetailNotes = async (note) => {
        const res = await props.detailNotes(note)
        if(res) {
            console.log('res: ', res)

            localStorage.setItem('userNotes', JSON.stringify(res))

            history("/detail");
        }
    }

    const handleAddNote = () => {
        history("/create-note");
    }

    const handleDeleteNote  = (e, note) => {
        e.stopPropagation()
        const userData = JSON.parse(localStorage.getItem('userData'))
        const { deleteNote } = props;
        const data = {
            userId: userData.uid,
            noteId: note.id
        }
        deleteNote(data)
    }

    return (
        <div className="container">
            <div className="add_btn">
                <button onClick={handleAddNote}>ADD NOTE</button>
            </div>
            {
                props.notes.length > 0 ? (
                    <Fragment>
                        {
                            props.notes.map(note => {
                                return (
                                    <div className="card-content" key={note.id} onClick={() => handleDetailNotes(note)}>
                                        <p className="title">{note.arrayData.title}</p>
                                        <p className="date">{note.arrayData.date}</p>
                                        <p className="content">{note.arrayData.content}</p>
                                        <div className="delete-btn" onClick={(e) => handleDeleteNote(e, note)}>X</div>
                                    </div>
                                )
                            })
                        }
                    </Fragment>
                ) : null
            }
        </div>
    )
}

const reduxState = (state) => ({
    notes: state.notes
})

const reduxDispatch = (dispatch) => ({
    getNotes: (data) => dispatch(getDataFromAPI(data)),
    detailNotes: (data) => dispatch(detailDataAPI(data)),
    deleteNote: (data) => dispatch(deleteDataAPI(data))
})

export default connect(reduxState, reduxDispatch)(NewDashboard);