

const soundwin = document.querySelector('#myAudiowin')//סאונדים
const soundclick = document.querySelector('#myAudioclick')
const fail = document.querySelector('#fail')
const cntsound = document.querySelector('#cntSuonde')

let imgCount = 0
const products = document.querySelectorAll('#plate');
let imgInteval;
const bild = document.querySelector('#bild');
const orders = ["image/basic chasa kziza tomato onion onionp kziza chasa top.png", "image/basic kziza chasa onionp top.png", "image/basic kziza tomato chasa onion onionp top.png",
    "image/basic kziza tomato chasa onion top.png", "image/basic kziza tomato chasa top.png", "image/basic kziza tomato top.png"
    , "image/basic kziza top.png", "image/basic onionp kziza kziza onion top.png", "image/basic tomato kziza onionp onion top.png"
    , "image/basic tomato onion chasa kziza onionp top.png"
]//מערך של ההזמנות
let tymerArr = ["image/tymer/0.png", "image/tymer/1.png", "image/tymer/2.png", "image/tymer/3.png", "image/tymer/4.png", "image/tymer/5.png", "image/tymer/6.png"
    , "image/tymer/7.png", "image/tymer/8.png", "image/tymer/9.png", "image/tymer/10.png", "image/tymer/11.png", "image/tymer/12.png", "image/tymer/13.png", "image/tymer/14.png"]
let bildArr = []
let srcArrSingle = ["image/basic1.png", "image/chasa1.png", "image/kziza1.png", "image/onion1.png",
    "image/onionp1.png", "image/tomato1.png", "image/top1.png"];//מערך פריט יחיד
const containerOrders = document.querySelector('#orders');
let orderIntervals = {};
const garbeg = document.querySelector('#garbeg')
const cntWin = document.querySelector("#cntWin");
document.querySelector('#contaunerPlate').addEventListener('contextmenu', (e) => {//אירוע שמונע לחיצה על מקש ימני בדיב צלחות
    e.preventDefault();
})

document.addEventListener("DOMContentLoaded", startCountdown());//אירוע שכאשר הדף נטען קורא לספירה לאחור
function startCountdown() {//פונקציה שמפעילה ספירה לאחור
    const overlay = document.getElementById('overlay');
    const countdownTexts = ['3', '2', '1', 'START'];
    let index = 0;

    function showNextText() {//פונקציה שמחליפה את המספר עם המספר הבא במערך הספירה לאחור
        if (index < countdownTexts.length) {
            overlay.textContent = countdownTexts[index];
            index++;
            setTimeout(showNextText, 1000); // קריאה בכל שניה
        } else {
            //אם הגעת לסוף המערך
            overlay.classList.add('hidden');
            //מוסיף קלאס שבעיצוב הוא מוחבא
        }
    }
    showNextText();
}


let cntElement = 0;
function createOrder() {//פונקציה שיוצרת דיבים דינאמים שבתוכם תמונת הזמנה וטיימר
    if (containerOrders.children.length < 3) {//מקסימום הזמנות שנוצרות 3
        let rnd = Math.floor(Math.random() * 9 + 0)//מספר רנדומלי בשביל שליםפת הזמנה חדשה
        const myDiv = document.createElement('div');
        const myImg = document.createElement('img');
        const tymer = document.createElement('img');
        myImg.src = orders[rnd];
        tymer.src = tymerArr[0];//שם את הטטימר מהתחלה כלומר תמונה ראשונה במערך
        myDiv.id = 'order' + cntElement;//מביא לכל דיב שנוצר  איי די ייחודי עם ממונה שסופר מספר איברים שנוצרו
        cntElement++;
        myDiv.classList.add('order');//קלאס לעיצוב
        myImg.id = 'orderImg';
        tymer.id = 'tymerImg'
        myDiv.appendChild(myImg);
        myDiv.appendChild(tymer);
        containerOrders.appendChild(myDiv)//הוספת הדיב
        let i = 0//אינדקס לטיימר
        const changeImg = () => {//פונקציה שמשנה את התמונה של הטיימר
            i = (i + 1) % tymerArr.length//משנה את האינדקס להבא במערך
            tymer.src = tymerArr[i]//משנה את התמונה
            if (i == 0) {//אם סיימת את הטיימר וחזרת להתחלה
                gameOver();//שליה לפונקציה
                clearInterval(imgInteval);//עצירת הטיימר
                delete orderIntervals[myDiv.id];//מחיקת הטיימר
            }
        }
        imgInteval = setInterval(changeImg, 1000);//כל  שניה
        orderIntervals[myDiv.id] = imgInteval;//מכניס למערך של טיימרים לפי דיבים

    }
}
let startgame = setInterval(createOrder, 5000);

