import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { createStyles, WithStyles, Grid } from '@material-ui/core';

import BaseDialog from './BaseDialog';
import { ProductViewModel } from '../../model/ProductViewModel';
import { touringConst } from '../../model/const';

const styles = (theme:any) => createStyles({
  container: {
    maxWidth: 600,
    flexGrow: 1,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  stepsContainer: {
    marginLeft: 72,
    textAlign: 'left',
    marginTop: 20,
    height: 65
  },
  bottomMargin: {
    marginBottom: theme.spacing.unit * 2
  },
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

export interface ProductDialogProps extends WithStyles<typeof styles> {
  open:boolean,
  onClose: Function,
  addToCard: Function,
  productVm: ProductViewModel,
}

const ProductDialog = (props: ProductDialogProps) => {
  const {productVm, addToCard} = props;

  return (<BaseDialog open={props.open} onClose={props.onClose}>
              <Grid item xs={12}>
                <div className={props.classes.box}>
                  <Typography component={'span'} style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                    {productVm.product.name}
                  </Typography>
                  <img src={ touringConst.imageUrl + productVm.product.thumbnail } alt=''></img>
                  <Typography component={'span'} variant="body2" gutterBottom>
                    {productVm.product.description}
                  </Typography>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <Typography component={'span'} style={{textDecoration: 'line-through'}}>
                    {productVm.product.discounted_price}
                  </Typography>
                  <Button  onClick={()=> addToCard(productVm.product)} color='primary' variant="contained" className={props.classes.actionButtom}>
                      Add to cart
                  </Button>
                </div>
              </Grid>
        </BaseDialog>
  )
}

export default withStyles(styles)(ProductDialog);
