import React, { useState, useEffect, useContext } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, Grid } from '@material-ui/core';

import TopBar from './TopBar';
import Categories from './CategoryList';
import { Category, Product, Department } from '../services/client/TuringClient';
import { CategoryBLocContext, DepartmentBLocContext } from '../bloc/BLocContext';
import ProductList from './ProductList';
import { tap } from 'rxjs/operators';

const backgroundShape = require('../images/shape.svg');

const styles = (theme:any) => createStyles({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['100'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    paddingBottom: 200
  },
});

const Main = withStyles(styles)(() => {
  const categoryBLoc = useContext(CategoryBLocContext);
  const departmentBLoc = useContext(DepartmentBLocContext);
  const [categoryList, setCategoryList] = useState([] as Category[])
  const [productList, setProducList] = useState([] as Product[])
  const [departments, setDepartments] = useState([] as Department[])

  useEffect(()=>{
    let sub = categoryBLoc.categories$.subscribe(setCategoryList);
    return () =>{
      sub.unsubscribe()
    }
  },[categoryBLoc.categories$])

  useEffect(()=>{
    let sub = departmentBLoc.departments$
    .pipe(tap((departments)=>{
      categoryBLoc.selectedDepartment$.next(departments[0].department_id!)
    }))
    .subscribe(setDepartments);
    return () =>{
      sub.unsubscribe()
    }
  },[departmentBLoc.departments$,categoryBLoc.selectedDepartment$])

  useEffect(()=>{
    let sub = categoryBLoc.products$.subscribe(setProducList);
    return () =>{
      sub.unsubscribe()
    }
  },[categoryBLoc.products$])

  const onDepartmentSelected = (department: Department) => {
    categoryBLoc.selectedDepartment$.next(department.department_id!)
  }

  const onCategorySelected = (item: Category) => {
    categoryBLoc.selectedCategory$.next(item)
  }

  const onSearch = (term:string) => {
    categoryBLoc.search$.next(term);
  }

  return(
  <React.Fragment>
    <CssBaseline />
    <TopBar departments={departments} onDepartmentSelected={onDepartmentSelected} onSearch={onSearch} />
    <Grid container>
      <Grid item xs={2}>
        <Categories categoryList={categoryList} onCategorySelected={onCategorySelected}></Categories>
      </Grid>
      <Grid item xs={8} style={{ marginLeft:'10px'}}>
        <ProductList productList={productList}></ProductList>
      </Grid>
    </Grid>
  </React.Fragment>
  )
});

export default Main;
