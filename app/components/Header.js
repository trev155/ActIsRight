import React from 'react';

export class Header extends React.Component {
    /*
    Add a Sticky Header
    */
    componentDidMount() {
        let header = document.getElementById("Header");
        let sticky = header.offsetTop;

        window.onscroll = function() {
            if (window.pageYOffset > sticky) {
                header.classList.add("sticky");
            } else {
                header.classList.remove("sticky");
            }
        }
    }

    render() {
        return (
            <div className="Header" id="Header">
                <h1>The Act Is Right</h1>
            </div>
        );
    }
}