// ---------------------INSTRUCTIONS

// There is a queue for the self-checkout tills at the supermarket. Your task is write a function to calculate the total time required for all the customers to check out!
//
// input
// customers: an array of positive integers representing the queue. Each integer represents a customer, and its value is the amount of time they require to check out.
// n: a positive integer, the number of checkout tills.
//
// output
// The function should return an integer, the total time required.
//
// Important
// Please look at the examples and clarifications below, to ensure you understand the task correctly :)

// Examples:
//
// queueTime([5,3,4], 1)
// should return 12
// because when there is 1 till, the total time is just the sum of the times
//
// queueTime([10,2,3,3], 2)
// should return 10
// because here n=2 and the 2nd, 3rd, and 4th people in the
// queue finish before the 1st person has finished.
//
// queueTime([2,3,10], 2)
// should return 12

// Clarifications
// There is only ONE queue serving many tills, and
// The order of the queue NEVER changes, and
// The front person in the queue (i.e. the first element in the array/list) proceeds to a till as soon as it becomes free.
// N.B. You should assume that all the test input will be valid, as specified above.
//
// P.S. The situation in this kata can be likened to the more-computer-science-related idea of a thread pool, with relation to running multiple processes at the same time: https://en.wikipedia.org/wiki/Thread_pool




// ------------------------------------3 DAYS AFTER THE FIRST TRY
let isFirstRunFlag = false
let noMoreCustomersFlag = false
let fastestNextCustomer = ""
let totalTimeSpend = 0
function queueTime(customers, n) {
    if (n === 1) {
        return customers.reduce((sum, element) => sum + element, 0)
    } else if (n >= customers.length) {
        customers.sort((a, b) => b - a);
        return customers[0]
    } else {
        //Set arrays for customers (2 different ones, one that refers to the customers in tills and the other one referring to the customers waiting in line)
        let customersTills = [];
        customersTills.push(customers.slice(0, n))
        let customersTillsFinalArray = customersTills.reduce((acc, val) => acc.concat(val), [])
        let customersWaitingInLine = [];
        customersWaitingInLine.push(customers.slice(n, customers.length))
        let customersWaitingInLineFinalArray = customersWaitingInLine.reduce((acc, val) => acc.concat(val), [])
        let newArray = [];
        //The next function is where the magic happens
        let supermarketTill = (CustomerTillPaymentLine) => {
            //Orders the array, so I can access to the first value (the lower one)
            let correctOrder = CustomerTillPaymentLine.sort((a, b) => a - b);
            //If it's the fist time you access here, It saves the lower value at fastestNextCustomer
            //If the Till has been updated, adds the next lower value to tw previous one (updating the time needed to finish the line)
            if (isFirstRunFlag === false) {
                fastestNextCustomer = correctOrder[0];
                totalTimeSpend += fastestNextCustomer;
            }
            //Subtract one number from each element of the customers at tills array (simulating the time spending for they to pay)
            newArray = CustomerTillPaymentLine.map(function (item) {
                return item -= 1
            });
            //If there's no more clients waiting in line and every customer on till has finished, it finishes the function, returning the final answer
            if (customersWaitingInLineFinalArray.length === 0 && newArray.every((item) => item === 0)) {
                return totalTimeSpend;
            }
            //Change this, so you can't modify the variable totalTimeSpend unless it exist a zero on the till
            isFirstRunFlag = true
            //Set the conditions to detect if there's one zero or if every client in the tills has a zero as value
            //(Letting know if they finished there time, and need to be replaced)
            let isThereAZero = newArray.some(item => item === 0)
            let noneIsZero = newArray.every(item => item !== 0)
            //If none of them iz zero just continue subtracting numbers
            if (noneIsZero) {
                supermarketTill(newArray)
            }
            //If theres a zero:
            if (isThereAZero) {
                //Deletes all the zeros in the array
                newArray = newArray.filter((item) => item > 0)
                //Add the next client in line to the till, until all the available tills are covered
                //and deletes the client from the waiting line array
                let addItem = () => {
                    if (newArray.length < n && customersWaitingInLineFinalArray.length > 0) {
                        newArray.push(customersWaitingInLineFinalArray[0])
                        customersWaitingInLineFinalArray.splice(0, 1)
                        addItem()
                        //You change this so the next lower value in the till can be saved at the variable totalTimeSpend (because it's going to access to that part)
                        isFirstRunFlag = false
                    }
                    //If there's no more clients waiting in line, it adds the higher number remaining in the till
                    //to the total time spend (final answer)
                    if (customersWaitingInLineFinalArray.length === 0 && !noMoreCustomersFlag) {
                        //It's important to change the flag to true, because the next time doesn't access here
                        noMoreCustomersFlag = true
                        totalTimeSpend += Math.max(...newArray)
                        return totalTimeSpend
                    }
                }
                addItem()
                //If there is more clients in line, this happens (this is the original state of this variable)
                if (!noMoreCustomersFlag) {
                    supermarketTill(newArray)
                }
            }
        }
        supermarketTill(customersTillsFinalArray)
        //At the end it changes all the values to the original ones to repeat the process with the next test.
        isFirstRunFlag = false
        noMoreCustomersFlag = false
        let finalElement = totalTimeSpend
        totalTimeSpend = 0
        //Returns the final answer
        return finalElement
    }
}

console.log(queueTime([5,3,4], 1))
console.log(queueTime([10,2,3,3], 2))
console.log(queueTime([2,3,10], 2))