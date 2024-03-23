const users = [
    {
        name: 'Sum Ding Wong',
        email: 'sumdingwong@gmail.com',
        password: '@SumDingWong321',
        status: 'Administrator',
        signUpDate: '2019-02-01'
    },
    {
        name: 'Sussy Baka',
        email: 'sussybaka@gmail.com',
        password: '#SussyBaka123',
        status: 'Member',
        signUpDate: '2020-01-02'
    },
    {
        name: 'Mike Oxlong',
        email: 'mikeoxlong@yahoo.com',
        password: '$mikeoxlong69',
        status: 'Member',
        signUpDate: '2023-09-29'
    },
    {
        name: 'Hatsune Miku',
        email: 'hatsunemiku@hotmail.com',
        password: 'SEKAI DE ICHIBAN OHIME-SAMA',
        status: 'Member',
        signUpDate: '2024-01-01'
    }
]

const schedules = [
    {
        email: 'sussybaka@gmail.com',
        date: '2024-01-01',
        startTime: '2:30 pm',
        endTime: '3:30 pm',
        address: 'The Foundation 270 Oteha Valley Road, Albany, Auckland 0630',
        comment: 'no comment'
    },
    {
        email: 'mikeoxlong@yahoo.com',
        date: '2024-01-17',
        startTime: '06:00 am',
        endTime: '08:00 am',
        address: '252 Oteha Valley Road, Albany, Auckland 0632',
        comment: 'mikeoxlong'
    },
    {
        email: 'hatsunemiku@hotmail.com',
        date: '2024-02-26',
        startTime: '08:00 am',
        endTime: '09:30 am',
        address: '2 Rothwell Avenue, Albany, Auckland 0632',
        comment: 'Sekai wa watashi no mono!'
    },
]

module.exports = {
    users,
    schedules,
};
