import React, { PropsWithChildren, useEffect, useState } from "react";
import '../styles/InputSearch.css';

interface InputSearchProps<T> {
    input_id: string,
    placeholderText: string
    data: Array<T>,
    propertyName: string,
    displayProperty: string,
    selectedData: T | null | undefined,
    handleSelectedData : (data: any, propertyName: string) => void;
}

const InputSearch = <T extends object>(
    { input_id, placeholderText, data, propertyName,
      displayProperty, selectedData, handleSelectedData } 
    : PropsWithChildren<InputSearchProps<T>>) => 
{
    const divId = `InputSearchBar_${input_id}`;

    const [searchInput, setSearchInput] = useState<string>('');
    const [filteredData, setFilteredData] = useState<T[]>(data);
    const [hoveredDataIndex, setHoveredDataIndex] = useState<number>(0);

    useEffect(() => {
        if (selectedData) setSearchInput(selectedData[displayProperty]);
    }, [selectedData])

    const filterData = (input: string) => {
        setSearchInput(input);
        if (input) {
            setFilteredData(data.filter(d => (d[displayProperty] as string).toLowerCase().includes(input.toLowerCase())));
        } else {
            setFilteredData([]);
            selectData(null)
        }
    }

    const selectData = (data : T | null) => {
        handleSelectedData(data, propertyName);
        if (data) setSearchInput(data[displayProperty])
        document.getElementById(divId)?.classList.remove('active');
        setHoveredDataIndex(0);
    }

    const onKeyPress = (key: string) => {

        document.querySelectorAll('.InputSearchBar').forEach(prop => prop.classList.remove('active'));
        document.getElementById(divId)?.classList.add('active');

        // Make actions on certain inputs to navigate in list
        if (key === "ArrowDown") {
            if (hoveredDataIndex == filteredData.length - 1) return;
            setHoveredDataIndex(hoveredDataIndex + 1);
        }
        else if (key === "ArrowUp") {
            if (hoveredDataIndex == 0) return;
            setHoveredDataIndex(hoveredDataIndex - 1);
        }
        else if (key === "Enter") {
            selectData(filteredData[hoveredDataIndex]);
        }
    }

    return <div className="InputSearchBar" id={divId}>
        {/** Input field */}
        <input 
            type="text"
            placeholder={placeholderText}
            value={searchInput}
            onChange={(e) => {
                e.preventDefault();
                filterData(e.target.value);
            }}
            onKeyUp={(e) => {
                e.preventDefault();
                onKeyPress(e.key);
            }}
        />

        {/** Search List */}
        <div 
            className="search-list"
            style={{boxShadow: filteredData ? "0px 3px 3px rgba(0,0,0,.5)" : undefined}}
        >
            <ul>
                {filteredData && 
                    filteredData.map((data, index) => {
                        return <li
                            className={filteredData.indexOf(data) == hoveredDataIndex ? 
                                "search-list-data selected" : "search-list-data"}
                            key={index} 
                            onClick={() => selectData(data)}
                            onMouseOver={() => setHoveredDataIndex(filteredData.indexOf(data))}
                        >
                            {data[displayProperty]}
                        </li>
                    })
                }
            </ul>
        </div>
    </div>
}

export default InputSearch;