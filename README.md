# E-commerce-cart-ac
Createa a checkout system/cart that confirms the  discount/promotion rule interface.
Assignment 
## Objective Create a checkout system/cart that confirms to following discount/promotion rule interface. 
**Pseudo Code:
** 
``` 
co = Checkout.new(rules)
co.scan(item)
co.scan(item)
price = co.total
discount = co.total_discounts
```
**Product Items** 
| Item | Price | 
|--|--| 
| A | Rs 30 | 
| B | Rs 20 | 
| C | Rs 50 | 
| D | Rs 15 | 

**Promotions** 
-  If 3 of Item A is purchased, the price of all three is Rs 75(i.e multiples of 3 discount)
-  If 2 of Item B is purchased, the price of both is Rs 35(i.e multiples of 2 discount)
-  If the total basket price(after previous discounts) is over Rs 150, the basket receives an additional discount of Rs 20.
  
**Basic Requirements**
- [x] Implement the above interface in any backend language of your choice.
- [x] Create a basic restful json api(MVC) to list the products A,B,C,D
- [x] Create an api to add items to the basket/cart.
- [x] Create an api which returns list items from the basket/cart(with individual price and discount data),the total price and total discounts applied. 
- [x] Write test case for the discount calculations logic.

 
