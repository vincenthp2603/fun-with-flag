const COUNTRY_TO_CAPITAL = 0;
const CAPITAL_TO_COUNTRY = 1;
const COUNTRY_TO_FLAG = 2;
const FLAG_TO_COUNTRY = 3;

const questionType = ["COUNTRY_TO_CAPITAL", "CAPITAL_TO_COUNTRY", "COUNTRY_TO_FLAG", "FLAG_TO_COUNTRY"];


const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const createQuiz = (questionTypeIndex, countries, chosenCountry, chosenCountryIndex) => {
    let input;
    let output;
    let question;
    let numberOfCountries = countries.length;

    switch (questionTypeIndex) {
        case COUNTRY_TO_CAPITAL: {
            input = 'name';
            output = 'capital';
            question = `Which city is the capital of ${chosenCountry[input]}?`;
            break;
        }
        case CAPITAL_TO_COUNTRY: {
            input = 'capital';
            output = 'name';
            question = `${chosenCountry[input]} is the capital of which country?`;
            break;
        }
        case COUNTRY_TO_FLAG: {
            input = 'name';
            output = 'flagUrl';
            question = `Which flag is the flag of ${chosenCountry[input]}?`;
            break;
        }
        case FLAG_TO_COUNTRY: {
            input = 'flagUrl';
            output = 'name';
            question = `This flag belongs to which country?`;
            break;
        }
        default:
            break;
    }

    let rightAnswerIndex = getRandomInt(4);

    let pickedIndexes = [];
    for (let i = 0; i < 3; i++) {
        while (1) {
            let index = getRandomInt(numberOfCountries);
            if (pickedIndexes.filter(i => i === index).length === 0 && index !== chosenCountryIndex) {
                pickedIndexes.push(index);
                break;
            }
        }
    }

    let answerArray = pickedIndexes.map(i => countries[i][output]);
    answerArray.splice(rightAnswerIndex, 0, chosenCountry[output]);

    let quiz = {
        questionType: questionType[questionTypeIndex],
        question: question,
        questionUrl: questionTypeIndex === FLAG_TO_COUNTRY ? chosenCountry.flagUrl : '',
        answerArray: answerArray,
        rightAnswerIndex: rightAnswerIndex
    }
    
    return quiz;
}

const createQuizzes = (countries, numberOfQuestion = 10) => {
    const numberOfCountries = countries.length;
    let pickedCountriesIndexes = [];
    let quizzes = [];

    for (let i = 0; i < numberOfQuestion; i++) {
        let chosenCountryIndex;
        while (1) {
            chosenCountryIndex = getRandomInt(numberOfCountries);
            if (pickedCountriesIndexes.filter(index => index === chosenCountryIndex).length === 0) {
                pickedCountriesIndexes.push(chosenCountryIndex);
                break;
            }
        }

        let chosenCountry = countries[chosenCountryIndex];

        let questionTypeIndex = getRandomInt(questionType.length);

        let quiz = createQuiz(questionTypeIndex, countries, chosenCountry, chosenCountryIndex);

        quizzes.push(quiz);
    }

    return quizzes;
}

module.exports = createQuizzes;