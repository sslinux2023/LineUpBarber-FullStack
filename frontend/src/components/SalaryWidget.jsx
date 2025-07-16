import React from 'react';

const SalaryWidget = () => {
  const bilalSalary = 3500;
  const soufianeSalary = 3500 * 3 * 2;
  const totalMonthly = bilalSalary + soufianeSalary;
  const totalYearly = totalMonthly * 12;

  return (
    <div className="salary-widget">
      <h3>Salary Overview</h3>
      <p>Bilal's Monthly: {bilalSalary} DH</p>
      <p>Soufiane's Monthly: {soufianeSalary} DH</p>
      <p>Total Monthly: {totalMonthly} DH</p>
      <p>Total Yearly: {totalYearly} DH</p>
    </div>
  );
};

export default SalaryWidget;