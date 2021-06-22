const personGenerator = {
    surnameJson: `{  
        "count": 14,
        "list": {
            "id_1": "Петров",
            "id_2": "Михайлов",
            "id_3": "Новиков",
            "id_4": "Федоров",
            "id_5": "Семёнов",
            "id_6": "Павлов",
            "id_7": "Александров",
            "id_8": "Иванов",
            "id_9": "Смирнов",
            "id_10": "Кузнецов",
            "id_11": "Кравцов",
            "id_12": "Николаев",
            "id_13": "Славин",
            "id_14": "Морозов"
        }
    }`,
    firstNameMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артем",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей"
        }
    }`,
    fatherName:`{
        "count":10,
        "list":{
            "id_1": "Александрович",
            "id_2": "Богданович",
            "id_3": "Вадимович",
            "id_4": "Викторович",
            "id_5": "Денисович",
            "id_6": "Романович",
            "id_7": "Тимурович",
            "id_8": "Тарасович",
            "id_9": "Романович",
            "id_10": "Яковлевич"
        }
    }`,
    //женские имена
    firstNameFemaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Марина",
            "id_2": "Оля",
            "id_3": "София",
            "id_4": "Каролина",
            "id_5": "Маргарита",
            "id_6": "Анастасия",
            "id_7": "Ксения",
            "id_8": "Елизавета",
            "id_9": "Дарья",
            "id_10": "Екатерина"
        }
    }`,
    //месяца
    mounth:`{
        "count": 12,
        "list":{
            "id_1" : "декабря",
            "id_2" : "января",
            "id_3" : "февраля",
            "id_4" : "марта",
            "id_5" : "апреля",
            "id_6" : "мая",
            "id_7" : "июня",
            "id_8" : "июля",
            "id_9" : "августа",
            "id_10": "сентября",
            "id_11": "октября",
            "id_12": "ноября"
        }
    }`,
    workGeneration:`{
        "type":"deep",
        "male":{
            "count":4,
            "list":{
                "id_1":"шахтёром",
                "id_2":"слесарем",
                "id_3":"солдатом",
                "id_4":"сварщик"
            }
        },
        "female":{
            "count":4,
            "list":{
                "id_1":"прачкой",
                "id_2":"домохозяйкой",
                "id_3":"косметологом",
                "id_4":"моделью"
            }
        },
        "duo":{
            "count":7,
            "list":{
                "id_1":"IT-специалистом",
                "id_2":"врачом",
                "id_3":"дизайнер",
                "id_4":"в театре",
                "id_5":"программист",
                "id_6":"хирургом",
                "id_7":"микробиологом"
            }
        }

    }`,
    //Определяем рандомный пол
    randomGender:()=>{
        let current=Math.floor(Math.random()*2);
        current?current='Мужчина':current='Женщина';
        genderLabel.textContent=current;
        return current;
    },
    //Вводим ФИО
    inputName:(gender)=>{
        let name,surName,fatherName;
        surName=PG.randomValue(PG.surnameJson);//фамилия
        fatherName=PG.randomValue(PG.fatherName);//отчество
        if(gender=='Мужчина'){
            name=PG.randomValue(PG.firstNameMaleJson);//м имя
        }else{
            name=PG.randomValue(PG.firstNameFemaleJson);//ж имя
            //проверка currentId
            surName=`${surName}a`;
            fatherName=fatherName.replace('ич','на');
        }
        nameLabel.textContent=`${name}  ${fatherName}`;
        surNameLabel.textContent=surName;
    },
    //рандомная дата
    randomDate:()=>{
        let day,mth,year;
        year=PG.randomIntNumber(1950,2015);
        mth=PG.randomValue(PG.mounth);
        mth=='февраля'?day=PG.randomIntNumber(1,28):day=PG.randomIntNumber(1,31);//проверка на февраль
        ageLabel.textContent=`${day} ${mth} ${year}`
    },
    //генерация работы
    randomWork:(gender)=>{
        let work;
        work=PG.randomValue(PG.workGeneration,gender);
        workLabel.textContent=`Работает ${work}`;
    },
    clear:()=>{//очистка всего
        surNameLabel.textContent='Генерация данных';
        nameLabel.textContent='';
        ageLabel.textContent='Генерация года рождения';
        workLabel.textContent='Место работы';
        genderLabel.textContent='Генерация пола'
    },
    randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),

    randomValue: function (json,gender) {
        const obj = JSON.parse(json);
        let prop;
        if(obj.type=='deep'){//Проверка на сложный JSON(список работы имеет 3 разных подтипа)
            const individual=Math.floor(Math.random()*2);//проверка на индивидуальную профессию по полу
            if(individual){
                prop=`id_${this.randomIntNumber(obj.duo.count, 1)}`
                return obj.duo.list[prop];//общие профессии
            }else{
                if(gender=="Мужчина"){//мужские профессии
                    prop=`id_${this.randomIntNumber(obj.male.count, 1)}`;
                    return obj.male.list[prop];
                }else{//женские профессии
                    prop=`id_${this.randomIntNumber(obj.female.count, 1)}`;
                    return obj.female.list[prop];
                }
            }
        }else{//для простых JSON
            prop = `id_${this.randomIntNumber(obj.count, 1)}`;
            return obj.list[prop];
        }
    },  
};
