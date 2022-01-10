import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addDataToAPI } from '../../../config/redux/action'
import { useNavigate } from "react-router-dom";

function CreateNote(props) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    // const [date, setDate] = useState("")

    const history= useNavigate()
    const userData = JSON.parse(localStorage.getItem('userData'))

    const handleSaveNotes = () => {
        const data = {
            title,
            content,
            date: new Date().getTime(),
            userId: userData.uid
        }

        // console.log('handleSaveNotes: ', data);
        props.addData(data)
        history("/new-dashboard")
    }

    return (
        <div className="container">
            <div className="input-form">
                <input type="text" placeholder="title" className="input-title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="content" className="input-content" id="content" value={content} onChange={(e) => setContent(e.target.value)} ></textarea>
                <div className="action-wrapper">
                    <button className="save-btn" onClick={handleSaveNotes}>SIMPAN</button>
                </div>
            </div>
        </div>
    )
}

const reduxDispatch = (dispatch) => ({
    addData: (data) => dispatch(addDataToAPI(data))
})

export default connect(null, reduxDispatch)(CreateNote)