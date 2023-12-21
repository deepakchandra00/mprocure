import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutoSearch(props) {
  return (
    <Autocomplete
      id="controllable-states-demo"
      disableClearable
      defaultValue={props?.defaultValue}
      onChange={props?.handleChange}
      disabled={props?.disabled}
      options={props.options}
      autoHighlight
      getOptionLabel={(option: Object | string) =>
        option[props.name] || option
      }
      renderInput={(params) => <TextField {...params} placeholder={props.label} />}
    />
  );
}