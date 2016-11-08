"use strict";



const deduplicate = function(emails) {
    const set = new Set();
    const res = [];
    for (const email of emails) {
        if (!set.has(email.toUpperCase())) {
            res.push(email);
        }
        set.add(email.toUpperCase());
    }
    return res;
}

const getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const calcDuration = function(s, e) {
    return 'Processing time: ' + (e - s) + ' ms';
}

const generateRandomEmails = function(total) {
    const uniqSize = Math.floor(total/2);
    let n = uniqSize;
    const list = [];
    while(n > 0) {
        const sb = [n.toString()];
        sb.push('abctest@test.com');
        list.push(sb.join('-'));
        n--;
    }

    // Create a random duplicate from the unique list
    let m = uniqSize;
    const dupeBucket = [];
    while(dupeBucket.length < m) {
        const x = getRandomInt(0, list.length);
        dupeBucket.push(list[x]);
    }

    // Place the duplicate randomly in the list;
    while(dupeBucket.length) {
        const val = dupeBucket.pop();
        const x = getRandomInt(0, list.length);
        list.splice(x, 0, val);
    }

    return list;
}


window.onload = function() {
    let endDate;
    let startDate;
    const resultBox = document.querySelector('.js-result');
    const timeBox = document.querySelector('.js-time');
    const submitBtn = document.querySelector('.js-submit');
    const inputBox = document.querySelector('.js-input');
    const numEmailBox = document.querySelector('.js-email-num');
    const genBtn = document.querySelector('.js-generate');
    const testBtn = document.querySelector('.js-test');
    const testRes = document.querySelector('.js-test-result');
    const testIn = document.querySelector('.js-test-input');
    const testTime = document.querySelector('.js-test-time');
    const testRes2 = document.querySelector('.js-test-result2');
    const testIn2 = document.querySelector('.js-test-input2');
    const testTime2 = document.querySelector('.js-test-time2');

    submitBtn.addEventListener('click', () => {
        const listStr = inputBox.value;

        if (!listStr.startsWith('[')  && !listStr.endsWith(']')) {
            alert('List is not a valid array!');
            return;
        }

        const list = listStr.slice(1, listStr.length - 1).split(',').map(function(str) {
            const trimmed = str.trim();
            return trimmed.slice(1, trimmed.length-1);
        });
        resultBox.innerHTML = 'Deduplicating...';
        startDate = new Date();
        const res = deduplicate(list);
        endDate = new Date();
        resultBox.innerHTML = JSON.stringify(res);
        timeBox.innerHTML = calcDuration(startDate, endDate);

    });

    genBtn.addEventListener('click', () => {
        const list = generateRandomEmails(numEmailBox.value);
        inputBox.value = JSON.stringify(list);
    });

    testBtn.addEventListener('click', () => {
        setTimeout(() => {
            testBtn.innerHTML = 'Loading...';
            testBtn.disabled = true;
        })
        setTimeout(() => {
            let list = generateRandomEmails(100000);
            let s = new Date();
            let res = deduplicate(list);
            let e = new Date();
            testIn.innerHTML = JSON.stringify(list);
            testRes.innerHTML = JSON.stringify(res);
            testTime.innerHTML = calcDuration(s, e);

            list = ['aaa@aa.ca','aaa@aa.ca','zzz@zzz.ca', 'bbbb@aa.ca', 'zzz@zzz.ca', 'bbbb@aa.ca'];
            s = new Date();
            res = deduplicate(list);
            e = new Date();
            testIn2.innerHTML = JSON.stringify(list);
            testRes2.innerHTML = JSON.stringify(res);
            testTime2.innerHTML = calcDuration(s, e);
            testBtn.innerHTML = 'Run Tests!';
            testBtn.disabled = false;
        }, 100);

    });
}


