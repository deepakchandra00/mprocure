import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function AutoCheckSearch(props) {
  console.log(props.defaultValue, props.options)
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={props.options}
      disableCloseOnSelect
      value={props?.defaultValue}
      getOptionLabel={(option: Object | string) =>
        option[props.name] || option
      }
      // getOptionSelected={(option, value) => value.id === option.id}
      onChange={props.handleChange}
      limitTags={1}
      isOptionEqualToValue={(option: any, value:any) => option.originatorId === value.originatorId}
      renderOption={(params, option: Object | string, { selected }) => (
        <li {...params}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option[props?.name] || option}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} placeholder={props?.label} />
      )}
    />
  );
}
