var parse_message = function(msg) {
    msg = format_message(msg);
    isQuestion = is_question(msg);

    var result = {needResponse: false, response: null};

    if (isQuestion) {
        var isKnown = false;
        var response = '';

        Agent.known.forEach(function (k) {
            if (msg == k.question) {
                isKnown = true;
                response = k.answer;

                result.needResponse = false;
                result.response = response;
            }
        });

        if (!isKnown) {
            Agent.known.push({
                question: msg,
                answer: null
            });
            result.needResponse = true;
            return result;
        }
    }
    return result;
}

var format_message = function(msg) {
    msg = msg.toLowerCase();
    return msg;
}

var is_question = function(msg) {
    let keywords = [
        '?',
        'can you',
        'can i',
        'can they',
        'can she',
        'can he',
        'do you',
        'do i',
        'does he',
        'does she',
        'do they',
        'how',
        'will i',
        'will you',
        'will they',
        'will he',
        'will she',
        'what',
        'where',
        'who',
        'when',
        'why',
        'which',
        'should i',
        'were you',
        'are you',
        'are they',
        'is it',
        'should i',
        'should they',
        'should he',
        'should she',
        'should it',
    ];

    var isQuestion = false;

    keywords.forEach(function(keyword) {
        if (msg.includes(keyword)) {
            isQuestion = true;
            return;
        }
    });

    return isQuestion;
}

var uuidv4 = require('uuid/v4');

var Agent = {
    known: [],
    parse: parse_message,

    user: {
        id: uuidv4(),
        username: '[BOT] Rick'
    },
};


module.exports.Agent = Agent;