import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { faSortUp } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

class HeaderItem extends React.Component {

	constructor(props) {
        super(props);
        
        this.close = this.close.bind(this);

    
    }

    close = (e) =>{
        e.stopPropagation();
        console.log('close');
    }

    render(){

        let sort = ((this.props.sortColumn == this.props.name) && (this.props.sortType=='desc')) ? faSortDown:faSortUp;
       
    	return(
            <td className="headerColumn">
                <div className="flexbox" onClick={this.props.onSort.bind(null, this.props.name)}>
                    <div className="headerColumn__text">{this.props.name}</div>
                    <div className="headerColumn__buttons-container">
                        <button className="headerColumn__button">
                            <FontAwesomeIcon className="icon" icon={sort} />
                        </button>                            

                        <button className="headerColumn__button" onClick={this.close}>
                            <FontAwesomeIcon className="icon" icon={faTimes} onClick={this.props.close.bind(null, this.props.name)}/>
                        </button>
                    </div>
                </div>            

            </td>           
    	);
        
    }

}

export default HeaderItem;
