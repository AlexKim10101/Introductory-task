import React from 'react';
import {HEADERS} from './GlobalValues';

class TableRow extends React.Component {

	constructor(props) {
        super(props);
        
    }

    renderTableItem = () =>{
        let list = null;
        let columns = this.props.columns;
        list = columns.map((item, index)=>{
            return <td className="table__cell">
                {this.props[item]}
            </td>
        })
        return list;
    }
    
    render(){
    	return(
            <tr className="table-row">
                {this.renderTableItem()}
            </tr>
    	);
    }
}

export default TableRow;