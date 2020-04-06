'use strict';

function printReceipt(inputs) {

}

function getItemCount(itemList) {
  let itemObject = {}
  itemList.forEach(element => {
    if (!itemObject[element]) 
      itemObject[element] = 1;
    else 
      itemObject[element] += 1;
  });

  let itemCountList = []
  for (let [key, value] of Object.entries(itemObject)) {
    itemCountList.push({
      itemId: key,
      count: value
    });
  };
  return itemCountList;
}

function addItemDetailsToItemCountList(itemCountList, allItems) {
  return itemCountList.map(itemOfItemCountList => {
    const matchedItem = allItems.find(item => item.barcode === itemOfItemCountList.itemId);
    return {
      ...itemOfItemCountList,
      name: matchedItem.name,
      unit: matchedItem.unit,
      price: matchedItem.price
    }
  });
}

function calculateSubTotal(itemDetailList) {
  return itemDetailList.map(item => {
    return {
      ...item,
      subTotal: parseInt(item.count * item.price)
    }
  })
}

function calculateTotal(itemCountWithSubTotal) {
  const total = itemCountWithSubTotal.reduce((accu, curr) => {
    return accu + curr.subTotal
  }, 0);
  return {
    total: parseInt(total),
    itemCountWithSubTotal
  };
}

