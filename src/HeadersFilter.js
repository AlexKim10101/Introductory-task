import React from 'react';

class HeadersFilter extends React.Component {

	constructor(props) {
        super(props);
        this.filter = this.filter.bind(this);
        this.close = this.close.bind(this);
        this.choseFilterValue = this.choseFilterValue.bind(this);
        this.loseFocus = this.loseFocus.bind(this);

        this.state={
            filterActive: false,
            filterFocus: false,
            filterValue:'',
        }
    }

    

    loseFocus = () =>{
        this.props.hideFilterMenu();

    }

    choseFilterValue = (e) =>{
        console.log(e.target.value);
        this.props.onFilter(this.props.name, e.target.value);

    }

    close = (e) =>{
        e.stopPropagation();
        console.log('close');
        console.log(this.props.name);

    }

    renderInputs = () =>{
        let list = null;
        let copyFilterData = JSON.parse(JSON.stringify(this.props.filterData));
        let result = {};
        if(Object.keys(copyFilterData).length !==0 ){
        	result = filterDataMaker(copyFilterData, this.props.columnName)
        } else{

        	result=
        }
        const listOptionsValue = this.props.listOptionsValue;
        list = listOptionsValue.map(function(item, index){
            return <option
                key={index}
                value={item}
                >{item}</option>
        })
        return list;
    }

    render(){
    	return(
    		<form  
            	onBlur={this.loseFocus}
            	onChange={this.choseFilterValue}
        		>
            		{this.renderInputs()}   
        	</form>
    	)
    }
}

export default HeadersFilter;