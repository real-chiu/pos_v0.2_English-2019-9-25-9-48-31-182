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

