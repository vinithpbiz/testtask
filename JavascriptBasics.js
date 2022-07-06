const USERS = [
    {
        firstName: "Oliver",
        lastName: "Jake",
        isActive: true,
        role: "student",
        registeredAt: 1625112000000
    },
    {
        firstName: "Connor",
        lastName: "Liam",
        isActive: true,
        role: "student",
        registeredAt: 1609477200000
    },
    {
        firstName: "Charlie",
        lastName: "",
        isActive: true,
        role: "admin",
        registeredAt: 1619841600000
    },
    {
        firstName: "Thomas",
        lastName: "",
        isActive: true,
        role: "student",
        registeredAt: 1612155600000
    },
    {
        firstName: "George",
        lastName: "Reece",
        isActive: true,
        role: "superAdmin",
        registeredAt: 1614574800000
    },
    {
        firstName: "Oscar",
        lastName: "Rhys",
        isActive: false,
        role: "superAdmin",
        registeredAt: 1617249600000
    },
    {
        firstName: "William",
        lastName: "Damian",
        isActive: false,
        role: "student",
        registeredAt: 1609477200000
    }
]

// returning promise function
function getUsers(){
    return new Promise((resolve, reject)=>{
        if(USERS) resolve(USERS)
        reject(USERS)
    })
}

// list deactivated user
function filterDeactivatedUsers(users){
    const userarr = []
    users.map(items => {
        if(items.isActive == false) userarr.push(items)
    })
    return userarr
}

// list fullname of users
function getUserFirstAndLastName(users){
    const fullnamearr = []
    let fullname
    users.map(items => {
        fullname = `${items.firstName} ${items.lastName}`.trim()
        fullnamearr.push(fullname)
    })
    return fullnamearr
}

// user count based on registeredAt date
function getCountOfUsersAfterGivenData(orderObj, users){
    if(!orderObj.role || !orderObj.date) return "provide valid object"
    let count = 0
    users.map(items=>{
        if(items.role == orderObj.role){
            count = items.registeredAt > orderObj.date ? count+1 : count
        }
    })
    return count
}

// sort user based on registeredAt
function sortUsersByDate(order, users){
    if(!order || order!='asc' && order!='desc' ) return 'provid proper order'
    const userclone = users.map(a => ({...a}));
    let sortfun
    if(order == 'asc') sortfun = (a,b)=>a.registeredAt-b.registeredAt
    else if(order == 'desc') sortfun = (a,b)=>b.registeredAt-a.registeredAt
    userclone.sort(sortfun)
    return userclone
}

// test cases

// getUsers()
//     .then(filterDeactivatedUsers)
//     .then(getUserFirstAndLastName)
//     .then(users => console.log(users))

// getUsers()
//     .then(getCountOfUsersAfterGivenData.bind(null,{role:"student", "date":1604111000000}))
//     .then(users => console.log(users))

// getUsers()
//     .then(sortUsersByDate.bind(null,'asc'))
//     .then(users => console.log(users))