import React from 'react'
import Routers from './routes/Routers'
import { ActiveComponentProvider } from './context/ActiveComponentContext'

const App = () => {
  return (
    <ActiveComponentProvider>
      <Routers />
    </ActiveComponentProvider>
  )
}

export default App