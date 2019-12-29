const log = (text) => {
    console.log(text)
}

const returnRandomItemFromArray = (array, condition=true) => {
    const randomItem = array[random(0,array.length-1)]
   const randomItemIndex = array.findIndex((item) => item === randomItem)
   
//    if(condition == true) {
        if(randomItemIndex !== -1 ){
            array.splice(randomItemIndex, 1)
        // }
   }
    return { randomItem, array}
}


const createTableElements = (myobject, element, count) => {
    let table = `
      <tr>
        <th scope="row">${count}</th>
        <td>${myobject.name}</td>
        <td>${myobject.group}</td>
        <td></td>
      </tr>`
      $(`#${element}`).append(table)
}

const createTable = (myobject, idcount) => {
    let table = `
    <table class="table my-4">
        <h5 class="text-center pt-2 pb-2">Group ${myobject.group}</h5>
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name </th>
            <th scope="col">Class</th>
            <th scope="col">Exam</th>
          </tr>
        </thead>
        <tbody id="item${idcount}">
        </tbody>
    </table>
    `
    $(`#group-section`).append(table)
}

const createGrid = (myobject, element) => {
    let grid = `
    <div class="grid-item">
        <p class="lead">${myobject.name}</p>
        <p class="lead">Group ${myobject.group}</p>
        <p>Row: ${myobject.position.row}</p>
        <p>Column: ${myobject.position.column}</p>
    </div>
    `
    $(`#${element}`).append(grid)
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


for(let i=1; i<=100; i+=1) {
    names.push(`Student--${i}`)
}

const namesToUse = [...names]

// ======================= BEGINNING OF CREATE GROUPS FUNCTION 
const createGroups = (namesArray) => {
    const classifiedGroup = []
    const arrayPool = [];
    const groups = [];
    const countArray = []
    
    for(let i=0; i<(100/13); i+=1){
        countArray.push(i)
    }

    countArray.forEach((count) => {
        for(let j=9; j<=21; j+=1){
            groups.push(j)
        }
    })
    
    // create group of students 
    for(let i=0; i<=namesArray.length-1; i+=1){
        for(let j=9; j<=21; j+=1){
            let student = returnRandomItemFromArray(namesArray).randomItem
            let group = returnRandomItemFromArray(groups).randomItem
            arrayPool.push({ group: group, name: student})
        }
    }

    arrayPool.forEach((item, itemIndex, items) => {
        if(item.name === undefined) {
            arrayPool.splice(itemIndex, 4)
        }
    })
    
    // log(arrayPool)
    // to create groups 
    for(let i=9; i<=21; i+=1) {
        classifiedGroup.push({ group: i, frequency: 0, students: []})
    }

    
    // arrayPool.forEach((item) =>{
    //     if(item.group === 21){
    //         log(item)
    //     }
    // })

    // to know the number of students in a group and assign them 
        classifiedGroup.forEach((group) => {
            arrayPool.forEach((value) => {            
                if(value["group"] == group["group"]){
                    group["students"].push(value)
                }
            })
        })

    return { arrayPool, classifiedGroup }
}

// ================= END OF CREATE GROUPS FUNCTION 


const sample = createGroups(namesToUse)

const classifiedGroup = sample.classifiedGroup
const arrayPool = sample.arrayPool


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

const assignExamClass = (Groups) => {
    const eachSubset = []
    let testExistence = false
    const returnedClass = []
    Groups.forEach((group) => {
        let newlyAssigned = []
        testExistence = assignedStudents.find(element =>  element == newlyAssigned)
        if(testExistence == undefined){
            for(let i=0; i<=random(1, 2); i+=1){
                newlyAssigned.push(group["students"].pop())
            }
            eachSubset.push(newlyAssigned)
            assignedStudents.push(newlyAssigned)
        }
    })
    eachSubset.forEach((subset) => {
        subset.forEach((student) => {
            returnedClass.push(student)
        })
    })

    return returnedClass
}




const classOne = assignExamClass(classifiedGroup);
// funciton t return random items from an array


//  assign seats function 
const assignSeatsPosition = (receivedArray) => {
    const positions = [];
    const returnArray = []
    //  create an array of rows and column seat numbers
    for(let row=1; row<=7; row+=1){
        for(let column=1; column<=5; column+=1){            
            positions.push({row: row, column: column})
        }
    }
    positions.length = classOne.length

    positions.forEach((position) => {
        const student = returnRandomItemFromArray(receivedArray).randomItem; 
        returnArray.push({ name: student.name, group: student.group,  position: position})
    })
        
    return returnArray
}

const seatStudents = assignSeatsPosition(classOne)
log(seatStudents)
// ================== WORKING SPACE ==================



// ========== to display the assigned groups 
const element = 'namestbody'
classifiedGroup.forEach((item, itemIndex, items) => { 
    createTable(item, itemIndex+1)
    let theId = `item${itemIndex+1}`
    item.students.forEach((student, studentIndex) => {
        createTableElements(student, theId, studentIndex+1) 
    })
   
})
// ====== end of assigned groups 


// =========== All Names section =========
arrayPool.forEach((student, studentIndex) => {
    createTableElements(student, element, studentIndex+1)
})
//  end of names section 

// ======== schedule section 
const createExamSchedule = (myobject, element, count) => {
    let table = `
      <tr>
        <th scope="row">${count}</th>
        <td>Group ${myobject.group}</td>
        <td>${myobject.course}</td>
      </tr>`
      $(`#${element}`).append(table)
}

const arrangementId = 'schedules'

arrangement.forEach((group, groupIndex) => {
    createExamSchedule(group, arrangementId, groupIndex+1)
})
//  ============ end of schedule section 

// ============= beginning of grid 
const box = 'mycontainer';

seatStudents.forEach((student) => {
    createGrid(student, box)
})

//  ===== end of grid system 
//  ================ END OF WORKING SPACE ===================== //

//  ================= BEGINNING OF ELEMENTS SELECTION

//  ========== BUTTONS SELECTION
const studentButton = document.getElementById('students');
const groupsButton = document.getElementById('groups');
const scheduleButton = document.getElementById('schedule');
const examScheduleButton = document.getElementById('exams');


// ========== SECTIONS SELECTION
const studentsList = document.getElementById('names-section');
const groupsList = document.getElementById('group-section');
const scheduleList = document.getElementById('schedule-section');
const examScheduleSection = document.getElementById('mycontainer');

groupsList.style.display = "none"
scheduleList.style.display = "none"
examScheduleSection.style.display = "none"

studentButton.addEventListener('click', () => {
    alert('student button worked')
    studentsList.style.display = "block"
    groupsList.style.display = "none"
    scheduleList.style.display = "none"
    examScheduleSection.style.display = "none"
})

groupsButton.addEventListener('click', () => {
    alert('group button worked')
    groupsList.style.display = "block"
    studentsList.style.display = "none"
    scheduleList.style.display = "none"
    examScheduleSection.style.display = "none"
})

scheduleButton.addEventListener('click', () => {
    alert('schedule button worked')
    scheduleList.style.display = "block"
    groupsList.style.display = "none"
    studentsList.style.display = "none"
    examScheduleSection.style.display = "none"
})

examScheduleButton.addEventListener('click', () => {
    alert('exam schedule button worked')
    examScheduleSection.style.display = "grid"
    groupsList.style.display = "none"
    scheduleList.style.display = "none"
    studentsList.style.display = "none"
})

//  ==============================  END OF ELEMENTS SELECTION 
