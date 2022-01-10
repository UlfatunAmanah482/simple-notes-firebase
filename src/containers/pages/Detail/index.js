import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/atoms/Button'
import { updateDataAPI } from '../../../config/redux/action'

class Detail extends Component {
    state = {
        title: this.props.notes.title,
        content: this.props.notes.content
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleUpdate = (note) => {
        console.log('note update: ', note);
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            title: this.state.title,
            content: this.state.content,
            date: new Date().getTime(),
            userId: userData.uid,
            noteId: this.props.notes.noteId
        }

        console.log('data handleUpdate: ', data);
        this.props.updateNote(data)
    }

    render() {
        const { title, content } = this.state;
        const { notes, isLoading } = this.props;
        console.log("notes detail: ", notes);
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title">Detail Page</p>
                    <input className="input" id="title" type="text" placeholder="Title" value={title} onChange={this.onInputChange} />
                    <input className="input" id="content" type="text" placeholder="Content" value={content} onChange={this.onInputChange} />
                    <Button onClick={this.handleUpdate} title="UPDATE" loading={isLoading} />
                </div>
            </div>
        )
    }
}

const reduxState = (state) => ({
    notes: state.notes,
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    updateNote: (data) => dispatch(updateDataAPI(data))
})

export default connect(reduxState, reduxDispatch)(Detail)