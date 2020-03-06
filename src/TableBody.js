import React from 'react';
import {HEADERS} from './GlobalValues';
import TableRow from'./TableRow';

class TableBody extends React.Component {

	constructor(props) {
        super(props);
    }

    renderRowItem = () =>{
    	let list = null;
        list = this.props.data.map((item, index) => {
			return (
				<TableRow 
		            key={index}
		            id={item.id} 
		            firstName={item.firstName}
		            lastName={item.lastName}
		            email={item.email}
		            phone={item.phone}
		            address={item.address}
		            description={item.description}
		            columns={this.props.columns}
	            />
	        )
	    })
        return list;
    }
    
    render(){
    	return(
    		<React.Fragment>
    			{this.renderRowItem()}
    		</React.Fragment>
    	)
    }
}

export default TableBody;