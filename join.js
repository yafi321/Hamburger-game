function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const cntSuonde = document.querySelector('#cntSuonde')

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;//ביטוי רגרולרי שבודק שהקלט תקין (מיננמום 8 תווים אותיות גדולות, קטנות, ומיחדים)

    if (!passwordPattern.test(password)) {//בודק את הקלט
        alert('הסיסמה חייבת לכלול לפחות 8 תווים, כולל אותיות גדולות וקטנות ותווים מיוחדים');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];//מכניס למערך את כל המשתמשים הקיימים
    const userExists = users.find(user => user.username === username);//השוואה האם כבר קיים

    if (userExists) {//אם קיים כבר מודיע למשתממש
        alert('שם המשתמש קיים כבר, אנא בחר שם משתמש אחר.');
        return;
    }

    users.push({ username, password });// מכניס את המשתמש החדש למערך המשתמשים
    localStorage.setItem('users', JSON.stringify(users));//מכניס ללוקל סטורג'
    alert('הרשמה מוצלחת!');
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);//בודק אם המשתמש קיים במערכת

    if (user) {//אם כן פותח את המשחק
        window.open("game.html", "_self")
    } else {
        alert('שם המשתמש או הסיסמה שגויים.');//אם לא מודיע על כך
    }
}
