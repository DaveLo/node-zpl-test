(function() {
  function init() {
    const p = {
      error: [],
      printer: false,
    }
    BrowserPrint.getDefaultDevice(
      'printer',
      (printer) => {
        if (printer != null && printer.connection != undefined) {
          p.printer = printer;
          let details = document.getElementById('printer_details')
          ,   selected = document.getElementById('selected_printer')

          selected.textContent = 'Using Default Printer: ' + printer.name;
          details.style.display = 'block'
        }
      },
      (err) => console.error(err)
    );
    const handlePrint = ready => {
      if (!ready) {
        console.error(p.error.join(', '));
        return false;
      }

      // const format_start = "^XA^LL200^FO80,50^A0N36,36^FD";
      // const format_end = "^FS^XZ";

      // fetch('/label/test_file.zpl')
      //   .then(data => data.text())
      //   .then(zpl => {
      //     console.log(zpl)
          const printComplete = () => alert('Print Complete');
          const printError = () => alert(p.error.join(', '));
          p.printer.sendUrl('http://d9e8f1ba.ngrok.io/label/test_file.zpl', printComplete, printError);
      //     p.printer.send(zpl, printComplete, printError)
      //   })
      //   .catch(err => console.error(err))
    }
    const checkPrinterStatus = (callback) => {
      if (!p.printer) {
        p.error.push('No Printer Attached')
        return callback(false)
      }

      p.printer.sendThenRead("~HQES", text => {
        const is_error = text.charAt(70);
        const media = text.charAt(88);
        const head = text.charAt(87);
        const pause = text.charAt(84);

        if (is_error == '0') { return callback(true) }

        if (media == '1') { p.error.push("Paper out") }
        if (media == '2') { p.error.push("Ribbon Out") }
        if (media == '4') { p.error.push("Media Door Open") }
        if (media == '8') { p.error.push("Cutter Fault") }
        if (head == '1') { p.error.push("Printhead Overheating") }
        if (head == '2') { p.error.push("Motor Overheating") }
        if (head == '4') { p.error.push("Printhead Fault") }
        if (head == '8') { p.error.push("Incorrect Printhead") }
        if (pause == '1') { p.error.push("Printer Paused") }
        if (p.error.length == 0) { p.error.push("Unknown Error") }
        return callback(false);
      })
    }

    const sendData = () => checkPrinterStatus(handlePrint)

    document.getElementById('print_button').addEventListener('click', e => {
      e.preventDefault();
      sendData();
    });
    console.log('init')
  }

  if (document.readyState === "complete" || document.readyState === "loaded") {
    init()
  } else {
    window.addEventListener('load', init, false);
  }

})()
