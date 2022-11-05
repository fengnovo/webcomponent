import React from 'react';  // 这个必须要有
import { WiredButton, WiredInput } from "wired-elements"
import './x1.scss';

const App = () => {
    let textInput = React.createRef();

    const handleClick = () => {
        alert(textInput.current.value);
      }

    return <div className='container'>
        <span className='text'>Hello vite React</span>
        <wired-input placeholder="Enter name" ref={textInput}></wired-input>
        <wired-button onClick={handleClick}>Click Me</wired-button>
    </div>
}
export default App;