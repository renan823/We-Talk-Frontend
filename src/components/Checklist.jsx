import SelectMultiple from 'react-native-select-multiple';
import React, { useState } from 'react';



const Checklist = (props) => {
    const [selected, setSelected] = useState(props.origin);
    

    const onSelectionsChange = (selected) => {
        setSelected(selected);
        props.onChange(selected);
    }


    return (
        <SelectMultiple
            items={props.data}
            selectedItems={selected}
            onSelectionsChange={onSelectionsChange}
        />
    )
}

export default Checklist;