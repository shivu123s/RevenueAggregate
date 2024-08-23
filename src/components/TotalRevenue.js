import React from 'react';

const TotalRevenue = ({ products, formatNumber }) => {
  const totalRevenue = products.reduce((acc, product) => acc + product.totalRevenue, 0);

  return (
    <div className="total-revenue">
      <strong>Total Revenue Amt: {formatNumber(totalRevenue)}</strong>
    </div>
  );
};

export default TotalRevenue;
