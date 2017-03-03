import React from 'react';
import ReactDOM from 'react-dom';


// For hot reloading to work it is essential
// that our entry point only contains this render
// and that the first component is a module.
//
//
//

const App = (props) => {
  return (
    <div>Welcome to Examples</div>
  )
}


ReactDOM.render(
  <App />,
    document.getElementById('content')
);
