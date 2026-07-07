"use client";

import { useState } from "react";

const rules = {
  none: {
    label: "Bez potisku",
    percent: 0,
    minimum: 0,
  },
  one: {
    label: "Jednostranný potisk",
    percent: 85,
    minimum: 65,
  },
  two: {
    label: "Oboustranný potisk",
    percent: 100,
    minimum: 80,
  },
  three: {
    label: "Trojstranný potisk",
    percent: 115,
    minimum: 95,
  },
};

const quantityDiscounts = [
  { min: 1, max: 10, discount: 0 },
  { min: 11, max: 30, discount: 10 },
  { min: 31, max: 50, discount: 12 },
  { min: 51, max: 100, discount: 15 },
  { min: 101, max: Infinity, discount: 20 },
];

function getQuantityDiscount(quantity: number) {
  const rule = quantityDiscounts.find(
    (d) => quantity >= d.min && quantity <= d.max
  );
  return rule ? rule.discount : 0;
}

export default function Home() {
  const [productPrice, setProductPrice] = useState(165);
  const [quantity, setQuantity] = useState(1);
  const [printType, setPrintType] =
    useState<keyof typeof rules>("one");

  const rule = rules[printType];

  const calculatedPrintFee = productPrice * (rule.percent / 100);
  const printFee = Math.max(calculatedPrintFee, rule.minimum);

  const priceWithoutVat = productPrice + printFee;

  const discount = getQuantityDiscount(quantity);
  const discountedPrice =
    priceWithoutVat * (1 - discount / 100);

  const priceWithVat = discountedPrice * 1.21;

  const totalWithoutVat = discountedPrice * quantity;
  const totalWithVat = priceWithVat * quantity;

  return (
    <main
      style={{
        fontFamily: "Arial",
        maxWidth: 700,
        margin: "40px auto",
        padding: 20,
      }}
    >
      <h1>Kalkulátor ceny potisku triček</h1>

      <label>Cena trička bez DPH</label>
      <input
        type="number"
        value={productPrice}
        onChange={(e) =>
          setProductPrice(Number(e.target.value))
        }
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 20,
        }}
      />

      <label>Počet kusů</label>
      <input
        type="number"
        value={quantity}
        onChange={(e) =>
          setQuantity(Number(e.target.value))
        }
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 20,
        }}
      />

      <label>Typ potisku</label>

      <select
        value={printType}
        onChange={(e) =>
          setPrintType(
            e.target.value as keyof typeof rules
          )
        }
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 30,
        }}
      >
        {Object.entries(rules).map(([key, value]) => (
          <option key={key} value={key}>
            {value.label}
          </option>
        ))}
      </select>

      <div
        style={{
          background: "#f5f5f5",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <p>
          Poplatek za potisk:{" "}
          <strong>{printFee.toFixed(2)} Kč</strong>
        </p>

        <p>
          Cena před slevou:{" "}
          <strong>{priceWithoutVat.toFixed(2)} Kč</strong>
        </p>

        <p>
          Množstevní sleva: <strong>{discount}%</strong>
        </p>

        <hr />

        <h3>
          Cena za kus bez DPH:{" "}
          {discountedPrice.toFixed(2)} Kč
        </h3>

        <h3>
          Cena za kus s DPH:{" "}
          {priceWithVat.toFixed(2)} Kč
        </h3>

        <hr />

        <h2>
          Celkem bez DPH:{" "}
          {totalWithoutVat.toFixed(2)} Kč
        </h2>

        <h2>
          Celkem s DPH:{" "}
          {totalWithVat.toFixed(2)} Kč
        </h2>
      </div>
    </main>
  );
}