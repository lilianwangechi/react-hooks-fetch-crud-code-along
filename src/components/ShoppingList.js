import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  //add useffect hook
  useEffect(()=>{
    fetch("http://localhost:4000/items")
    .then((r)=> r.json())
    .then((items)=> setItems(items));
  },[]);

  function handleAddItem(newItem){
    setItems([...items,newItem]);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  //add this callback function
  function handleUpdateItem(updatedItem){
    const upDatedItems = items.map((item)=> {
    if(item.id === updatedItem.id){
      return updatedItem;
    }else {
      return item;
    }
  });
  setItems(upDatedItems);
    //console.log("in shoppingCart:",updatedItem);
  }
  //add callback function
  function handleDeleteItem(deletedItem){
    const updatedItems = items.filter((item)=>item.id !== deletedItem.id);
    setItems(updatedItems)
    console.log("In shoppingCart:",deletedItem)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      {/* onAddItem prop */}
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} 
          item={item}
          onUpdateItem={handleUpdateItem}
          onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
