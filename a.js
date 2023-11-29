const { ThermalPrinter, PrinterTypes, CharacterSet, BreakLine } = require('node-thermal-printer');
const { TambolaTicket } = require('tambola-generator');
var Tambola = require('tambola-generator').default;

var allTickets =Tambola.generateTickets(2) //This generates 100 tambola tickets

// console.log(a)
//  a.forEach(ticket=>{
//   console.log(ticket._entries)
//
//  })

async function example() {
  const printer = new ThermalPrinter({
    type: PrinterTypes.EPSON, // 'star' or 'epson'
    interface: 'tcp://10.0.0.191',
    options: {
      timeout: 1000,
    },
    width: 42, // Number of characters in one line - default: 48
    characterSet: CharacterSet.PC852_LATIN2, // Character set - default: SLOVENIA
    breakLine: BreakLine.WORD, // Break line after WORD or CHARACTERS. Disabled with NONE - default: WORD
    removeSpecialCharacters: false, // Removes special characters - default: false
    lineCharacter: '-', // Use custom character for drawing lines - default: -
  });

  const isConnected = await printer.isPrinterConnected();
  console.log('Printer connected:', isConnected);

//   printer.alignCenter();
//   await printer.printImage('./assets/olaii-logo-black-small.png');

let ticket =
 [
  [0,18,23,40,48,0,0,73,0],
  [5,0,0,0,42,52,0,80,83],
  [0,20,0,0,49,58,65,0,85]
];

  
allTickets.forEach(ticket=>{
  printer.newLine();
  ticket._entries.forEach(row=>{
    arr = []
   row.forEach(num=>{
        console.log(num)
        arr.push({ text: (num?num:"__")  , align: 'LEFT', width: .09 , bold:num?true:false})
    })
      printer.alignCenter();
      printer.tableCustom(arr);
      printer.drawLine();
   })
    printer.cut();
 })



  try {
    await printer.execute();
    console.log('Print success.');
  } catch (error) {
    console.error('Print error:', error);
  }
}

example();