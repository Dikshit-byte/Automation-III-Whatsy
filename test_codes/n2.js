const books = {
    B_1 : 'Ikigai _ the Japanese secret to a long and happy life',
    B_2 : 'Napoleon_ A Biography',
    B_3 : 'Rich Dad Poor Dad',
    B_4 : 'VIVEKANAND BIOGRAPHY',
    B_5 : 'Wings of fire',
    E_1 : 'Dark-Desire',
    E_2 : 'rachel-g-ultimate-pleasure',
    E_3 : 'The-Roommate-by-Rosie-Danan',
    E_4 : 'You-had-me-at-hola',
    F_1 : 'alices-adventures-in-wonderland',
    F_2 : 'The-Adventures-of-Sherlock-Holmes',
    F_3 : 'The-Canterville-Ghost',
    F_4 : 'The-Ghost-Pirates',
    F_5 : 'Treasure-Island',
    H_1 : 'A HISTORY OF INDIA',
    H_2 : 'A-History-of-the-Maratha-People',
    H_3 : 'a-history-of-the-world1',
    N_1 : 'Half Girlfriend by Chetan Bhagat',
    N_2 : 'Healing-Her-Heart',
    N_3 : 'One Indian Girl by Chetan Bhagat',
    N_4 : 'The-Almost-Perfect-Murder',
    S_1 : 'Bhagavad-Gita-Hindi',
    S_2 : 'Chanakya Neeti',
    T_1 : 'Around-the-World-in-80-Days',
}

for(const key in books){
    if(books.hasOwnProperty(key)){
        console.log("yo")
        console.log(`${key} : ${books[key]}`)
    }
}