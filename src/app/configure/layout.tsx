import React from 'react'
import Stepper from './upload/Stepper'

const layout = ({children}:any) => {
  return (
    <div>
        <Stepper />
        {children}

    </div>
)
}

export default layout