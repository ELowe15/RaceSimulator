/**
 * raceTools.js
 * 
 * Author: Evan Lowe
 * Created: Nov 12 2024
 * 
 * Description:
 * This file contains utility functions for generating player names and colors
 * for a fantasy sports race application. It provides lists of player names 
 * for different sports (basketball, football, hockey, and baseball) and 
 * functions to assign random names and colors to players based on the selected sport.
 * 
 * Functions:
 * - getRandomName: Selects a random player name based on the sport index.
 * - getRandomColor: Generates a random hex color code for player backgrounds.
 * 
 * Version: 1.0
 */

// Player names categorized by sport for random name generation
const basketballnames = [
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
    "McDavid", "Crosby", "Ovechkin", "MacKinnon", "Draisaitl", "Matthews", "Panarin", "Kane", "Stamkos", "Eichel",
    "Marchand", "Hedman", "Stone", "Pastrnak", "Josi", "Tavares", "Kopitar", "Aho", "Marner", "Toews",
    "Makar", "Hughes", "McAvoy", "O'Reilly", "Barzal", "Point", "Heiskanen", "Hellebuyck", "Price", "Hamilton",
    "Gaudreau", "Connor", "Hertl", "Voracek", "Svechnikov", "Malkin", "Nylander", "Pettersson", "Forsberg", "Scheifele",
    "Tkachuk", "Huberdeau", "Landeskog", "Subban", "Letang", "Benn", "Dubois", "Wheeler", "Bergeron", "Pavelski",
    "Giroux", "Tarasenko", "Kucherov", "Fox", "Reinhart", "Boeser", "Ekblad", "Getzlaf", "Doughty", "Giordano",
    "Smith", "Lindholm", "Anderson", "Nugent-Hopkins", "Larkin", "Carter", "Lafreniere", "Holtz", "Byram", "Zegras",
    "Robertson", "Batherson", "DeBrincat", "Hintz", "Dobson", "Suzuki", "Necas", "Kravtsov", "Tolvanen", "Bean",
    "Steen", "Bishop", "Talbot", "Parise", "Gallagher", "Chabot", "Spurgeon", "Rielly", "Chychrun", "Lundell",
    "Jarry", "Lankinen", "Shesterkin", "Sarros", "Raanta"
];

const footballNames = [
    "Brady", "Mahomes", "Rodgers", "Jackson", "Wilson", "Barkley", "Henry", "McCaffrey", "Kamara", "Cook",
    "Adams", "Hopkins", "Diggs", "Hill", "Jones", "Kittle", "Kelce", "Waller", "Smith", "Murray",
    "Watson", "Allen", "Garoppolo", "Goff", "Herbert", "Mixon", "Carson", "Chubb", "Hunt", "Jacobs",
    "Gordon", "Taylor", "Swift", "Ekeler", "Fournette", "Robinson", "Sanders", "Johnson", "Montgomery", "Brown",
    "Metcalf", "Godwin", "Evans", "Thielen", "Fuller", "Landry", "Jeudy", "Anderson", "Parker", "Moore",
    "Higgins", "Claypool", "Smith-Schuster", "Shenault", "Samuel", "Henry", "Davis", "Williams", "Boyd", "Gage",
    "White", "Akers", "Moss", "Jones", "Pollard", "Harris", "Scott", "Wilson", "Drake", "Patterson",
    "Golladay", "Allen", "Cobb", "Sanders", "Beasley", "Newton", "Love", "Stafford", "Fitzpatrick", "Tannehill",
    "Watson", "Burrow", "Smith", "Hurst", "Meyers", "Newton", "Bridgewater", "Tagovailoa", "Wentz", "Cousins",
    "Hurts", "Lawrence", "Fields", "Wilson", "Prescott"
];

const baseballNames = [
    "Trout", "Betts", "Arenado", "Lindor", "Yelich", "Harper", "Machado", "Bellinger", "Acuna", "Freeman",
    "Altuve", "Judge", "Springer", "Martinez", "Bryant", "Goldschmidt", "Rizzo", "Soto", "Seager", "Arenado",
    "Ramirez", "Correa", "Bregman", "Turner", "Guerrero","Cole", "Kershaw", "Scherzer", "Bauer", "deGrom",
    "Snell", "Gray", "Nola", "Paddack", "Lynn", "Darvish", "Giolito", "Gallen", "Flaherty", "Hader",
    "Chapman", "Hendriks", "Yates", "Iglesias", "Hand", "Rosenthal", "Pressly", "Diekman", "Williams", "Hudson",
    "Pham", "Kiermaier", "Hicks", "Conforto", "Castellanos", "Ozuna", "Merrifield", "Soler", "Marte", "Blackmon",
    "Gallo", "Grisham", "McNeil", "Canha", "Mullins", "Brantley", "Verdugo", "Benintendi", "Pence", "Upton",
    "Myers", "Calhoun", "Reyes", "Martinez", "Santander", "Schwarber", "Davis", "Duvall", "Smoak", "Gonzalez",
    "Pujols", "Abreu", "Lowe", "Senzel", "Encarnacion", "Alvarez", "Sano", "Diaz", "Mountcastle", "Anderson",
    "Luzardo", "Urias", "May", "Gonzales", "Wheeler"
];

const names = [basketballnames,footballNames,hockeyNames,baseballNames];

// Function to generate random player names
// selectedIndex: sport type (0 = Basketball, 1 = Football, etc.)
function getRandomName(selectedIndex) {
    return names[selectedIndex][Math.floor(Math.random() * names[selectedIndex].length)];
}

// Function to generate random background color in hex
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
