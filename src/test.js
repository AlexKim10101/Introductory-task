import React from 'react';
import {ADDRESS} from './GlobalValues';
import {MYARR} from './GlobalValues';

import {HEADERS} from './GlobalValues';
import {NUMBER_VISIBLE_ROWS} from './GlobalValues';
import TableHeaders from './TableHeaders';
import TableBody from './TableBody';
import _ from 'lodash';


function createColumnObj(headers){
    let result = [];
    result = headers.map(function(header){
        return {
            name: header,
            isFilter: false,
            valueFilter:'',
        }
    })

    return result;
}


class Table extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            headersNames: [],
            headersObjects: [],
            selectItem: null,
            sortType: '',
            sortColumn: '',
            search: '',
            searchResult: null,
            isLoading: false,
        }
        
    }



    componentDidMount = () => {
        // const xhr = new XMLHttpRequest();
        // xhr.open('GET', ADDRESS, true); 
        // xhr.send();
        // this.setState({ isLoading: true })
        // xhr.onreadystatechange = () => {
        //     if (xhr.readyState !== 4) {
        //         return false;
        //     }
        //     if (xhr.status !== 200) {
        //         console.log(xhr.status + ': ' + xhr.statusText)
        //     } else {
        //     	let data = JSON.parse(xhr.responseText);
        //     	let dataWithVisibilityField = data.map(function(item){
        //     		item.visibility=true;
        //     		return item;
        //     	});
        //         let headersObjects = createColumnObj(HEADERS);

        //         this.setState({
        //             tableData: dataWithVisibilityField,
        //             headersNames: HEADERS,
        //             headersObjects: headersObjects,
        //             sort: '',
        //     		sortColumn: '',
        //             isLoading: false, 
        //         })
        //     }
        // }

        let dataWithVisibilityField = MYARR.map(function(item){
             item.visibility=true;
             return item;
        });
        let headersObjects = createColumnObj(HEADERS);
        this.setState({
            tableData: dataWithVisibilityField,
            headersNames: HEADERS,
            headersObjects: headersObjects,
            sortType: '',
            sortColumn: '',
            isLoading: false, 
        })
    }

    onSort = sortColumn => {
    	const copyArr = this.state.tableData.slice();
    	let sortType = 'asc';

    	if((sortColumn == this.state.sortColumn) && (this.state.sortType == 'asc')){
    		sortType = 'desc';
    	}
    	const orderedData = _.orderBy(copyArr, sortColumn, sortType);
    	this.setState({
	      	tableData: orderedData,
	      	sortType: sortType,
	      	sortColumn:sortColumn,
	    })
  	}

    onFilter = (columnName, value) =>{
        const copyArr = this.state.tableData.slice();
       

        const result = copyArr.map(function(item){
            item.visibility = Boolean((item[columnName] == value)||(value == ''));
            return item;
        })
        console.log(result);
    }

    render() {
        let visibleRows = this.state.tableData.map(function(item){
            if(item.visibility){
                return item;
            }
        })

    	if(this.state.isLoading){
    		return(
    			<React.Fragment>
    				<div className="preloader preloader--circle"></div>
    				<div className="preloader">LOADING</div>
    			</React.Fragment>
    		);

    	} else{

            let namesHeadersForTableBody = this.state.headersObjects.map((item) =>item.name);
    		return (
	        	
                <table align="center">
                    <caption>Таблица</caption>
                  
                    <TableHeaders 
                    	onSort={this.onSort}
                        onFilter={this.onFilter}
                        visibleRows={visibleRows}
                        columns={this.state.headersObjects}
                    />               
          
                    <TableBody
                        data={this.state.tableData}
                        columns={namesHeadersForTableBody}
                    />                    
                </table>                   	
	            
        	);
    	}   
    }
}


export default Table;