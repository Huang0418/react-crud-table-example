let userData = [
  { 
    id: 1, 
    name: 'Huang Chee Han', 
    phone: '0911509471',
    email: 'huangcheehan@gmail.com'
  },
  { 
    id: 2, 
    name: 'Huang Chee Han 2', 
    phone: '02373846378',
    email: 'qihan@gmail.com'
  },
  { 
    id: 3, 
    name: 'Huang Chee Han 3', 
    phone: '022312324423',
    email: 'qihan2@gmail.com'
  }
];
let lastId = 3;

export async function getUsers () {
  return delay(1000, copyData(userData));
}

export async function addUser (user) {
  userData.push({
    ...user,
    id: ++lastId
  });

  return delay(500, true);
}

export async function editUser (newVal) {
  let oldValIndex = userData.findIndex(e => e.id === newVal.id);
  userData.splice(oldValIndex, 1, newVal);

  return delay(500, true);
}

export async function deleteUser (userId) {
  let target = userData.findIndex(e => e.id === userId);
  userData.splice(target, 1);

  return delay(100, true);
}

export async function checkName (username) {
  let target = userData.find(e => e.name === username);
  let statusCode = target ? { status: 400 } : { status: 200 };

  return delay(200, statusCode);
}

function delay (ms, data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), ms);
  });
}

function copyData (data) {
  return data.map(each => {
    return Object.assign({}, each);
  });
}