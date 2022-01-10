import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { addDataToAPI, deleteDataAPI, getDataFromAPI, updateDataAPI } from '../../../config/redux/action'

import './index.scss'

class Dashboard extends Component {
    state = {
        title: "",
        content: "",
        date: "",
        textButton: "SIMPAN",
        noteId: ""
    }

    componentDidMount(){
        const userData = JSON.parse(localStorage.getItem('userData'))
        this.props.getNotes(userData.uid)
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSaveNotes = () => {
        const {title, content, textButton, noteId} = this.state
        const { saveNotes, updateNotes } = this.props
        const userData = JSON.parse(localStorage.getItem('userData'))

        const data = {
            title,
            content,
            noteId,
            date: new Date().getTime(),
            userId: userData.uid
        }

        if(textButton === 'SIMPAN') {
            saveNotes(data)
        } else {
            data.noteId = noteId
            updateNotes(data)
        }

        console.log('data saved: ', data);
    }

    updateNotes = (note) => {
        console.log('updateNotes: ', note);
        this.setState({
            title: note.arrayData.title,
            content: note.arrayData.content,
            textButton: "UPDATE",
            noteId: note.id
        })
    }

    cancelUpdate = () => {
        this.setState({
            title: '',
            content: '',
            textButton: "SIMPAN"
        })
    }

    deleteNote = (e, note) => {
        e.stopPropagation()
        const userData = JSON.parse(localStorage.getItem('userData'))
        const { deleteNote } = this.props;
        const data = {
            userId: userData.uid,
            noteId: note.id
        }
        deleteNote(data)
    }

    const 
    render() {
        const {title, content, textButton} = this.state
        const {notes} = this.props
        console.log('notes: ', notes);
        return (
            <div className="container">
                <div className="input-form">
                    <input type="text" placeholder="title" className="input-title" id="title" value={title} onChange={this.onInputChange} />
                    <textarea placeholder="content" className="input-content" id="content" value={content} onChange={this.onInputChange} ></textarea>
                    <div className="action-wrapper">
                        {
                            (textButton === 'UPDATE') ? (
                                <button className="save-btn cancel" onClick={this.cancelUpdate}>CANCEL</button>
                            ) : <div></div>
                        }
                        <button className="save-btn" onClick={this.handleSaveNotes}>{textButton}</button>
                    </div>
                </div>
                <hr />
                {
                    notes.length > 0 ? (
                        <Fragment>
                            {
                                notes.map(note => {
                                    return (
                                        <div className="card-content" key={note.id} onClick={() => this.updateNotes(note)}>
                                            <p className="title">{note.arrayData.title}</p>
                                            <p className="date">{note.arrayData.date}</p>
                                            <p className="content">{note.arrayData.content}</p>
                                            <div className="delete-btn" onClick={(e) => this.deleteNote(e, note)}>X</div>
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
}

const reduxState = (state) => ({
    userData: state.user,
    notes: state.notes
})

const reduxDispatch = (dispatch) => ({
    saveNotes: (data) => dispatch(addDataToAPI(data)),
    getNotes: (data) => dispatch(getDataFromAPI(data)),
    updateNotes: (data) => dispatch(updateDataAPI(data)),
    deleteNote: (data) => dispatch(deleteDataAPI(data))
})

export default connect(reduxState, reduxDispatch)(Dashboard)