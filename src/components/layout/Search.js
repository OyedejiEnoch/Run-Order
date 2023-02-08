import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Search() {

    let navigate = useNavigate()
    const [keyword, setKeyWord] = useState("")


    function handleChange(event) {
        setKeyWord(event.target.value)
    }

    function searchHandler(e) {
        e.preventDefault()

        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate("/")
        }
    }



    return (

        <form onSubmit={searchHandler}>
            <div class="input-group">
                <input
                    type="text"
                    id="search_field"
                    class="form-control"
                    placeholder="Enter Product Name ..."
                    onChange={handleChange}
                    value={keyword}
                />
                <div class="input-group-append">
                    <button id="search_btn" class="btn">
                        <i class="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </form>

    )
}

export default Search;