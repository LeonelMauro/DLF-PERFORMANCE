// create-sale.dto.ts
export class CreateSaleDto {
    total: number;
    productos: {
      productId: number;
      quantity: number;
    }[];
  }
  