CREATE OR REPLACE VIEW "quantity_sell" AS
 SELECT event."CurrencyAsset_Id",
    sum(event."quantity") AS quantity,
    round(sum(event.usd_amount)::numeric, 2) AS usd_amount,
    event."Wallet_Id"
   FROM "Events" event
  WHERE event.type::text = 'sell'::text
  GROUP BY event."CurrencyAsset_Id", event."Wallet_Id";


  
CREATE OR REPLACE VIEW "quantity_buy" AS
SELECT event."CurrencyAsset_Id",
    sum(event."quantity") AS quantity,
	round(sum(event.usd_amount)::numeric, 2) AS usd_amount,
    event."Wallet_Id"
FROM "Events" as event
WHERE event.type = 'buy'::text
GROUP BY event."CurrencyAsset_Id", event."Wallet_Id";


CREATE OR REPLACE VIEW "quantity_total" AS
SELECT quantity_buy."CurrencyAsset_Id",
    CASE
        WHEN quantity_sell."CurrencyAsset_Id" = quantity_buy."CurrencyAsset_Id" THEN quantity_buy.quantity - quantity_sell.quantity
	ELSE quantity_buy.quantity
    END AS quantity,
	 CASE
        WHEN quantity_sell."CurrencyAsset_Id" = quantity_buy."CurrencyAsset_Id" THEN quantity_buy."usd_amount" - quantity_sell.usd_amount
        ELSE quantity_buy.usd_amount
    END AS usd_amount,
quantity_buy."Wallet_Id"
FROM quantity_buy
LEFT JOIN quantity_sell ON quantity_sell."Wallet_Id" = quantity_buy."Wallet_Id"
AND quantity_sell."CurrencyAsset_Id" = quantity_buy."CurrencyAsset_Id";





  
  CREATE OR REPLACE VIEW "quantity_total_asset" AS
SELECT * FROM quantity_total LEFT JOIN "Currencies" ON "Currencies"."apiId"=quantity_total."CurrencyAsset_Id"
