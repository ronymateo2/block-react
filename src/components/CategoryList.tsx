import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Category } from '../services/client/TuringClient';

const styles = (theme:any) => createStyles({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }
});

interface CategoriesProp extends WithStyles<typeof styles> {
  categoryList?: Array<Category>,
  onCategorySelected: Function
}

const Categories = (props: CategoriesProp) => {
  const { classes, categoryList, onCategorySelected } = props
  return (
    <List
      component="nav"
      subheader={<ListSubheader component="div">Categories</ListSubheader>}
      className={classes.root}
    >
      {
        categoryList!.map((item)=>
        <ListItem key={item.category_id} button onClick={()=> onCategorySelected(item)}>
          <ListItemText inset primary={item.name} />
        </ListItem>
        )
      }
    </List>
  );
}

export default withStyles(styles)(Categories);
