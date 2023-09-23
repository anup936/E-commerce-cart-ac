
# Cybrilla - Assignment

## Objective

Create a checkout system/cart that confirms to following discount/promotion rule interface. 

**Pseudo Code:** 
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

 - If 3 of Item A is purchased, the price of all three is Rs 75(i.e multiples of 3 discount)  
 - If 2 of Item B is purchased, the price of both is Rs 35(i.e multiples of 2 discount)
 - If the total basket price(after previous discounts) is over Rs 150, the basket receives an additional discount of Rs 20.

**Basic Requirements** 
 - [x] Implement the above interface in any backend language of your choice.
 - [x] Create a basic restful json api(MVC) to list the products A,B,C,D 
 - [x] Create an api to add items to the basket/cart. 
 - [x] Create an api which returns list items from the basket/cart(with individual price and discount data),the total price and total discounts applied. 
 - [x] Write test case for the discount calculations logic.

**Extra Brownie Points**

 - [x] Current promotion rules for multi buy and basket total discounts should be configurable. i.e discount percentage and bulk discount item counts(multiples) should be made configurable from database.  
 **Note:** As for simplicity I've not used any database, to configure the promotion parameters, you can do the necessary changes in `src/data/promotion-repository.ts` > `promotionRawData`

 - [x] Write React/Angular/Vue.js/Jquery based frontend to list products, add to basket/cart and view basket/cart with price and discount details.  
 **Note:** I've created a minimalistic UI in vanilla HTML / CSS / Javascript that can be accessed via `URL` mentioned in `Stack` section below
 

 - [ ] Write complete test cases for Model & Controllers.  
 **Note:** As I'm running really tight on time, I've not wrote any tests for the API Models and controllers.

## Stack

**Server:** Node.JS 
 **Language:** Typescript  
 **Package Manager:** npm  
 **Database:** In Memory JSON  
 **Frameworks & Libraries:**

-   **express** - For API Engine
-   **body-parser** - For request body parsing
-   **cors** - For Cross-Origin-Resource-Sharing support

**Supported OS:** Linux, Windows, Mac  
**Server Port:** 3000

**Client:** Vanilla HTML / CSS / Javascript
**URL:** `<server-ip>:3000`


## Setup

Setup of this project is simple.

 1.  Clone the repository
 2.  To install the all dependencies, run `npm install`
 3.  To start the server, run `npm start`  
    **Note:** The above command takes care of building the project also. If you want to just build the application, run `npm run build`
 4. To perform tests, run `npm run test`


## Assumptions

 - There are 2 context of promotions. 
   - A product
   - Overall cart value
 - At any given time only one promotion can be applied to any specific context. In case of multiple promotions found, the promotion with max discount will be selected.
 - Multi-buy promotion is treated as a batch promotion. For example, 
   - ProductA x 1 => Rs. 0.00 Discount
   - ProductA x 2 => Rs. 0.00 Discount
   - ProductA x 3 => Rs. 15.00 Discount
   - ProductA x 4 => Rs. 15.00 Discount
   - ProductA x 5 => Rs. 15.00 Discount
   - ProductA x 6 => Rs. 30.00 Discount
   - ... 
 - All APIs are designed as a GET api for the sake of the simplicity

## UI Client
To access the UI client, simply start the server, and head to the `URL` mentioned in `Stack` section above

## API Specs

### Get Product List

**Endpoint:** `GET /api/products`  
**Sample Response:**

```
[
   {
      "name":"A",
      "unitPrice":30
   },
   {
      "name":"B",
      "unitPrice":20
   },
   {
      "name":"C",
      "unitPrice":50
   },
   {
      "name":"D",
      "unitPrice":15
   }
]
```

---

### Get Current Cart

**Endpoint:** `GET /api/cart`  
**Sample Response:**

```
{
   "items":[
      {
         "name":"A",
         "unitPrice":30,
         "quantity":1,
         "totalDiscount":0
      },
      {
         "name":"B",
         "unitPrice":20,
         "quantity":1,
         "totalDiscount":0
      }
   ],
   "cartDiscount":0,
   "totalDiscount":0,
   "preDiscountTotal":50,
   "postDiscountTotal":50
}
```

---

### Add Product To Cart

**Endpoint:** `GET /api/cart/add/:productName`  
**Sample Response:**

```
<Same as get cart>
```

---

### Empty Cart

**Endpoint:** `GET /api/cart/empty`  
**Sample Response:**

```
<Same as get cart>
```

---
