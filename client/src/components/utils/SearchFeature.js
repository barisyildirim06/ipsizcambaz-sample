import React, { useState } from 'react'
import { connect } from 'react-redux'
import $ from "jquery";
import {
    INPUT_VALUE
} from '../../_actions/types';



function SearchFeature(props) {
    const [searchTerms, setSearchTerms] = useState("")
    const [SearchClicked, setSearchClicked] = useState(false)
    const updateSearchTerms = (event) => {
        setSearchTerms(event.currentTarget.value)

        props.refreshFunction(event.currentTarget.value)

    }

    $("#myInput").keypress(function (event) {
        if (event.keyCode === 13) {
            event.preventDefault()
            window.location.href = "/search/" + props.searchTerms;
        }
    });

    const onSearchClick = (e) => {
        e.preventDefault()
        window.location.href = "/search/" + props.searchTerms;
    }


    return (
            <form className="form-inline">
                <input
                    id="myInput"
                    value={props.searchTerms}
                    onChange={props.onChangeSearch}
                    className="form-control mr-sm-2" 
                    type="search" 
                    placeholder="Search for Product" 
                    aria-label="Search"
                />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={onSearchClick}>Search</button>
            </form>
    )
}

const mapStateToProps = (state) => {
    return {
        searchTerms: state.searchTerms
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeSearch: (event) => {
             console.log("changed", event.target.value)
            const action = { type: INPUT_VALUE, payload: event.target.value }
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFeature)
