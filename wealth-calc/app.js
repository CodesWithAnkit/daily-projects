const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

// fetch user data
const getRamdomUser = async () => {
  const url = 'https://randomuser.me/api/';
  const res = await fetch(url);
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 100000)
  };

  addData(newUser);
};

const doubleMoney = () => {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDom();
};

const sortByRichest = () => {
  data.sort((a, b) => b.money - a.money);

  updateDom();
};

const showMillionaires = () => {
  data = data.filter(user => user.money > 100000);
  updateDom();
};

const calculateWealth = () => {
  wealth = data.reduce((acc, item) => (acc += item.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;

  main.appendChild(wealthEl);
};

function addData(obj) {
  data.push(obj);

  updateDom();
}

function updateDom(providedData = data) {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;

    main.appendChild(element);
  });
}

// getRamdomUser

// Format number as money
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

addUserBtn.addEventListener('click', getRamdomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);

getRamdomUser();
getRamdomUser();
getRamdomUser();
