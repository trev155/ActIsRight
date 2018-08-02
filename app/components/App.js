import React from 'react';
import { Header } from './Header';
import { MainContent } from './MainContent';

export class App extends React.Component {
	render() {
		return (
		    <div className="App">
		        <Header/>
                <MainContent/>
		    </div>
		);
	}
}