import { useState } from 'react'
import useCounterStore from './store/useCounterStore'
import ButtonComp from './ButtonComp';

function App() {
  const { count } = useCounterStore();

  return (
    <>
      <div>
        <p>카운트{count}</p>
      </div>
      <div>
        <ButtonComp />
      </div>
    </>
  )
}

export default App
