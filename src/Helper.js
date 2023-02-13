import React, { Fragment } from 'react'
import { toast } from 'react-toastify'
import { CheckCircle, X } from 'react-feather'
import { Card } from 'reactstrap'

const OpenToast = ({ color, title, message }) => (
    <Fragment>
        <div className='toastify-header'>
            <div className='title-wrapper'>
                <Card size='sm' color={color} icon={(color === 'success') ? <CheckCircle size={12} /> : <X size={12} />} />
                <h6 className='toast-title'>{title}</h6>
            </div>
        </div>
        <div className='toastify-body'>
            <span>{message}</span>
        </div>
    </Fragment>
)

const OpenNotification = (type, title, message) => {
    toast[type](<OpenToast color={(type === 'error') ? 'danger' : type} title={title} message={message} />, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true
    })
}

export { OpenNotification }