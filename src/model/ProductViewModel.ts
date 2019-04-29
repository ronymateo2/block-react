import { ProductComplete, Review } from "../services/client/TuringClient";

export type ProductViewModel = {
  product: ProductComplete,
  reviews: Review[],
}

export function getRating(reviews: Review[]): number {
  return reviews.reduce((sum, { rating })=> sum + (rating || 0) ,0)
}
