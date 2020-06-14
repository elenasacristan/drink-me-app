import React, { useState, useEffect } from "react";
import "./Results.css";
import Drink from "../Drink/Drink.js";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner.js";

export default function Results(props) {
  const [drinks, serDrinks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${props.ingredient}`
    )
      .then((response) => response.json())
      .then((json) => {
        serDrinks(json.drinks);
        setIsLoaded(true);
        console.log(props.ingredient);
      });
  }, [props.ingredient]);

  if (!isLoaded) {
    return (
        <Spinner />
    );
  } else {
    return (
      <div className="Results">
        <div className="results-header">
          {drinks.length > 1 ? "Fancy any of these?" : "Fancy this one?"}
        </div>
        <div className="results-container">
          {drinks.map(
            (drink) =>
              Number(drink.idDrink) !== 17246 && (
                <div key={drink.idDrink}>
                  {
                    <Link to={`/drink/${drink.idDrink}`}>
                      <Drink
                        id={drink.idDrink}
                        name={drink.strDrink}
                        image={drink.strDrinkThumb}
                      />
                    </Link>
                  }
                </div>
              )
          )}
        </div>
      </div>
    );
  }
}