for (let i = 0; i < products.length; i++) {//מעבר על מערך צלחות מרכזיות
    products[i].addEventListener('click', () => {//לכל אחד אירוע קליק בו מוסיפים בדיב של ההרכבה את התמונה המתאימה
        soundclick.play();//צליל לחיצה
        let img = document.createElement('img');
        img.id = 'imgBild';
        img.src = srcArrSingle[i];
        img.style.position = 'absolute';
        img.style.bottom = `${imgCount * 26}px`;//משתנה שבודק כמה איברים נוצרו בדיב של ההרכבה ולפי זה מוסיף רווח תחתון לאיבר הבא
        bild.appendChild(img)
        imgCount++;
        let newStr = srcArrSingle[i].slice(6, srcArrSingle[i].length - 5)//חותך את הרכיב מתוך ה אס אר סי ומכניס למערך כדי שיוכל להשוות עם ההזמנה לאחר מכן
        bildArr.push(newStr);
        bild.src = JSON.stringify(bildArr)//הופך את המערך למחרוזת
        if (i == 6) {//אם הוא לוחץ על האיבר השישי שהוא הלחמניה העליונה אז נשלח לפונקציה שמשווה את ההרכבה להזמנה
            chackburger();
        }

    })
}

function chackburger() {//פונקציה שסורקת את כל ההזמנות הקיימות ובודקת האם ההרכבה מתאימה לאחת מהן
    const arrOrders = document.querySelectorAll('#orderImg')//בכל הזמנה הוספנו לה איי די ועכשיו ניצור מערך הזמנות קיימות
    for (let j = 0; j < arrOrders.length; j++) {//לולאת סריקה על מערך הזמנות
        let orderstr = arrOrders[j].src.replace("file:///D:/תכנות/javascript/", "").replace(".png", "").split('/').pop();//חותך את ההזמנה מתוך האס אר סי
        orderstr = decodeURIComponent(orderstr);//פונקציה שמסירה תווים מיחדים שאס אר סי יוצר
        let arr = orderstr.split(" ");//המרה למחרוזת בצורת מערך כדי להשוות עם ההרכבה
        orderstr = JSON.stringify(arr);
        if (orderstr == bild.src) {//השוואה אם שווה
            imgCount = 0;//אתחול ההרכבה והמשתנים שלה
            bildArr = []
            containerOrders.removeChild(arrOrders[j].parentElement)//מחיקת ההזמנה הספציפית
            clearInterval(orderIntervals[arrOrders[j].parentElement.id]); // עצור את הטיימר הספציפי
            delete orderIntervals[arrOrders[j].parentElement.id]; // נקה את הטיימר מהאובייקט
            while (bild.firstChild) {//לולאה שמסירה את כל הרכיבים של ההרכבה
                bild.removeChild(bild.firstChild)

            }
            cntWin.innerHTML++;//מעדכן ניצחון נוסף
            soundwin.play();//צליל ניצחון
            j = arrOrders.length//יציאה מהלולאה כי כבר מצא

        }

    }
}
garbeg.addEventListener('click', () => {// פונקציית פח שמרוקנת את דיב ההרכבה ומאתחלת את המשתנים של ההרכבה
    while (bild.firstChild) {
        bild.removeChild(bild.firstChild)
    }
    imgCount = 0
    bildArr = []
})
function gameOver() {//פונקציה שמוחקת את כל האלמנטים מדיב ההזמנות ומדפיסה גיים אובר ומוחקת את הטיימרים
    while (containerOrders.firstChild)
        containerOrders.removeChild(containerOrders.firstChild)
    containerOrders.innerHTML = '!game over'
    containerOrders.classList.add('shaking-element')
    clearInterval(startgame);
    fail.play();//צליל כישלון
}




