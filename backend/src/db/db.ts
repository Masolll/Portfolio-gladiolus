type formType = {
    "id": number,
    "name": string
}

export let db: { forms: formType[] } = {
    forms: [
        {"id": 2, "name": "Alex"},
        {'id': 3, 'name': "Andrew"}
    ]
};