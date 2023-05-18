function createEmployeeRecord(arr){
    let employee = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return(employee) 
}

function createEmployeeRecords(arr){
    let newArray=[]
    for(let item of arr){
      newArray.push(createEmployeeRecord(item))              
    }
    return newArray       
} 

function createTimeInEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn", 
        hour: parseInt(hour, 10), 
        date,
    })
    return employee
}
function createTimeOutEvent(employee, dateTime){
    let timeOut= {
        type:"TimeOut",
        hour: parseInt(dateTime.split(' ')[1]),
        date: dateTime.split(' ')[0]        
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
    let total = 0
    for(let i=[0]; i <array.length; i++){
        let wage = allWagesFor(array[i])
        total+= wage        
    }
    return(total)
}
