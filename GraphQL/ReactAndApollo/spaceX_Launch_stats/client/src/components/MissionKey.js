import React from 'react'

export default function MissionKey() {
    return (
        <div className='my-3' style={{color:'white'}}>
            <p>
                <span className='px-3 mr-3 bg-success'>  Success</span>
            </p>
            <p>
                <span className='px-3 mr-3 bg-danger'> Fail </span>
            </p>
        </div>
    )
}
