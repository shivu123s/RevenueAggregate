import React, { useState, useEffect } from 'react';
import ProductTable from './components/ProductTable';
import SearchBar from './components/SearchBar';
import TotalRevenue from './components/TotalRevenue';
import formatNumber from './utils/formatNumber';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const branchUrls = ['/info/branch1.json', '/info/branch2.json', '/info/branch3.json'];
        const responses = await Promise.all(branchUrls.map(url => fetch(url)));
        const branches = await Promise.all(responses.map(response => response.json()));

        let allProducts = [];

        branches.forEach(branch => {
          branch.products.forEach(product => {
            const existingProduct = allProducts.find(p => p.name === product.name);
            const totalRevenue = product.unitPrice * product.sold;

            if (existingProduct) {
              existingProduct.totalRevenue += totalRevenue;
            } else {
              allProducts.push({
                name: product.name,
                totalRevenue
              });
            }
          });
        });

        allProducts.sort((a, b) => a.name.localeCompare(b.name));
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  useEffect(() => {
    const date = new Date().toLocaleDateString();
    setCurrentDate(date);
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <h1>Revenue Aggregator</h1>
      </header>
      <div className="date-display">{currentDate}</div> {/* Date display */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ProductTable products={filteredProducts} formatNumber={formatNumber} />
      <TotalRevenue products={filteredProducts} formatNumber={formatNumber} />
      <footer className="app-footer" Align="right">
        <p></p>
      </footer>
    </div>
  );
};

export default App;
