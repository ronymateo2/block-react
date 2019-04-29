import React, {  } from 'react';
import { Grid, Paper, Typography, Button, WithStyles, createStyles, withStyles } from '@material-ui/core';
import { Product } from '../services/client/TuringClient';

const styles = (theme:any) => createStyles({
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit,
    width: 152
  },
  box: {
    marginBottom: 40,
    height:200
  },
});

export interface ProductProps  extends WithStyles<typeof styles> {
  product:Product,
  onSelectedProduct: Function
}

const imageUrl = 'https://backendapi.turing.com/images/products/'

const ProductItem  = withStyles(styles)((props: ProductProps) => {

  const onSelectProduct = () =>{
    props.onSelectedProduct(props.product)
  }
  return (
    <React.Fragment>
      <Grid item xs={12} md={4}>
        <Paper className={props.classes.paper} onClick={onSelectProduct}>
          <div className={props.classes.box}>
            <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
              {props.product.name}
            </Typography>
            <img src={ imageUrl + props.product.thumbnail } alt=''></img>
            <Typography variant="body2" gutterBottom>
              {props.product.description}
            </Typography>
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Typography style={{textDecoration: 'line-through'}}>
              {props.product.discounted_price}
            </Typography>
            <Button color='primary' variant="contained" className={props.classes.actionButtom}>
              {props.product.price}
            </Button>
          </div>
        </Paper>
      </Grid>
    </React.Fragment>
  );
})

export default ProductItem;
