(function () {
  const basketballNames = [
    'Jordan', 'LeBron', 'Kobe', 'Shaq', 'Magic', 'Larry', 'Wilt', 'Russell', 'Curry', 'Durant',
    'Iverson', 'Garnett', 'Duncan', 'Bird', 'Barkley', 'Wade', 'Harden', 'Westbrook', 'Pippen', 'Ewing',
    'Stockton', 'Malone', 'Olajuwon', 'Robinson', 'Nash', 'Nowitzki', 'Pierce', 'Carter', 'McGrady', 'Payton',
    'Mourning', 'Billups', 'Stoudemire', 'Kidd', 'Paul', 'Allen', 'Miller', 'Hill', 'Howard', 'Webber',
    'Rose', 'Wall', 'Beal', 'Lillard', 'George', 'Butler', 'Tatum', 'Mitchell', 'Young', 'Morant',
    'Embiid', 'Jokic', 'Giannis', 'Zion', 'Edwards', 'Ball', 'Haliburton', 'Fox', 'Ingram', 'DeRozan',
    'Middleton', 'Siakam', 'Gobert', 'Towns', 'Murray', 'Booker', 'Porzingis', 'Adebayo', 'Bridges', 'Ayton',
    'Sabonis', 'Green', 'Brown', 'Smart', 'Harris', 'Maxey', 'Holiday', 'Randle', 'VanVleet', 'Barnes',
    'Cunningham', 'Banchero', 'Suggs', 'Mobley', 'Okoro', 'Vucevic', 'Markkanen', 'Simmons', 'Thompson', 'Wiseman',
    'Poole', 'Wiggins', 'Porter', 'Looney', 'McCollum', 'Brooks', 'Adams', 'Hachimura', 'Avdija', 'Olynyk',
    'Schroder', 'Rubio', 'Dragic', 'Bogdanovic', 'Gallinari', 'Bertans', 'Nurkic', 'Valanciunas', 'Kleber', 'Powell'
  ];

  const hockeyNames = [
    'McDavid', 'Crosby', 'Ovechkin', 'MacKinnon', 'Draisaitl', 'Matthews', 'Panarin', 'Kane', 'Stamkos', 'Eichel',
    'Marchand', 'Hedman', 'Stone', 'Pastrnak', 'Josi', 'Tavares', 'Kopitar', 'Aho', 'Marner', 'Toews',
    'Makar', 'Hughes', 'McAvoy', 'O\'Reilly', 'Barzal', 'Point', 'Heiskanen', 'Hellebuyck', 'Price', 'Hamilton',
    'Gaudreau', 'Connor', 'Hertl', 'Voracek', 'Svechnikov', 'Malkin', 'Nylander', 'Pettersson', 'Forsberg', 'Scheifele',
    'Tkachuk', 'Huberdeau', 'Landeskog', 'Subban', 'Letang', 'Benn', 'Dubois', 'Wheeler', 'Bergeron', 'Pavelski',
    'Giroux', 'Tarasenko', 'Kucherov', 'Fox', 'Reinhart', 'Boeser', 'Ekblad', 'Getzlaf', 'Doughty', 'Giordano',
    'Smith', 'Lindholm', 'Anderson', 'Nugent-Hopkins', 'Larkin', 'Carter', 'Lafreniere', 'Holtz', 'Byram', 'Zegras',
    'Robertson', 'Batherson', 'DeBrincat', 'Hintz', 'Dobson', 'Suzuki', 'Necas', 'Kravtsov', 'Tolvanen', 'Bean',
    'Steen', 'Bishop', 'Talbot', 'Parise', 'Gallagher', 'Chabot', 'Spurgeon', 'Rielly', 'Chychrun', 'Lundell',
    'Jarry', 'Lankinen', 'Shesterkin', 'Sarros', 'Raanta'
  ];

  const footballNames = [
    'Brady', 'Mahomes', 'Rodgers', 'Jackson', 'Wilson', 'Barkley', 'Henry', 'McCaffrey', 'Kamara', 'Cook',
    'Adams', 'Hopkins', 'Diggs', 'Hill', 'Jones', 'Kittle', 'Kelce', 'Waller', 'Smith', 'Murray',
    'Watson', 'Allen', 'Garoppolo', 'Goff', 'Herbert', 'Mixon', 'Carson', 'Chubb', 'Hunt', 'Jacobs',
    'Gordon', 'Taylor', 'Swift', 'Ekeler', 'Fournette', 'Robinson', 'Sanders', 'Johnson', 'Montgomery', 'Brown',
    'Metcalf', 'Godwin', 'Evans', 'Thielen', 'Fuller', 'Landry', 'Jeudy', 'Anderson', 'Parker', 'Moore',
    'Higgins', 'Claypool', 'Smith-Schuster', 'Shenault', 'Samuel', 'Henry', 'Davis', 'Williams', 'Boyd', 'Gage',
    'White', 'Akers', 'Moss', 'Jones', 'Pollard', 'Harris', 'Scott', 'Wilson', 'Drake', 'Patterson',
    'Golladay', 'Allen', 'Cobb', 'Sanders', 'Beasley', 'Newton', 'Love', 'Stafford', 'Fitzpatrick', 'Tannehill',
    'Watson', 'Burrow', 'Smith', 'Hurst', 'Meyers', 'Newton', 'Bridgewater', 'Tagovailoa', 'Wentz', 'Cousins',
    'Hurts', 'Lawrence', 'Fields', 'Wilson', 'Prescott'
  ];

  const baseballNames = [
    'Trout', 'Betts', 'Arenado', 'Lindor', 'Yelich', 'Harper', 'Machado', 'Bellinger', 'Acuna', 'Freeman',
    'Altuve', 'Judge', 'Springer', 'Martinez', 'Bryant', 'Goldschmidt', 'Rizzo', 'Soto', 'Seager', 'Arenado',
    'Ramirez', 'Correa', 'Bregman', 'Turner', 'Guerrero', 'Cole', 'Kershaw', 'Scherzer', 'Bauer', 'deGrom',
    'Snell', 'Gray', 'Nola', 'Paddack', 'Lynn', 'Darvish', 'Giolito', 'Gallen', 'Flaherty', 'Hader',
    'Chapman', 'Hendriks', 'Yates', 'Iglesias', 'Hand', 'Rosenthal', 'Pressly', 'Diekman', 'Williams', 'Hudson',
    'Pham', 'Kiermaier', 'Hicks', 'Conforto', 'Castellanos', 'Ozuna', 'Merrifield', 'Soler', 'Marte', 'Blackmon',
    'Gallo', 'Grisham', 'McNeil', 'Canha', 'Mullins', 'Brantley', 'Verdugo', 'Benintendi', 'Pence', 'Upton',
    'Myers', 'Calhoun', 'Reyes', 'Martinez', 'Santander', 'Schwarber', 'Davis', 'Duvall', 'Smoak', 'Gonzalez',
    'Pujols', 'Abreu', 'Lowe', 'Senzel', 'Encarnacion', 'Alvarez', 'Sano', 'Diaz', 'Mountcastle', 'Anderson',
    'Luzardo', 'Urias', 'May', 'Gonzales', 'Wheeler'
  ];

  const namedGroups = [basketballNames, footballNames, hockeyNames, baseballNames];

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function getRandomName(selectedIndex = 0) {
    const group = namedGroups[selectedIndex] || namedGroups[0];
    return group[Math.floor(Math.random() * group.length)];
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let index = 0; index < 6; index += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  function getPlacementSuffix(value) {
    const suffixMap = { 1: 'st', 2: 'nd', 3: 'rd' };
    const lastDigit = value % 10;
    const lastTwoDigits = value % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return 'th';
    }

    return suffixMap[lastDigit] || 'th';
  }

  function formatPlacement(value) {
    return `${value}${getPlacementSuffix(value)}`;
  }

  function normalizePositiveInteger(value, fallback = 1) {
    const parsedValue = Number.parseInt(value, 10);

    if (Number.isNaN(parsedValue) || parsedValue <= 0) {
      return fallback;
    }

    return parsedValue;
  }

  const api = {
    clamp,
    getRandomName,
    getRandomColor,
    getPlacementSuffix,
    formatPlacement,
    normalizePositiveInteger,
    namedGroups
  };

  if (typeof window !== 'undefined') {
    window.Helpers = api;
    window.getRandomName = getRandomName;
    window.getRandomColor = getRandomColor;
    window.formatPlacement = formatPlacement;
    window.normalizePositiveInteger = normalizePositiveInteger;
    window.clamp = clamp;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})();
