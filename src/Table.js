import React from 'react';
import {ADDRESS} from './GlobalValues';
import {MYARR} from './GlobalValues';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


import {HEADERS} from './GlobalValues';
import {NUMBER_VISIBLE_ROWS} from './GlobalValues';
import TableHeaders from './TableHeaders';
import TableBody from './TableBody';
import _ from 'lodash';



class Table extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            headersNames: HEADERS,
            visibleHeaders: HEADERS,
            selectItem: null,
            sortType: '',
            sortColumn: '',
            isLoading: false,
        }

        this.onScrollList = this.onScrollList.bind(this);
    }

    componentDidMount = () => {
        this.loadContent();
        window.addEventListener('scroll', this.onScrollList);
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.onScrollList);
    };


    loadContent = () =>{
        const xhr = new XMLHttpRequest();
        xhr.open('GET', ADDRESS, true); 
        xhr.send();
        this.setState({ isLoading: true })
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return false;
            }
            if (xhr.status !== 200) {
                console.log(xhr.status + ': ' + xhr.statusText)
            } else {
                let data = JSON.parse(xhr.responseText);
                let dataWithVisibilityField = data.map(function(item){
                    item.visibility=true;
                    return item;
                });
                let visibleHeaders = [].concat(HEADERS);
                let oldData = [].concat(this.state.tableData);
                let newData = oldData.concat(dataWithVisibilityField);
                this.setState({
                    tableData: newData,
                    isLoading: false, 
                })
            }
        }
    }

    onScrollList = (event) => {

        

        const scrollBottom = window.innerWidth + 
        window.pageYOffset - 163 > event.srcElement.body.scrollHeight;
        if (scrollBottom) {
            this.loadContent(); 
        }
        
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

    changeVisibleColumns = column => {
        let copyArr = [].concat(this.state.visibleHeaders);
        if(copyArr.includes(column)){
            copyArr = copyArr.filter(item => item!==column)
        }else{
            copyArr.push(column);
        }
        this.setState({
            visibleHeaders: copyArr,
        })
    }

    renderHeadersItems = () =>{
        let list = null;
        list = HEADERS.map((item, index) => {
            let headerBtnClassName = 'header-btn';
            let iconCheckClassName = 'iconCheck';
            let iconCloseClassName = 'iconClose';

            if(this.state.visibleHeaders.includes(item)){
                headerBtnClassName += ' header-btn--active';
                iconCheckClassName += ' iconCheck--active';

                iconCloseClassName += ' iconClose--notactive';
            }else{
                headerBtnClassName += ' header-btn--notactive';
                iconCheckClassName += ' iconCheck--notactive';

                iconCloseClassName += ' iconClose--active';
            }
            return (
                <div className={headerBtnClassName} onClick={this.changeVisibleColumns.bind(null,item)}>
                    <div className="header-btn__text">{item}</div>
                    <FontAwesomeIcon className={iconCheckClassName} icon={faCheck} />
                    <FontAwesomeIcon className={iconCloseClassName} icon={faTimes} />
                </div>
            )
        })
        return list;
    }

    
    render() {
        let visibleRows = this.state.tableData.map(function(item){
            if(item.visibility){
                return item;
            }
        })


    		return (
	        	<div onScroll={event => this.onScrollList(event)}>
                    <div className="headers-list">
                        {this.renderHeadersItems()}
                    </div>
                    <table className="table" align="center" cellspacing="0px">
                        <caption>Таблица</caption>
                      
                        <TableHeaders 
                        	onSort={this.onSort}
                            columns={this.state.visibleHeaders}
                            sortColumn={this.state.sortColumn}
                            sortType={this.state.sortType}
                            close={this.changeVisibleColumns}
                        />               
              
                        <TableBody
                            data={this.state.tableData}
                            columns={this.state.visibleHeaders}
                        />                    
                    </table> 
                </div>                  	
	            
        	);
    	}   
    
}


export default Table;