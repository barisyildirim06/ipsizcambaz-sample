import React, { useState } from 'react'
import { connect } from 'react-redux'
import { FaAlignJustify } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md"
import $ from "jquery";
import { useMediaQuery } from 'react-responsive'
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
    const SearchCheck = () => {
        setSearchClicked(!SearchClicked)
    }


    $("#myInput").keypress(function (event) {
        if (event.keyCode === 13) {
            event.preventDefault()
            window.location.href = "/search/" + props.searchTerms;
        }
    });
    
    const is400px = useMediaQuery({
        query: '(min-width: 400px)'
    })

    const openNav = () => {
        if(is400px){
            document.getElementById("mySidenav").style.width = "400px"
            document.getElementById("navbar").style.paddingLeft = "400px"
            document.getElementById("marginLeft").style.paddingLeft = "400px"
        }else {
            document.getElementById("mySidenav").style.width = "100%"
        }
    }


    return (
        <div className="nav-links nav-left">
            
            <button
                style={{ marginLeft: "25px" }}
                type="button"
                className="nav-button"
                onClick={openNav}
            >
                <FaAlignJustify className="nav-icon" />
            </button>
            {
                !SearchClicked ? <button
                    style={{ marginLeft: "20px" }}
                    type="button"
                    className="nav-button"
                    onClick={SearchCheck}
                >
                    <FiSearch className="nav-icon" />
                </button> : <div className="searchbox">
                        <form >
                            <i className="nav-button input-icon-search"><FiSearch /></i>
                            <i id="myBtn" onClick={SearchCheck} className="nav-button input-icon-cancel"><MdClose /></i>
                            <input
                                id="myInput"
                                value={props.searchTerms}
                                onChange={props.onChangeSearch}
                                style={{ marginLeft: "20px" }}
                                placeholder="Find Huffpost Articles"
                                className="searchinput"
                                type="text"
                            />
                        </form>
                    </div>
            }
        </div>
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
            // console.log("changed", event.target.value)
            const action = { type: INPUT_VALUE, payload: event.target.value }
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFeature)
