const log = (text) => {
    console.log(text)
}


const courses = ['EOB', 'Insurance', 'Money Laundering', 'Economics']
const classes = [];
const assignedStudents = []
const numberOfClasses = 13;

// to generate random numbers 
const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}



// create a list of students in order 
const names = []

for(let i=1; i<100; i+=1) {
    names.push(`Student--${i}`)
}

// log(names)

const createGroups = () => {
    const classifiedGroup = []
    const arrayPool = [];
    // create group of students 
    for(let i=1; i<=100; i+=1){
        arrayPool.push({ group: random(9, 21), name: names[random(0, names["length"]-1)]})
    }

    // to create groups 
    for(let i=9; i<=21; i+=1) {
        classifiedGroup.push({ group: i, frequency: 0, students: []})
    }

    // to know the number of students in a group and assign them 
    arrayPool.forEach((value) => {
        classifiedGroup.forEach((test) => {
            if(value["group"] == test["group"]){
                test["frequency"]+=1
                test["students"].push({nameOfStudent: value["name"], groupNumber: test["group"]})
                while(test["students"].length > 5){
                    test["students"].pop()
                    test["frequency"]-=1
                }
            }
        })
    })
    return { arrayPool, classifiedGroup }
}

const sample = createGroups()

const classifiedGroup = sample.classifiedGroup

// to assign exam schedule
const assignExamSchedule = (numberOfClasses) => {
        let rearranged = ''
    for (let i=1; i <= numberOfClasses; i+=1){
        classes.push(random(0, courses["length"]-1))
        rearranged = classes.map((value, index) => {
                return { group: index+9, course: courses[value] }
            })
    }
    return rearranged
}

const arrangement = assignExamSchedule(numberOfClasses);

// =================== THIS IS THE GRID ARRANGEMENT PART =========== //

const assignExamClass = (array) => {
    const receivedPool = array;
    const eachSubset = []
    let testExistence = false
    receivedPool.forEach((group) => {
        testExistence = assignedStudents.find(element =>  element == group["students"].slice(2))
        if(testExistence == undefined){
            assignedStudents.push(group["students"].slice(2))
            eachSubset.push(group["students"].slice(2))
        }
    })
    return eachSubset
}

const printStudentsInSameClass = (nameOfClass, entireList) => {
    const list = assignExamClass(entireList)
    const returnedArray = []
    list.forEach((item) => {
        item.forEach((value) => {
            returnedArray.push(value)
        })
    })
    return returnedArray
}

const data = printStudentsInSameClass('Marigold', classifiedGroup);

//  assign seats function 
const assignSeats = (receivedArray) => {
    const positions = [];
    //  create an array of rows and column seat numbers
    for(let row=1; row<=7; row+=1){
        for(let column=1; column<=5; column+=1){            
            positions.push({position: {row: row, column: column}})
        }
    }

    //  assign the seat numbers to each student  
    for(let i=0; i<data.length; i+=1){
        receivedArray[i]["position"] = positions[i]
    }        
    receivedArray.forEach((item) => {
        if (item["positions"] === undefined){
            log(`this is true`)
            delete item
        }
    })
    return receivedArray
}

log(assignSeats(data))