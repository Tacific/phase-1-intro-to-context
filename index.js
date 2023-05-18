function createEmployeeRecord(array){
    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return(employee) 
}

function createEmployeeRecords(array){
    let newArr=[]
    for(let item of array){
      newArr.push(createEmployeeRecord(item))              
    }
    return newArr       
} 

function createTimeInEvent(employee, stamp){
    let timeIn= {
        type:"TimeIn",
        hour: parseInt(stamp.split(' ')[1]),
        date: stamp.split(' ')[0]
    }
    employee.timeInEvents.push(timeIn)
    return employee
}

function createTimeOutEvent(employee, stamp){
    let timeOut= {
        type:"TimeOut",
        hour: parseInt(stamp.split(' ')[1]),
        date: stamp.split(' ')[0]        
    }
    employee.timeOutEvents.push(timeOut)
    return employee
}

function hoursWorkedOnDate(employee, string){ 
    let timeIn = employee.timeInEvents.find(event=>{
        return event.date===string
    }).hour
    let timeOut = employee.timeOutEvents.find(event=>{
        return event.date===string
    }).hour
    let hours= (timeOut-timeIn)/100
    return hours        
}

function wagesEarnedOnDate(employee, string){
    return hoursWorkedOnDate(employee, string)*employee.payPerHour       
}

function allWagesFor(employee){
    let totalWage = 0
    for(let i=0; i <employee.timeOutEvents.length; i++){
        const wages = (wagesEarnedOnDate(employee, employee.timeOutEvents[i].date))        
        totalWage += wages
    }
    return totalWage    
}


function calculatePayroll(array){
    let totalPayroll = 0
    for(let j=[0]; j <array.length; j++){
        let wage = allWagesFor(array[j])
        totalPayroll+= wage        
    }
    return(totalPayroll)
}
