import database from "./database";

export default class Quiz {
    static getQuizzes() {
        const quizzes = [];
        return database
            .ref("quizzes")
            .once("value")
            .then(snapshot => {
                let index = 0;
                snapshot.forEach(childSnapshot => {
                    const quiz = childSnapshot.val();
                    quiz.id = index++;
                    quizzes.push(quiz);
                });
                return quizzes;
            });
    }

    static getQuestions(id) {
        const quiz = [];
        return database
            .ref(`quizzes/${id}/questions`)
            .once("value")
            .then(snapshot => {
                snapshot.forEach(childSnapshot => {
                    quiz.push(childSnapshot.val());
                });
                return quiz;
            });
    }
}
