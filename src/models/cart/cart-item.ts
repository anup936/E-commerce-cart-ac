export class CartItem {
    private _productName: string;
    private _unitPrice: number;
    private _quantity: number;

    public get productName(): string {
        return this._productName;
    }
    public get unitPrice(): number {
        return this._unitPrice;
    }

    public get quantity(): number {
        return this._quantity;
    }

    public get itemTotal(): number {
        return this.unitPrice * this.quantity;
    }

    constructor(productName: string, unitPrice: number, quantity: number) {
        this._productName = productName;
        this._unitPrice = unitPrice;
        this._quantity = quantity;
    }

    setQuantity(newQuantity: number) {
        if (newQuantity < 1) {
            throw new Error('New quantity must be greater than or equal to 1');
        }
        if (this._quantity != newQuantity) {
            this._quantity = newQuantity;
        }
    }
    transform() {
        return {
            name: this.productName,
            unitPrice: this.unitPrice,
            quantity: this.quantity,
        };
    }
}
