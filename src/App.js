import React from 'react';
import Main from './Main';

class App extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="app">
                <header className="header">
                    <h1 className="header__title">Title</h1>
                </header>

                <Main />

                <footer className="footer">
                    <div className="footer__text">&copy; 2020</div>
                </footer>
            </div>
        );
    }
}

export default App;