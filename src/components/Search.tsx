import React, { useState } from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const styles = () => createStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 200,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
});

export interface SearchProps extends WithStyles<typeof styles> {
  onSearch:Function
}

function Search(props:SearchProps) {
  const { classes, onSearch } = props;
  const [term,setTerm] = useState('')

  const handleChange = (event :React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  return (
    <Paper className={classes.root} elevation={1}>
      <InputBase onChange={handleChange}  value={term} className={classes.input} placeholder="Search" />
      <IconButton className={classes.iconButton} aria-label="Search">
        <SearchIcon onClick={() => onSearch(term)} />
      </IconButton>
    </Paper>
  );
}

export default withStyles(styles)(Search);
