'use strict';

describe('pos', () => {

  it('should print text', () => {

    const inputs = [
      'ITEM000000',
      'ITEM000000',
      'ITEM000000',
      'ITEM000000',
      'ITEM000000',
      'ITEM000001',
      'ITEM000001',
      'ITEM000004'
    ];

    spyOn(console, 'log');

    printReceipt(inputs);

    const expectText = `***<store earning no money>Receipt ***
Name: Coca-Cola, Quantity: 5 bottles, Unit: 3 (yuan), Subtotal: 15 (yuan)
Name: Sprite, Quantity: 2 bottles, Unit: 3 (yuan), Subtotal: 6 (yuan)
Name: Battery, Quantity: 1 a, Unit: 2 (yuan), Subtotal: 2 (yuan)
----------------------
Total：23 (yuan)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});

describe('Decode Item', () => {
  it('Get Item Count', () => {
    const inputs = [
      'ITEM000000',
      'ITEM000000',
      'ITEM000000',
      'ITEM000000',
      'ITEM000000',
      'ITEM000001',
      'ITEM000001',
      'ITEM000004'
    ];

    const mockData = [{
      itemId: 'ITEM000000',
      count: 5
    }, {
      itemId: 'ITEM000001',
      count: 2
    }, {
      itemId: 'ITEM000004',
      count: 1
    }];
    const itemCountList = getItemCount(inputs);
    itemCountList.sort();
    expect(itemCountList[0]).toEqual(mockData[0]);
    expect(itemCountList[1]).toEqual(mockData[1]);
    expect(itemCountList[2]).toEqual(mockData[2]);
  });


  it('Add Item Details to Item Count List', () => {
    const allItems = [
      {
        barcode: 'ITEM000000',
        name: 'Coca-Cola',
        unit: 'bottle',
        price: 3.00
      },
      {
        barcode: 'ITEM000001',
        name: 'Sprite',
        unit: 'bottle',
        price: 3.00
      },
      {
        barcode: 'ITEM000002',
        name: 'Apple',
        unit: 'pound',
        price: 5.50
      },
      {
        barcode: 'ITEM000003',
        name: 'Litchi',
        unit: 'pound',
        price: 15.00
      },
      {
        barcode: 'ITEM000004',
        name: 'Battery',
        unit: 'a',
        price: 2.00
      },
      {
        barcode: 'ITEM000005',
        name: 'Instant Noodles',
        unit: 'bag',
        price: 4.50
      }
    ];
    const inputs = [{
      itemId: 'ITEM000000',
      count: 5
    }, {
      itemId: 'ITEM000001',
      count: 2
    }, {
      itemId: 'ITEM000004',
      count: 1
    }];

    const mockData = [{
      itemId: 'ITEM000000',
      count: 5,
      name: 'Coca-Cola',
      unit: 'bottle',
      price: 3.00
    }, {
      itemId: 'ITEM000001',
      count: 2,
      name: 'Sprite',
      unit: 'bottle',
      price: 3.00
    }, {
      itemId: 'ITEM000004',
      count: 1,
      name: 'Battery',
      unit: 'a',
      price: 2.00
    }];
    const itemDetailsList = addItemDetailsToItemCountList(inputs, allItems);
    itemDetailsList.sort();
    expect(itemDetailsList[0]).toEqual(mockData[0]);
    expect(itemDetailsList[1]).toEqual(mockData[1]);
    expect(itemDetailsList[2]).toEqual(mockData[2]);
  });

});

describe('Generate Receipt', () => {
  it('Calculate SubTotal', () => {
    const inputs = [{
      itemId: 'ITEM000000',
      count: 5,
      unit: 'bottle',
      price: 3.00
    }, {
      itemId: 'ITEM000001',
      count: 2,
      unit: 'bottle',
      price: 3.00
    }, {
      itemId: 'ITEM000004',
      count: 1,
      unit: 'a',
      price: 2.00
    }];

    const mockData = [{
      itemId: 'ITEM000000',
      count: 5,
      unit: 'bottle',
      price: 3.00,
      subTotal: 15
    }, {
      itemId: 'ITEM000001',
      count: 2,
      unit: 'bottle',
      price: 3.00,
      subTotal: 6
    }, {
      itemId: 'ITEM000004',
      count: 1,
      unit: 'a',
      price: 2.00,
      subTotal: 2
    }];
    const itemDetailsListWithSubTotal = calculateSubTotal(inputs);
    itemDetailsListWithSubTotal.sort();
    expect(itemDetailsListWithSubTotal[0]).toEqual(mockData[0]);
    expect(itemDetailsListWithSubTotal[1]).toEqual(mockData[1]);
    expect(itemDetailsListWithSubTotal[2]).toEqual(mockData[2]);
  });

  it('Calculate Total', () => {
    const inputs = [{
      itemId: 'ITEM000000',
      count: 5,
      unit: 'bottle',
      price: 3.00,
      subTotal: 15
    }, {
      itemId: 'ITEM000001',
      count: 2,
      unit: 'bottle',
      price: 3.00,
      subTotal: 6
    }, {
      itemId: 'ITEM000004',
      count: 1,
      unit: 'a',
      price: 2.00,
      subTotal: 2
    }];
    const itemDetailsListWithSubTotal = calculateTotal(inputs);
    expect(itemDetailsListWithSubTotal.total).toEqual(23);
  });
});

describe('Present Receipt', () => {
  it('Present Receipt'), () => {
    const inputs = {
      total: 23,
      itemDetailsListWithSubTotal: [{
        itemId: 'ITEM000000',
        count: 5,
        unit: 'bottle',
        price: 3.00,
        subTotal: 15
      }, {
        itemId: 'ITEM000001',
        count: 2,
        unit: 'bottle',
        price: 3.00,
        subTotal: 6
      }, {
        itemId: 'ITEM000004',
        count: 1,
        unit: 'a',
        price: 2.00,
        subTotal: 2
      }]
    };

    const receipt = presentReceipt(inputs);

    const expectText = `***<store earning no money>Receipt ***
    Name：Coca-Cola，Quantity：5 bottles，Unit：3.00 (yuan)，Subtotal：15.00 (yuan)
    Name：Sprite，Quantity：2 bottles，Unit：3.00 (yuan)，Subtotal：6.00 (yuan)
    Name：Battery，Quantity：1 a，Unit：2.00 (yuan)，Subtotal：2.00 (yuan)
    ----------------------
    Total：23.00 (yuan)
    **********************`;

    expect(receipt).toEqual(expectText);
  }

});