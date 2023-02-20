import {MAIN} from './Consts';

const token='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';
const header = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
}

export default class REST {

    static postChatContent(data) {
        var requestContent = {
            model:"text-davinci-003",
                prompt: data,
                max_tokens: 500,
                temperature: 0
        };
        return fetch(MAIN.API.POST_CHAT_CONTENT, {
            method: 'post',
            headers: header,
            body: JSON.stringify(requestContent)
        }).then(res => res.json());
    }
}

