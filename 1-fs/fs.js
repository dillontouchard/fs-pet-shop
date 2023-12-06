import fs from "fs";
import process from "process";

// console.error(`Usage: node fs.js [read | create | update | destroy]`);

if (!process.argv[2]) {
  console.error(`Usage: node fs.js [read | create | update | destroy]`);
  process.exit(1);
}

if (process.argv[2] === "read") {
  fs.readFile("../pets.json", "utf8", function (error, data) {
    if (error) {
      console.log(error);
    } else if (process.argv[3] !== undefined) {  // define error state for subcommand 
      let petShop = JSON.parse(data);
      let index = parseInt(process.argv[3]);
      // if index does not exist -- display // 
      if (petShop[index] === undefined) {
        console.log('Usage: node fs.js read INDEX')
      } else {
        console.log(petShop[index])
      }
      // otherwise do the things

    } else {
      console.log(petShop);
    }
  });
}

if (process.argv[2] === "create") {
  fs.readFile("../pets.json", "utf8", function (error, data) {
    if (process.argv.length !== 6) {
      console.log("Usage: node fs.js create AGE KIND NAME");
    } else {
      let petShop = JSON.parse(data);
      let newPet = {
        age: process.argv[3],
        kind: process.argv[4],
        name: process.argv[5],
      };
      petShop.push(newPet);
      let updatedDogArray = JSON.stringify(petShop);

      fs.writeFile(
        "../pets.json", updatedDogArray, "utf8" , function (error, data) {
          if (error) {
            console.log(error);
          } else {
            console.log(`Successfully added ${newPet}`);
          }
        }
      );
    }
  });
}
