const f = function (key, subKey, subSubKey, subSubSubKey, value) {
    const v1 = { morse: '.__.' };
    const v2 = { letter: v1 };
    const v3 = { first: v2 };
    let customer = {};
    customer.name = v3;
    customer.role = 'user';
    const v4 = customer[key];
    const v5 = v4[subKey];
    const v6 = v5[subSubKey];
    v6[subSubSubKey] = value;
    const v7 = console.log;
    const v8 = customer.name;
    const v9 = v8.first;
    const v10 = v9.letter;
    const v11 = v10.morse;
    const v12 = v7('customer.name.first.letter.morse => ' + v11);
    v12;
    const v13 = console.log;
    const v14 = customer.name;
    const v15 = v14.first;
    const v16 = v15.letter;
    const v17 = v16.toString;
    const v18 = v17();
    const v19 = v13('toString implementation => ' + v18);
    v19;
    return customer;
};
module.exports = f;