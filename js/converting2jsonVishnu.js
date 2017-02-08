module.exports = function convertcsv(startYear)
{
  // test wether coming year in json is correct or not
  if(typeof startYear !== 'number' || isNaN(startYear))
  {
        throw new Error('Not a number');
  }
// getting the required file systems to read the files
const fs = require('fs');
const readline = require('readline');
/* creating required json1 from  the combined json*/
let convertWithStream1 = () => {
  let readStream = fs.createReadStream('../inputdata/India2011 (6).csv');
  // read line by line
  let rli = readline.createInterface({
    input: readStream,
    terminal: false
  });
  let linenumber = 0;
  // creating the json array to store
  let jsonArray = [];
  let x;
  // creating a on method for each line passed
  rli.on('line', (line) => {
    // disableing the es-lint for this block because of nested if blocks
    /*eslint-disable */
    // checking each line number to avoid the headers
    if(linenumber === 0) {
       x = line;
       //  console.log(x);
      linenumber += 1;
    }
    else{
      // if method to avoid headers in the rest of the code
      if (line === x) { }
        // if no headers continueing with the line method
        else{
            let values = line.split(',');
            if(jsonArray.length > 0)
            {
              let agegroupFound = false;
              // for every json in the json array we will be running the code
               for(let json of jsonArray)
              {
                // if age group found adding those values
                if(json.AgeGroup === values[5] && values[5] !== 'All ages' && values[4] === 'Total')
                  {
                    json.LiteratePopulation = Number(json.LiteratePopulation)+Number(values[12]);
                        agegroupFound = true;
                        break;
                    }
                }
                // if agegroup not found adding the values
                if(!agegroupFound && values[5] !== 'All ages' && values[4] === 'Total'){
                    let json = {'AgeGroup':values[5],'LiteratePopulation': values[12]};
                    jsonArray.push(json);
                  }
            }
            else{
              // excluding the all ages from the out put values
                if(values[5] !== 'All ages' && values[4] === 'Total')
                {
                let json = {'AgeGroup' : values[5], 'LiteratePopulation' : values[12]};
               jsonArray.push(json);
               }
            }
          }
        }
        /*eslint-enable */
    });
// creating the close method and writing a file to output
rli.on('close', () => fs.writeFileSync('../outputdata/newdata.json', JSON.stringify(jsonArray)));
};
convertWithStream1();
// a return message
return 'JSON written successfully';
};
