/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * Документация
 * Документация к запросам
 * OpenAPI spec version: 1.0
 */
import type { Pharmacy } from "./pharmacy";
import type { Product } from "./product";

export interface Position {
  /** Unique identifier of the position */
  id: string;
  /** Pharmacy details */
  pharmacy: Pharmacy;
  /** Price of the position */
  price: string;
  /** Product details */
  product: Product;
  /**
   * Quantity of the position
   * @nullable
   */
  quantity?: number | null;
}