import { ReactElement } from 'react'
import Stepper from './upload/Stepper'

const layout = ({children}:{children:ReactElement}) => {
  return (
    <div>
        <Stepper />
        {children}

    </div>
)
}

export default layout