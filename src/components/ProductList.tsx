import React, { useState, useContext, useEffect } from 'react';
import { Grid, createStyles, withStyles, WithStyles } from '@material-ui/core';

import ProductItem from './ProductItem';
import { Product } from '../services/client/TuringClient';
import ProductDialog from './dialog/ProductDialog';
import { ProductBLoc } from '../bloc/ProductBLoc';
import { ProductBLocContext } from '../bloc/BLocContext';
import { ProductViewModel } from '../model/ProductViewModel';

const styles = (theme:any) => createStyles({
  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
});

export interface ProductListProps extends WithStyles<typeof styles> {
  productList:Product[]
}

const ProductList= withStyles(styles)((props: ProductListProps) => {
  const { classes, productList } = props;
  const [viewProduct,setViewProduct] = useState(false);
  const [productVm, setProductVm] = useState({} as ProductViewModel)
  const productBLoc: ProductBLoc = useContext(ProductBLocContext);

  const onSelectedProduct = (product: Product) =>{
    setViewProduct(true);
    productBLoc.selectedProducId$.next(product.product_id)
  }

  const dialogClose = () => {
    setProductVm({} as ProductViewModel)
    setViewProduct(false);
  }

  const addToCard = (product: Product) => {
    console.log(product)
  }

  useEffect(()=>{
    const sub = productBLoc.product$.subscribe(setProductVm);
    return () => {
      sub.unsubscribe()
    }
  },[productBLoc.product$])

  return (
    <div>
      <Grid container justify="center">
        <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
        {
          productList.map((product)=>
           <ProductItem
           key={product.product_id}
           product={product} onSelectedProduct={onSelectedProduct} ></ProductItem>
           )
        }
        </Grid>
      </Grid>
      {productVm.product &&
      <ProductDialog
        open={viewProduct}
        productVm={productVm}
        addToCard={addToCard}
        onClose={dialogClose}/>}
    </div>
  );
})

export default ProductList;
