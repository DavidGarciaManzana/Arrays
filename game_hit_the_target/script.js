// -----------------------INSTRUCTIONS

// Given a matrix n x n (2-7), determine if the arrow is directed to the target (x).
// There will be only 1 arrow '>' and 1 target 'x'
// An empty spot will be denoted by a space " ", the target with a cross "x", and the scope ">"

// Examples:
//     given matrix 4x4:
//     [
//     [' ', ' ', ' ', ' '],
//     [' ', ' ', ' ', ' '], --> return true
//     [' ', '>', ' ', 'x'],
//     [' ', ' ', ' ', ' ']
//     ]
// given matrix 4x4:
//     [
//     [' ', ' ', ' ', ' '],
//     [' ', '>', ' ', ' '], --> return false
//     [' ', ' ', ' ', 'x'],
//     [' ', ' ', ' ', ' ']
//     ]
// given matrix 4x4:
//     [
//     [' ', ' ', ' ', ' '],
//     [' ', 'x', '>', ' '], --> return false
//     [' ', '', ' ', ' '],
//     [' ', ' ', ' ', ' ']
//     ]
//
// In this example, only a 4x4 matrix was used, the problem will have matrices of dimensions from 2 to 7

// ------------------------SECOND TRY

const solution = mtrx => {
    if (mtrx.some(item => item.includes(">") && item.includes("x"))) {
        let arrayWanted = mtrx.find(i => i.includes(">"))
        let upPosition = arrayWanted.findIndex(j => j === ">")
        let xPosition = arrayWanted.findIndex(k => k === "x")
        if (upPosition < xPosition) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

console.log(solution(
    [
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
        [' ', '>', ' ', 'x'],
        [' ', ' ', ' ', ' ']
    ]
))


console.log(solution(
    [
        [' ', ' ', ' ', ' '],
        [' ', '>', ' ', ' '],
        [' ', '', ' ', 'x'],
        [' ', ' ', ' ', ' ']
    ]
))