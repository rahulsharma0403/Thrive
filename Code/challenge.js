const fs = require("fs");

fs.unlinkSync('./output/output.txt'); // delete and create new output file
function write(data) {   //method to write on the text file
    try {
        fs.appendFileSync('./output/output.txt', JSON.stringify(data, null, 2) , 'utf-8');
        console.log("File has been saved.");
    } catch (error) {
        console.error(err);
    }
}

// Class created to get the output in a specific format 
class Company {
    constructor(companyId, companyName, userEmailed, userNotEmailed, totalAmount) {
        this.companyId = companyId;
        this.companyName = companyName;
        this.userEmailed = userEmailed;
        this.userNotEmailed = userNotEmailed;
        this.totalAmount = totalAmount;
    }
}

// Parsing2 data from json files
fs.readFile("./json/companies.json", "utf8", (err, companyJson) => {
    fs.readFile("./json/users.json", "utf8", (err, usersJson) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return;
        }
        try {
            const companies = JSON.parse(companyJson);
            const users = JSON.parse(usersJson);
           // Creating new object of the class and pushing the data into it.
            companies.forEach((element) => companyName.push(new Company(element.id, element.name, [], [], 0)));

            users.forEach(user => {
                companies.forEach(company => {
                    if (user.active_status == true) { // Conditions to check the users.active_status
                        if (user.company_id == company.id) {  // Checking the email conditions
                            if (user.email_status == true && company.email_status == true) {
                                companyName[company.id - 1].userEmailed.push(user.last_name + ',' + user.first_name + ',' + user.email)
                                companyName[company.id - 1].userEmailed.push("Previous Token Balance ," + user.tokens)
                                companyName[company.id - 1].userEmailed.push("New Token Balance " + (company.top_up + user.tokens))
                                companyName[company.id - 1].totalAmount = companyName[company.id - 1].totalAmount + company.top_up;
                            } else if (user.email_status == false || company.email_status == false  ) {
                                companyName[company.id - 1].userNotEmailed.push(user.last_name + ',' +user.first_name + ',' + user.email)
                                companyName[company.id - 1].userNotEmailed.push("Previous Token Balance ," + user.tokens)
                                companyName[company.id - 1].userNotEmailed.push("New Token Balance " + (company.top_up + user.tokens))
                                companyName[company.id - 1].totalAmount = companyName[company.id - 1].totalAmount + company.top_up;
                            }
                        }
                    }
                })
            });

            console.log(companyName); // Priting the ouput in the console
           // Writing to ouput file 
            for(var i=0;i<companyName.length ;i++){
                if(companyName[i].userEmailed.length > 0 || companyName[i].userNotEmailed.length >0 )
                // Checking for bad data or in the case of scenario 6, where company_id = 6 is 
                //not available in the uers.json
                write(companyName[i]);
            }
        }
        catch (error) {
            console.error(err + " There was an error parsing the document and the file will not be processes");
        }
    })
});


// Note: ---------To run the code in VS or cmd use: node challenge.js-------------------------
