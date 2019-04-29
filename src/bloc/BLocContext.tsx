import React from 'react';
import { CategoryBLoc } from './CategoriesBLoc';
import { TuringClient } from '../services/client/TuringClient';
import { TuringService } from '../services/TuringService';
import { ProductBLoc } from './ProductBLoc';
import { DepartmentBLoc } from './DepartmentBLoc';

const url = "https://backendapi.turing.com"
const client = new TuringClient(url)
export const turingService = new TuringService(client)
export const CategoryBLocContext = React.createContext(new CategoryBLoc(turingService));
export const ProductBLocContext = React.createContext(new ProductBLoc(turingService));
export const DepartmentBLocContext = React.createContext(new DepartmentBLoc(turingService));
