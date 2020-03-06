import React from 'react';

import HeaderItem from'./HeaderItem';
import {HEADERS} from './GlobalValues';



class TableHeaders extends React.Component {

	constructor(props) {
        super(props);
        this.state = {

        }
    }

    renderHeaders = () => {
    	let list = null;
    	list = this.props.columns.map((item, index)=>{
    		return <HeaderItem
    			key={index} 
    			name={item} 
                onSort={this.props.onSort}
                sortColumn={this.props.sortColumn}
                sortType={this.props.sortType}
                close={this.props.close}
    		/>
    	})
    	return list;
    }

    render(){
    	return(
    		<thead>
                <tr>
                    {this.renderHeaders()}
                </tr> 				
    		</thead>
    	)
    }
}


export default TableHeaders;