import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Card from '../components/Card';

function Home() {
  // State variables
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  // Function to fetch food data from the server
  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:3000/api/foodData", {
        method: "Post",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Check if the response status is okay 
      if (response.ok) {
        // Parse the JSON data from the response
        response = await response.json();
        
        // Update state variables with the fetched data
        setFoodItem(response[0]);
        setFoodCat(response[1]);
      } else {
        // Log an error message if the response status is not okay
        console.error("Failed to fetch data");
      }
    } catch (error) {
      // Log an error message if an exception occurs during the fetch operation
      console.error("Error fetching data:", error);
    }
  };

  // useEffect to load data on component 
  useEffect(() => {
    loadData();
  }, []);

  // JSX structure for rendering the Home component
  return (
    <div>
      {/* Navbar component */}
      <NavBar />
      {/* Carousel for displaying images */}
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        {/* Carousel inner */}
        <div className="carousel-inner" id="carousel">
          {/* Search input in carousel caption */}
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(event) => { setSearch(event.target.value) }}
              />
            </div>
          </div>
          {/* Carousel items with random images */}
          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/300×300/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/300×300/?pizza" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/300×300/?spaghetti" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
        </div>
        {/* Carousel control buttons */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* Container for displaying food categories and items */}
      <div className="container">
        {/* Mapping through food categories */}
        {foodCat.length > 0 ? (
          foodCat.map((data) => (
            <div key={data._id}>
              {/* Displaying category name */}
              <div className='fs-3 m-3 row mb-3'>
                {data.CategoryName}
              </div>
              <hr />
              {/* Filtering and mapping through food items based on category and search */}
              {foodItem.length > 0 ? (
                foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                  .map((filteredItems) => (
                    <div key={filteredItems._id} className="col-12 col-md-6 col-lg-3">
                      {/* Card component for displaying food item */}
                      <Card foodItem={filteredItems} options={filteredItems.options[0]} />
                    </div>
                  ))
              ) : (
                <div>No Such Data Found</div>
              )}
            </div>
          ))
        ) : (
          <div>No Data Available</div>
        )}
      </div>
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default Home;



