const route = "http://localhost:4000";

export function LoginFetch(username, password) {
    fetch(`${route}/api/account/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(res => res.json())
        .then(json => {
            console.log(json);
        });
}

export function QuizAns(answers, token) {
    console.log("answers in post fetch : ", answers); //TODO: only 3 inputs are found instead of 4
    fetch(`${route}/answers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            givenAnswers: answers,
            token: token
        })
    })
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                console.log("answer is sent to server");
            }
        });
}
