import React from 'react'
import {useField} from 'formik'

const TextInput = props => {
    const [field, meta] = useField(props.name)
    return (
        <div className={"input-wrapper"}>
            {props.label && <label htmlFor={props.name}>{props.label}</label>}
            <input 
                {...field}
                {...props}
            />
            {meta.error && meta.touched && <p className="error">{meta.error}</p>}
        </div>
    )
}

export default TextInput