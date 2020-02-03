export const state = () => ({
    users: [
        {
            fName: 'Иван',
            lName: 'Иванов',
            phone: 79001112277,
            mail: 'test@test.com'
        },
        {
            fName: 'Петр',
            lName: 'Петров',
            phone: 79001112277,
            mail: 'test1@test.com'
        }
    ]
})

export const mutations = {
    addUser (state, data) {
        state.users.push(data)
    }
}
export const getters = {
    getUsers (state) {
        return state.users
    }
}