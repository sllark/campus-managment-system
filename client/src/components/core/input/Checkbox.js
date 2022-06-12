import React from 'react'

const Checkbox = (props) => {
  return (<label htmlFor={props.id} className='flex items-center justify-center gap-4 cursor-pointer pl-5'>
            <input
                className='w-auto'
                type="checkbox"
                name={props.id}
                id={props.id}
                checked={props.checked}
                onChange={() => {
                  props.toggleCheck(props.id)
                }}
            />
            <p className='text-4xl'>
                {props.name}
            </p>
        </label>
  )
}

export default Checkbox
