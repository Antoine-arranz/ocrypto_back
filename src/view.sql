CREATE OR REPLACE VIEW "quantity_buy" AS
SELECT event."CurrencyBought_Id",
    sum(event."quantityBougth") AS quantity,
    event."Wallet_Id"
FROM "Events" as event
WHERE event.type = 'buy'::text
GROUP BY event."CurrencyBought_Id", event."Wallet_Id";


CREATE OR REPLACE VIEW "quantity_sell" AS
 SELECT event."CurrencySell_Id",
    sum(event."quantitySell") AS quantity,
    event."Wallet_Id"
   FROM "Events" event
  WHERE event.type::text = 'sell'::text
  GROUP BY event."CurrencySell_Id", event."Wallet_Id";



CREATE OR REPLACE VIEW "quantity_total" AS
SELECT quantity_buy."CurrencyBought_Id",
    CASE
        WHEN quantity_sell."CurrencySell_Id" = quantity_buy."CurrencyBought_Id" THEN quantity_buy.quantity - quantity_sell.quantity
	ELSE quantity_buy.quantity
    END AS quantity,
quantity_buy."Wallet_Id"
FROM quantity_buy
LEFT JOIN quantity_sell ON quantity_sell."Wallet_Id" = quantity_buy."Wallet_Id"
AND quantity_sell."CurrencySell_Id" = quantity_buy."CurrencyBought_Id";