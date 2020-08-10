SELECT * from products;

SELECT  productId, productName from products;

--list of all costumers from the UK
select *
from customers
where country = 'UK'


--list of all costumers from the UK and Berlim
select *
from customers
where country = 'UK' or city ='Berlin';

--list of all costumers from the UK and USA
select *
from customers
where country = 'UK' or country ='USA';

--list of all costumers from the UK and USA -< using IN 
select *
from customers
where country IN ('UK', 'USA') ;

--list of all excludings costumers from the UK and USA
select *
from customers
where country NOT IN ('UK' ,'USA');

--
select *
from products
where price <= 4;


